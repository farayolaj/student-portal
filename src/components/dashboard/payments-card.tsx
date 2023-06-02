import { useAllPayments } from "@/api/payment/use-all-payments";
import { useSession } from "@/api/user/use-session";
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
import { useRouter } from "next/router";

const PaymentsCard: FC = () => {
  const outstandingPaymentsRes = useAllPayments({
    select: (payments) => {
      return payments.main.filter((payment) => payment.status === "unpaid");
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
  const { push } = useRouter();
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
  const showPreselected =
    (payment.transaction && payment.containsPreselected) || payment.preselected;
  let amount = payment.amount;

  if (showPreselected) amount += payment.preselected?.amount || 0;

  return (
    <Flex
      w="full"
      direction={["column", null, "row"]}
      align={["flex-end", null, "center"]}
      justify="space-between"
      rowGap={4}
    >
      <Flex direction="column" w="full">
        <Text as="span" fontSize="2xl">
          {Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(amount)}
        </Text>
        <Text>
          {payment.title}
          {showPreselected && " with " + payment.preselected?.title}
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
      <Button
        onClick={() => push(`/payments/${payment.id}`)}
        w="fit-content"
        isDisabled={!payment.isActive}
      >
        {payment.isActive ? "View Details" : "Payment Closed"}
      </Button>
    </Flex>
  );
};
