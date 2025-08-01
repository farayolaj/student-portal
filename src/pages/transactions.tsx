import { useInitiatePrint } from "@/api/payment/use-initiate-print";
import CustomTable from "@/components/common/custom-table";
import RequeryButton from "@/components/payments/requery-button";
import { Badge, Button, Flex, Select, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { paymentQueries } from "../api/payment.queries";
import { userQueries } from "../api/user.queries";
import PageTitle from "../components/common/page-title";
import Seo from "../components/common/seo";

const columnHelper = createColumnHelper<Transaction>();

function PrintButton({ rrr }: { rrr: string }) {
  const { initiatePrint, isLoading } = useInitiatePrint();

  const handleReceiptPrint = async (rrr: string) => {
    try {
      await initiatePrint({ rrr });
    } catch (error) {
      // error is already handled using toast
      console.error("Failed to print receipt:", error);
    }
  };

  return (
    <Button
      onClick={() => handleReceiptPrint(rrr)}
      isDisabled={true}
      // isDisabled={isLoading}
      minW="7.8rem"
    >
      {isLoading ? <Spinner color="white" size="xs" /> : "Print"}
    </Button>
  );
}

export default function Transactions() {
  const { data: allTransations, refetch: allTransationsRefetch } = useQuery(
    paymentQueries.transactionsList()
  );
  const { data: allSessions } = useQuery(userQueries.sessions());
  const [session, setSession] = useState("all");
  const [status, setStatus] = useState("all");
  const data =
    allTransations?.filter((t) => {
      return (
        (session == "all" || t.sessionId === session) &&
        (status == "all" || t.status === status)
      );
    }) || [];

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
      ),
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
      header: () => (
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
    columnHelper.accessor("id", {
      header: "Action",
      cell: (props) => {
        const transaction = props.row.original;
        return transaction.status === "pending" ? (
          <RequeryButton
            transaction={transaction}
            onSuccess={allTransationsRefetch}
          />
        ) : (
          <PrintButton rrr={transaction.rrr} />
        );
      },
    }),
  ];

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
          {allSessions?.map((session) => (
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
