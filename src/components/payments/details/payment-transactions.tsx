import { useVerifyTransaction } from "@/api/payment/use-verify-transaction";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import DetailItem from "./detail-item";

type PaymentTransactionsProps = {
  transaction?: Transaction;
  onRequery: (status: boolean) => void;
  isLoading?: boolean;
};

export default function PaymentTransactionDetail({
  transaction,
  onRequery,
  isLoading,
}: PaymentTransactionsProps) {
  const verifyTransaction = useVerifyTransaction();

  return (
    <Box mt={8}>
      <Text as="h2" fontSize="lg" fontWeight="bold">
        Transaction Details
      </Text>
      <Card mt={4}>
        <CardBody>
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
                  name="Description"
                  value={transaction?.description || ""}
                  isLoading={isLoading}
                />
                <DetailItem
                  name="Date Initiated"
                  value={
                    transaction?.dateInitiated?.toLocaleDateString("en-NG", {
                      dateStyle: "long",
                    }) || ""
                  }
                  isLoading={isLoading}
                />
                {transaction?.status === "success" && (
                  <DetailItem
                    name="Date Payed"
                    value={
                      transaction.datePayed?.toLocaleDateString("en-NG", {
                        dateStyle: "long",
                      }) || ""
                    }
                    isLoading={isLoading}
                  />
                )}
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
              </SimpleGrid>
              {transaction?.status === "pending" && (
                <Flex justify="center" mt={8}>
                  <Button
                    w="fit-content"
                    isDisabled={verifyTransaction.isLoading}
                    justifySelf="center"
                    onClick={() => {
                      verifyTransaction.mutate(
                        { rrr: transaction.rrr },
                        { onSuccess: onRequery }
                      );
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
        </CardBody>
      </Card>
    </Box>
  );
}

function PaymentTransactionDetailsSkeleton() {
  return (
    <SimpleGrid columns={[1, null, 3]} gap={4}>
      <DetailItem name="Transaction Reference" value="" isLoading />
      <DetailItem name="RRR" value="" isLoading />
      <DetailItem name="Description" value="" isLoading />
      <DetailItem name="Date Initiated" value="" isLoading />
      <DetailItem name="Date Payed" value="" isLoading />
      <DetailItem name="Status" value="" isLoading />
    </SimpleGrid>
  );
}
