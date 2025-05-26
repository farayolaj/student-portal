import { initiateTransaction } from "@/api/payment.mutations";
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
import { useCallback } from "react";
import useRemitaInline from "../common/remita-inline";

export default function ConfirmPaymentModal({
  payment,
  includePreselected = false,
  onClose,
}: {
  payment: Payment;
  /**
   * Whether to include the preselected payment option in the payment
   * @default false
   */
  includePreselected?: boolean;
  onClose: () => void;
}) {
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
            <Text color="gray.600" fontWeight={"bold"} textAlign={"center"}>
              Please, note that this transaction will be cancelled after 24
              hours if no payment is made.
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleCancel}
            mr={3}
            variant="ghost"
            isDisabled={initiateTransactionIsPending}
          >
            Cancel
          </Button>
          <Button
            colorScheme="primary"
            onClick={initialisePayment}
            isLoading={initiateTransactionIsPending}
            isDisabled={initiateTransactionIsPending}
          >
            Pay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
