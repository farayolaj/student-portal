import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import TransactionTable from "../../transactions/transaction-table";

type PaymentTransactionsProps = {
  /** @default [] */
  transactions?: Transaction[];
};

export default function PaymentTransactions({
  transactions = [],
}: PaymentTransactionsProps) {
  return (
    <Box mt={8}>
      <Text as="h2" fontSize="lg" fontWeight="bold">
        Transactions
      </Text>
      <Box mt={4}>
        {transactions.length === 0 ? (
          <Flex justify="center" align="center" p={8}>
            There are no transactions for this payment yet.
          </Flex>
        ) : (
          <TransactionTable transactions={transactions} />
        )}
      </Box>
    </Box>
  );
}
