import { cancelPayment, initiateTransaction } from "@/api/payment.mutations";
import { paymentQueries } from "@/api/payment.queries";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import formatDuration from "date-fns/formatDuration";
import { useCallback, useEffect, useRef, useState } from "react";
import useRemitaInline from "../common/remita-inline";

export default function PaymentCountdownModal({
  payment,
  includePreselected = false,
  onClose,
  timeout = 3000,
}: {
  payment: Payment;
  /**
   * Whether to include the preselected payment option in the payment
   * @default false
   */
  includePreselected?: boolean;
  onClose: () => void;
  /**
   * Timeout in seconds before the payment is automatically cancelled
   * @default 3000
   */
  timeout?: number;
}) {
  const [secondsLeft, setSecondsLeft] = useState(timeout);
  const [rrr, setRrr] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: initiateTransactionMutation,
    isPending: initiateTransactionIsPending,
  } = useMutation({
    mutationFn: initiateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(paymentQueries.mainList());
    },
  });
  const { initPayment } = useRemitaInline({
    isLive: process.env.NODE_ENV === "production",
    onSuccess: (res) => {
      if (process.env.NODE_ENV === "development") console.log(res);

      queryClient.invalidateQueries(paymentQueries.mainList());
      queryClient.invalidateQueries(paymentQueries.transactionsList());

      toast({
        status: "success",
        title: "Payment Successful",
        description:
          "If payment doesn't reflect immediately, requery transaction status later.",
      });
    },
    onError: (res) => {
      if (process.env.NODE_ENV === "development") console.error(res);

      toast({
        status: "error",
        title: "Payment Failed",
        description: "Please try again later.",
      });
    },
  });

  const { mutate: cancelPaymentMutation, isPending: cancelPaymentIsPending } =
    useMutation({
      mutationFn: cancelPayment,
      onSuccess: () => {
        queryClient.invalidateQueries(paymentQueries.mainList());
        queryClient.invalidateQueries(paymentQueries.transactionsList());

        toast({
          title: "Payment cancelled",
          description: "Your payment has been successfully cancelled.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error cancelling payment",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });

  const handleCancel = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (rrr) cancelPaymentMutation({ rrr });
    else if (payment.transaction?.rrr)
      cancelPaymentMutation({ rrr: payment.transaction.rrr });

    onClose();
  }, [cancelPaymentMutation, onClose, payment.transaction?.rrr, rrr]);

  const initialisePayment = useCallback(() => {
    initiateTransactionMutation(
      {
        id: payment.id,
        preselectedId:
          payment.paymentType === "main" && includePreselected
            ? payment.preselected?.id
            : undefined,
        paymentType: payment.paymentType,
        rawPaymentOption:
          payment.paymentType === "main" ? payment.rawPaymentOption : undefined,
        transactionRef:
          payment.paymentType === "main" ? payment.transactionRef : undefined,
        transactionType:
          payment.paymentType === "main" ? payment.transactionType : undefined,
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
          setRrr(data.transaction?.rrr || null);
          initPayment({
            key: data.transaction?.publicKey || "",
            processRrr: true,
            transactionId: data.transaction?.id,
            extendedData: {
              customFields: [
                {
                  name: "rrr",
                  value: data.transaction?.rrr,
                },
              ],
            },
          });
        },
      }
    );
  }, [
    initiateTransactionMutation,
    payment.id,
    payment.preselected?.id,
    payment.paymentType,
    payment.rawPaymentOption,
    payment.transactionRef,
    payment.transactionType,
    includePreselected,
    toast,
    initPayment,
  ]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      // Automatically cancel the payment if the time runs out
      handleCancel();
    }
  }, [secondsLeft, handleCancel]);

  return (
    <Modal isOpen={true} onClose={handleCancel} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Make Payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" align="center" gap={4}>
            <Text fontWeight="semibold">{payment.title}</Text>
            <Text fontSize="lg" fontWeight="bold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(payment.amount)}
            </Text>
            <Text color="gray.600">
              You have{" "}
              <strong>
                {secondsLeft > 0
                  ? formatDuration(
                      {
                        minutes: Math.floor(secondsLeft / 60),
                        seconds: secondsLeft % 60,
                      },
                      {
                        format: ["minutes", "seconds"],
                      }
                    )
                  : "0 seconds"}
              </strong>{" "}
              to complete this payment.
            </Text>
            {secondsLeft <= 30 && (
              <Text color="red.500" fontWeight="bold">
                This payment will be cancelled soon!
              </Text>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleCancel}
            mr={3}
            variant="ghost"
            isDisabled={initiateTransactionIsPending || cancelPaymentIsPending}
          >
            Cancel
          </Button>
          <Button
            colorScheme="primary"
            onClick={initialisePayment}
            isLoading={initiateTransactionIsPending}
            isDisabled={
              initiateTransactionIsPending ||
              cancelPaymentIsPending ||
              secondsLeft <= 0
            }
          >
            Pay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
