import { useAllPayments } from "@/api/payment/use-all-payments";
import { useAllSessions } from "@/api/user/use-all-sessions";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Link,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { differenceInCalendarDays } from "date-fns";
import NextLink from "next/link";
import { FC } from "react";
import { IoTime } from "react-icons/io5";
import * as routes from "../../constants/routes";

const PaymentsCard: FC = () => {
  const outstandingPaymentsRes = useAllPayments({
    select: (payments) => {
      return payments.filter((payment) => payment.status === "unpaid");
    },
  });
  const sessions = useAllSessions();

  return (
    <Card mt={8}>
      <CardHeader
        display="flex"
        justifyContent="space-between"
        flexWrap={["wrap", null, "initial"]}
      >
        <Heading as="h2" fontSize="md">
          Outstanding Payment
        </Heading>
        <Text as="span" w={["full", null, "initial"]} textAlign="right">
          <Link as={NextLink} href={routes.PAYMENTS}>
            Check all payments &rarr;
          </Link>
        </Text>
      </CardHeader>
      <CardBody>
        {outstandingPaymentsRes.isLoading ? (
          <Center py={10}>
            <Spinner size="lg" color="primary" />
          </Center>
        ) : outstandingPaymentsRes.data &&
          outstandingPaymentsRes.data.length > 0 ? (
          <VStack divider={<StackDivider />} gap={6}>
            {outstandingPaymentsRes.data.map((payment) => (
              <PaymentItem
                key={payment.id}
                title={payment.title}
                amount={payment.amount}
                session={
                  sessions.data?.find((s) => s.id === payment.sessionId)?.name
                }
                dueDate={payment.dueDate}
              />
            ))}
          </VStack>
        ) : (
          <Center py={10}>
            <Text>You have no outstanding payments</Text>
          </Center>
        )}
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
