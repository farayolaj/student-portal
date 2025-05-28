import { initiateTransaction } from "@/api/payment.mutations";
import { paymentQueries } from "@/api/payment.queries";
import {
  Button,
  Flex,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import formatDuration from "date-fns/formatDuration";
import { useCallback, useEffect, useRef, useState } from "react";
import useRemitaInline from "../common/remita-inline";

export default function ConfirmPaymentModal({
  payment,
  includePreselected = false,
  onClose,
  timeout = 10,
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
   * @default 10
   */
  timeout?: number;
}) {
  const [secondsLeft, setSecondsLeft] = useState(timeout);
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

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

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
          onClose();
        },
      }
    );
  }, [
    initiateTransactionMutation,
    payment.id,
    payment.paymentType,
    payment.preselected?.id,
    payment.rawPaymentOption,
    payment.transactionRef,
    payment.transactionType,
    includePreselected,
    toast,
    initPayment,
    onClose,
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
    <Modal isOpen={true} onClose={handleCancel} size={"2xl"} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" align="center" gap={4} textAlign="center">
            <Text color="red" textAlign={"center"}>
              This payment will be cancelled in{" "}
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
                : "0 seconds"}{" "}
              if you do not proceed.
            </Text>
            <Text fontWeight="semibold">
              You are about to pay for {payment.title}.
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(payment.amount)}
            </Text>
            <UnorderedList textAlign={"left"} color="gray.600">
              <ListItem>
                Payment must be completed within 24 hours for the transaction to
                be valid.
              </ListItem>
              <ListItem>
                Contact Learner Support if transaction success is not
                reflected/communicated after 24 hours of payment.
              </ListItem>
            </UnorderedList>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleCancel}
            mr={3}
            variant="ghost"
            colorScheme="red"
            isDisabled={initiateTransactionIsPending}
          >
            Cancel Payment
          </Button>
          <Button
            colorScheme="primary"
            onClick={initialisePayment}
            isLoading={initiateTransactionIsPending}
            isDisabled={initiateTransactionIsPending}
          >
            Proceed to Pay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
