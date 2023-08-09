import { createColumnHelper } from "@tanstack/react-table";
import PageTitle from "../components/common/page-title";
import Seo from "../components/common/seo";
import CustomTable from "@/components/common/custom-table";
import { Badge, Flex, Select, Text } from "@chakra-ui/react";
import { useAllTransactions } from "@/api/payment/use-all-transactions";
import { useState } from "react";
import { useAllSessions } from "@/api/user/use-all-sessions";

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor("referenceNumber", {
    header: () => (
      <Text as="span" whiteSpace="nowrap">
        Transaction Ref.
      </Text>
    ),
  }),
  columnHelper.accessor("description", {
    header: () => (
      <Text as="span" whiteSpace="nowrap">
        Payment
      </Text>
    ),
  }),
  columnHelper.accessor("programmeName", {
    header: () => (
      <Text as="span" whiteSpace="nowrap">
        Programme
      </Text>
    )
  }),
  columnHelper.accessor("amount", {
    header: () => (
      <Text as="span" whiteSpace="nowrap">
        Amount
      </Text>
    ),
    cell: (props) =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(props.getValue()),
  }),
  columnHelper.accessor("status", {
    header: (props) => (
      <Text as="span" whiteSpace="nowrap">
        Status
      </Text>
    ),
    cell: (props) => {
      const status = props.getValue();
      const colorScheme =
        status === "success"
          ? "green"
          : status === "failed"
            ? "red"
            : status === "pending"
              ? "yellow"
              : "gray";
      return (
        <Badge colorScheme={colorScheme} variant="outline">
          {status}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("dateInitiated", {
    header: () => (
      <Text as="span" whiteSpace="nowrap">
        Date Initiated
      </Text>
    ),
    cell: (props) => (
      <Text as="span" whiteSpace="nowrap">
        {props.getValue()?.toLocaleDateString("en-NG", {
          dateStyle: "medium",
        })}
      </Text>
    ),
  }),
];

export default function Transactions() {
  const allTransationsRes = useAllTransactions();
  const allSessions = useAllSessions();
  const [session, setSession] = useState("all");
  const [status, setStatus] = useState("all");
  const data =
    allTransationsRes.data?.filter((t) => {
      return (
        (session == "all" || t.sessionId === session) &&
        (status == "all" || t.status === status)
      );
    }) || [];

  return (
    <>
      <Seo title="Transactions" />
      <PageTitle showBackButton>Transactions</PageTitle>

      <Flex
        mb={4}
        gap={4}
        sx={{
          "& select": {
            _active: {
              bg: "white",
              borderColor: "primary.500",
            },
            _focus: {
              bg: "white",
              borderColor: "primary.500",
            },
            _hover: {
              bg: "white",
              borderColor: "primary.500",
            },
          },
        }}
      >
        <Select
          variant="filled"
          bg="white"
          w="fit-content"
          value={status}
          onChange={(ev) => setStatus(ev.target.value)}
        >
          <option value="all">All Transactions</option>
          <option value="success">Successful Transactions</option>
          <option value="pending">Pending Transactions</option>
        </Select>

        <Select
          variant="filled"
          bg="white"
          w="fit-content"
          value={session}
          onChange={(ev) => setSession(ev.target.value)}
        >
          <option value="all">All Sessions</option>
          {allSessions.data?.map((session) => (
            <option key={session.id} value={session.id}>
              {session.name}
            </option>
          ))}
        </Select>
      </Flex>

      <CustomTable columns={columns} data={data} />
    </>
  );
}
