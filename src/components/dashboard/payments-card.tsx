import { useAllPayments } from "@/api/payment/use-all-payments";
import { useSession } from "@/api/user/use-session";
import {
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
              <PaymentItem key={payment.id} payment={payment} />
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
  payment: Payment;
};

const PaymentItem: FC<PaymentItemProps> = ({ payment }) => {
  const sessionRes = useSession(payment?.sessionId || "");

  if (!payment) return null;

  const isDue = payment.dueDate.getTime() < Date.now();
  const statusColor = isDue ? "red" : "yellow";
  const statusText = isDue
    ? "Payment is due"
    : `Payment due in ${differenceInCalendarDays(
        payment.dueDate,
        new Date()
      )} days`;

  return (
    <Flex w="full" align="center" justify="space-between">
      <Flex direction="column" w="max-content">
        <Text as="span" fontSize="2xl">
          {Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(payment.amount)}
        </Text>
        <Text>
          {payment.title}
          {sessionRes.data && " | " + sessionRes.data.name}
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
      <Link
        as={NextLink}
        href={`/payments/${payment.id}`}
        variant="button"
        w="fit-content"
      >
        View Details
      </Link>
    </Flex>
  );
};
