import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { IoTime } from "react-icons/io5";

const TransactionsCard: FC = () => {
  return (
    <Card>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading as="h2" fontSize="md">
          Recent Transactions
        </Heading>
        <Text as="span">
          <Link as={NextLink} href="#">
            Check all transactions &rarr;
          </Link>
        </Text>
      </CardHeader>
      <CardBody>
        <VStack divider={<Divider />}>
          <TransactionsCardItem
            amount={12000}
            dateInitiated={new Date(2023, 2, 12)}
            status="failed"
          />
          <TransactionsCardItem
            amount={600}
            dateInitiated={new Date(2023, 1, 6)}
            status="pending"
          />
          <TransactionsCardItem
            amount={600}
            dateInitiated={new Date(2023, 1, 6)}
            status="pending"
          />
          <TransactionsCardItem
            amount={600}
            dateInitiated={new Date(2023, 1, 6)}
            status="pending"
          />
        </VStack>
      </CardBody>
    </Card>
  );
};

export default TransactionsCard;

type TransactionsCardItemProps = {
  amount: number;
  dateInitiated: Date;
  status: "failed" | "pending" | "success";
};

const TransactionsCardItem: FC<TransactionsCardItemProps> = ({
  amount,
  dateInitiated,
  status,
}) => {
  let statusColor: string;
  let statusText: string;

  if (status == "failed") {
    statusColor = "red";
    statusText = "Failed";
  } else if (status == "pending") {
    statusColor = "yellow";
    statusText = "Pending";
  } else {
    statusColor = "green";
    statusText = "Success";
  }

  return (
    <Flex w="full" align="center" justify="space-between">
      <Flex direction="column">
        <Text as="span" fontSize="lg">
          {Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(amount)}
        </Text>
        <Text
          fontSize="sm"
          display="inline-flex"
          gap={2}
          w="fit-content"
          alignItems="center"
        >
          <IoTime color={statusColor} /> <span>{statusText}</span>
        </Text>
      </Flex>
      <Flex direction="column">
        <Text>Date Initiated</Text>
        <Text>{new Intl.DateTimeFormat("en-NG").format(dateInitiated)}</Text>
      </Flex>
    </Flex>
  );
};
