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
};

export default function PaymentTransactionDetail({
  transaction,
}: PaymentTransactionsProps) {
  return (
    <Box mt={8}>
      <Text as="h2" fontSize="lg" fontWeight="bold">
        Transaction Details
      </Text>
      <Card mt={4}>
        <CardBody>
          {transaction ? (
            <Box>
              <SimpleGrid columns={[1, null, 3]} gap={4}>
                <DetailItem
                  name="Transaction Reference"
                  value={transaction.referenceNumber}
                />
                <DetailItem name="RRR" value={transaction.rrr} />
                <DetailItem
                  name="Description"
                  value={transaction.description}
                />
                <DetailItem
                  name="Date Initiated"
                  value={transaction.dateInitiated.toLocaleDateString("en-NG", {
                    dateStyle: "long",
                  })}
                />
                {transaction.datePayed && (
                  <DetailItem
                    name="Date Payed"
                    value={transaction.datePayed.toLocaleDateString("en-NG", {
                      dateStyle: "long",
                    })}
                  />
                )}
                <DetailItem
                  name="Status"
                  value={
                    transaction.status[0].toUpperCase() +
                    transaction.status.slice(1)
                  }
                />
              </SimpleGrid>
              {transaction.status === "pending" && (
                <Flex justify="center" mt={8}>
                  <Button w="fit-content" justifySelf="center">
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
