import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import {
  cancelBookstorePayment,
  checkoutBookstore,
  initiateBookstorePayment,
} from "../../api/bookstore.mutations";
import { bookstoreQueries } from "../../api/bookstore.queries";
import useRemitaInline from "../common/remita-inline";

interface BookItem {
  course_id: string;
  bookstore_id: string;
  title: string;
  quantity: string;
  price: string;
  amount: string;
}

interface BookOrder {
  id: string;
  session: string;
  order_id: string;
  total_amount: string;
  book_status: string;
  payment_description: string;
  payment_status: string;
  book_items: BookItem[];
}

interface RepeatOrderButtonProps {
  order: BookOrder;
}

const RepeatOrderButton: React.FC<RepeatOrderButtonProps> = ({ order }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const queryClient = useQueryClient();

  const toast = useToast();

  const checkoutMutation = useMutation({
    mutationFn: checkoutBookstore,
  });
  const initiatePaymentMutation = useMutation({
    mutationFn: initiateBookstorePayment,
  });
  const { mutate: cancelPayment, isPending: cancelPaymentIsPending } =
    useMutation({
      mutationFn: cancelBookstorePayment,
    });

  const handleCancelOrder = useCallback(() => {
    if (orderId) {
      cancelPayment(
        { order_id: orderId },
        {
          onSuccess: () => {
            toast({
              title: "Order Cancelled",
              description: "Your order has been cancelled successfully.",
              status: "success",
              isClosable: true,
            });
            queryClient.invalidateQueries(bookstoreQueries.transactions());
            onClose();
          },
          onError: (error) => {
            toast({
              title: "Error cancelling order",
              description: error.message,
              status: "error",
              isClosable: true,
            });
            onClose();
          },
        }
      );
    }
  }, [cancelPayment, onClose, orderId, queryClient, toast]);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(120);

      // Start countdown
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleCancelOrder();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [handleCancelOrder, isOpen]);

  const handleCheckout = () => {
    const booksToCheckout = Object.values(order.book_items).map(
      ({ bookstore_id, quantity }) => ({
        id: parseInt(bookstore_id),
        qty: parseInt(quantity),
      })
    );

    checkoutMutation.mutate(
      { books: booksToCheckout },
      {
        onSuccess: (response) => {
          setOrderId(response.orderId);
          onOpen();
        },
        onError: (error) => {
          toast({
            title: "Error checking out",
            description: error.message,
            status: "error",
            isClosable: true,
          });
        },
      }
    );
  };

  const { initPayment } = useRemitaInline({
    isLive: process.env.NODE_ENV === "production",
    onSuccess: (res) => {
      if (process.env.NODE_ENV === "development") console.log(res);

      toast({
        status: "success",
        title: "Payment Successful",
        description:
          "If payment doesn't reflect immediately, requery transaction status later.",
      });
      queryClient.invalidateQueries(bookstoreQueries.transactions());
    },
    onError: (res) => {
      if (process.env.NODE_ENV === "development") console.error(res);

      toast({
        status: "error",
        title: "Payment Failed",
        description: "Please try again later.",
      });

      handleCancelOrder();
    },
  });

  const initialisePayment = () => {
    initiatePaymentMutation.mutate(
      {
        order_id: orderId || "",
      },
      {
        onError: (error) => {
          const err = error as Error;
          toast({
            status: "error",
            title: "Error initializing payment",
            description: err.message,
          });
        },
        onSuccess: (data) => {
          onClose();
          initPayment({
            amount: parseInt(data.payment_details.total_amount),
            key: data.split_payment.public_key || "",
            processRrr: true,
            transactionId: data.split_payment.transaction_id,
            extendedData: {
              customFields: [
                {
                  name: "rrr",
                  value: data.split_payment.rrr,
                },
              ],
            },
          });
        },
      }
    );
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  return (
    <>
      <Button
        colorScheme="green"
        size="sm"
        width="max-content"
        onClick={handleCheckout}
        disabled={checkoutMutation?.isPending}
        display={order.book_status === "pending" ? "block" : "none"}
      >
        Retry
      </Button>
      {/* Checkout Modal */}
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Confirm Purchase
            <Text fontSize={"sm"} color="red" mt={1}>
              This order auto-cancels in {formatTime(timeLeft)}
            </Text>
          </ModalHeader>

          <ModalBody>
            <Text mb={1}>You are about to purchase:</Text>
            {Object.values(order.book_items).map(
              ({ title, quantity }, index) => (
                <Text key={index} fontWeight={"bold"}>
                  {index + 1}. {title} x {quantity}
                </Text>
              )
            )}
            <Text
              pt="1rem"
              fontSize={"sm"}
              fontStyle={"italic"}
              fontWeight={"normal"}
              color="grey"
            >
              NB: <br />- Kindly pick up the books at the New Administrative
              Complex - CBT Centre, UI Extension, Ajibode-Sasa Road, Ibadan.
              <br />
              -Payment should be completed within 24hours for transaction to be
              valid.
            </Text>
            <Text
              fontSize={"1.25rem"}
              mt={4}
              fontWeight="bold"
              textTransform={"uppercase"}
            >
              Total: ₦{order.total_amount}
            </Text>
          </ModalBody>
          <ModalFooter justifyContent={"start"}>
            <Button
              colorScheme="red"
              w="10rem"
              mr={3}
              onClick={handleCancelOrder}
              isDisabled={cancelPaymentIsPending}
            >
              Cancel Purchase
            </Button>
            <Button
              colorScheme="green"
              onClick={initialisePayment}
              isDisabled={
                initiatePaymentMutation.isPending ||
                !orderId ||
                cancelPaymentIsPending
              }
            >
              Confirm Purchase
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RepeatOrderButton;
