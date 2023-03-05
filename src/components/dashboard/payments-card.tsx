import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Link,
  NumberInputStepper,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { differenceInCalendarDays } from "date-fns";
import NextLink from "next/link";
import { FC } from "react";
import { IoTime } from "react-icons/io5";

const PaymentsCard: FC = () => {
  return (
    <Card>
      <CardHeader
        display="flex"
        justifyContent="space-between"
        flexWrap={["wrap", null, "initial"]}
      >
        <Heading as="h2" fontSize="md">
          Outstanding Payment
        </Heading>
        <Text as="span" w={["full", null, "initial"]} textAlign="right">
          <Link as={NextLink} href="#">
            Check all payments &rarr;
          </Link>
        </Text>
      </CardHeader>
      <CardBody>
        <VStack divider={<StackDivider />} gap={6}>
          <PaymentItem
            title="Acceptance Fee"
            amount={25000}
            session="2022/2023"
            dueDate={new Date(2023, 2, 1)}
          />
          <PaymentItem
            title="Acceptance Fee"
            amount={25000}
            session="2022/2023"
            dueDate={new Date(2023, 5, 12)}
          />
        </VStack>
      </CardBody>
    </Card>
  );
};

export default PaymentsCard;

type PaymentItemProps = {
  title: string;
  amount: number;
  session?: string;
  dueDate: Date;
};

const PaymentItem: FC<PaymentItemProps> = ({
  title,
  amount,
  session,
  dueDate,
}) => {
  const isDue = dueDate.getTime() < Date.now();
  const statusColor = isDue ? "red" : "yellow";
  const statusText = isDue
    ? "Payment is due"
    : `Payment due in ${differenceInCalendarDays(dueDate, new Date())} days`;

  return (
    <Flex w="full" align="center">
      <Flex direction="column" w="full">
        <Text as="span" fontSize="2xl">
          {Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(amount)}
        </Text>
        <Text>
          {title}
          {session && " | " + session}
        </Text>
        <Text
          mt={4}
          fontSize="sm"
          display="inline-flex"
          gap={2}
          w="fit-content"
          alignItems="center"
        >
          <IoTime color={statusColor} /> <span>{statusText}</span>
        </Text>
      </Flex>
      <Button>Pay Now</Button>
    </Flex>
  );
};
