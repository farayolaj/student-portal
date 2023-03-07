import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import CustomTable from "../../common/custom-table";

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor("referenceNumber", { header: "Reference Number" }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (row) => (
      <span>
        {new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(row.getValue() / 100)}
      </span>
    ),
  }),
  columnHelper.accessor("dateInitiated", {
    header: "Date Initiated",
    cell: (row) => <span>{row.getValue().toLocaleDateString("en-NG")}</span>,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (row) => {
      const value = row.getValue();
      const colorScheme =
        value === "success" ? "green" : value === "failed" ? "red" : "yellow";
      return (
        <Badge colorScheme={colorScheme}> {value.toLocaleUpperCase()}</Badge>
      );
    },
  }),
  columnHelper.display({
    id: "action",
    header: () => <Box textAlign="center">Action</Box>,
    cell: () => (
      <Flex justify="center">
        <Button>View Details</Button>
      </Flex>
    ),
  }),
];

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
          <CustomTable columns={columns} data={transactions} />
        )}
      </Box>
    </Box>
  );
}
