import { useVerifyTransaction } from "@/api/payment/use-verify-transaction";
import { Box, Button, Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
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
  const verifyTransaction = useVerifyTransaction({
    variables: { rrr: transaction?.rrr ?? "" },
    onSuccess: onRequery,
    enabled: !hasPaid,
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
            <Flex justify="center" mt={8}>
              <Button
                w="fit-content"
                isDisabled={verifyTransaction.isLoading}
                justifySelf="center"
                onClick={() => {
                  verifyTransaction.refetch();
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

function PaymentTransactionDetailsSkeleton() {
  return (
    <SimpleGrid columns={[1, null, 3]} gap={4}>
      <DetailItem name="Transaction Reference" value="" isLoading />
      <DetailItem name="RRR" value="" isLoading />
      <DetailItem name="Status" value="" isLoading />
      <DetailItem name="Date Initiated" value="" isLoading />
      <DetailItem name="Date Payed" value="" isLoading />
      <DetailItem name="Programme" value="" isLoading gridColumn="1 / -1" />
    </SimpleGrid>
  );
}
