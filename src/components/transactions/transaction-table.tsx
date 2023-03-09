import { Badge, Box, Button, Flex } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import CustomTable from "../common/custom-table";
import TransactionDetails from "./transaction-details";

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
  columnHelper.accessor((trx) => trx, {
    id: "action",
    header: () => <Box textAlign="center">Action</Box>,
    cell: (row) => (
      <Flex justify="center">
        <TransactionDetails transaction={row.getValue()} />
      </Flex>
    ),
  }),
];

type TransactionTableProps = {
  transactions: Transaction[];
};

export default function TransactionTable({
  transactions,
}: TransactionTableProps) {
  return transactions.length === 0 ? (
    <Flex justify="center" align="center" p={8}>
      You have not made any transaction yet.
    </Flex>
  ) : (
    <CustomTable columns={columns} data={transactions} />
  );
}
