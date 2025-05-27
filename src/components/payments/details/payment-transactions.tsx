import { cancelPayment } from "@/api/payment.mutations";
import {
  Box,
  Button,
  Divider,
  Flex,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { paymentQueries } from "../../../api/payment.queries";
import DetailItem from "./detail-item";

type PaymentTransactionsProps = {
  hasPaid: boolean;
  transaction?: Transaction;
  onRequery: (status: boolean) => void;
  isLoading?: boolean;
};

export default function PaymentTransactionDetail({
  hasPaid,
  transaction,
  onRequery,
  isLoading,
}: PaymentTransactionsProps) {
  const {
    isSuccess: verifyTransactionIsSuccess,
    data: verifyTransactionData,
    isLoading: verifyTransactionIsLoading,
    refetch: verifyTransactionRefetch,
  } = useQuery({
    ...paymentQueries.verifyTransaction(transaction?.rrr || ""),
    enabled: !hasPaid,
  });
  const toast = useToast();

  useEffect(() => {
    if (verifyTransactionIsSuccess && verifyTransactionData)
      onRequery(verifyTransactionData);
  }, [verifyTransactionIsSuccess, verifyTransactionData, onRequery]);

  const queryClient = useQueryClient();
  const { mutate: cancelPaymentMutation, isPending: cancelPaymentIsPending } =
    useMutation({
      mutationFn: cancelPayment,
      onSuccess: () => {
        queryClient.invalidateQueries(paymentQueries.mainList());
        queryClient.invalidateQueries(paymentQueries.transactionsList());
        queryClient.invalidateQueries({
          queryKey: paymentQueries.allPendingTransactions(),
        });

        toast({
          title: "Transaction Cancelled",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error Cancelling Transaction",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });

  return (
    <Box mt={8}>
      <Flex justify="space-evenly" gap={2} align="center" mb={8}>
        <Divider maxW="35%" borderColor="gray.500" />
        <Text as="h2" fontSize="lg" fontWeight="bold" textAlign="center">
          Transaction Details
        </Text>
        <Divider maxW="35%" borderColor="gray.500" />
      </Flex>
      {isLoading || transaction ? (
        <Box>
          <SimpleGrid columns={[1, null, 3]} gap={4}>
            <DetailItem
              name="Transaction Reference"
              value={transaction?.referenceNumber || ""}
              isLoading={isLoading}
            />
            <DetailItem
              name="RRR"
              value={transaction?.rrr || ""}
              isLoading={isLoading}
            />
            <DetailItem
              name="Status"
              value={
                transaction
                  ? transaction.status[0].toUpperCase() +
                    transaction.status.slice(1)
                  : ""
              }
              isLoading={isLoading}
            />
            <DetailItem
              name="Date Initiated"
              value={
                Number.isNaN(transaction?.dateInitiated?.valueOf())
                  ? "-"
                  : transaction?.dateInitiated?.toLocaleDateString("en-NG", {
                      dateStyle: "long",
                    }) || ""
              }
              isLoading={isLoading}
            />
            {transaction?.status === "success" && (
              <DetailItem
                name="Date Payed"
                value={
                  Number.isNaN(transaction?.datePayed?.valueOf())
                    ? "-"
                    : transaction?.datePayed?.toLocaleDateString("en-NG", {
                        dateStyle: "long",
                      }) || ""
                }
                isLoading={isLoading}
              />
            )}
            <DetailItem
              name="Description"
              value={transaction?.description || ""}
              isLoading={isLoading}
              gridColumn="1 / -1"
            />
          </SimpleGrid>
          {transaction?.status === "pending" && (
            <Flex justify="space-around" mt={8}>
              <Button
                colorScheme="red"
                w="fit-content"
                onClick={() => {
                  cancelPaymentMutation({
                    rrr: transaction.rrr,
                  });
                }}
                isLoading={cancelPaymentIsPending}
                isDisabled={cancelPaymentIsPending}
              >
                Cancel Transaction
              </Button>
              <Button
                w="fit-content"
                isDisabled={verifyTransactionIsLoading}
                justifySelf="center"
                onClick={() => {
                  verifyTransactionRefetch().then((res) => {
                    if (res.data) {
                      toast({
                        title: "Payment is successful",
                        status: "success",
                        duration: 3000,
                        id: `payment-requery-response-${transaction.rrr}`,
                        isClosable: true,
                      });
                    } else {
                      toast({
                        title: "Payment is still pending",
                        status: "info",
                        duration: 3000,
                        id: `payment-requery-response-${transaction.rrr}`,
                        isClosable: true,
                      });
                    }
                  });
                }}
              >
                Re-query Transaction
              </Button>
            </Flex>
          )}
        </Box>
      ) : (
        <Flex justify="center" align="center" p={8}>
          You have not made any transaction yet.
        </Flex>
      )}
    </Box>
  );
}
