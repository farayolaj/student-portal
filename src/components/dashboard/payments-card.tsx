import { useAllPayments } from "@/api/payment/use-all-payments";
import { usePaymentDetail } from "@/api/payment/use-payment-detail";
import { useAllSessions } from "@/api/user/use-all-sessions";
import { useProfile } from "@/api/user/use-profile";
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { differenceInCalendarDays } from "date-fns";
import NextLink from "next/link";
import { FC } from "react";
import { IoTime } from "react-icons/io5";
import * as routes from "../../constants/routes";
import RemitaInline from "../common/remita-inline";

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
              <PaymentItem
                key={payment.id}
                paymentId={payment.id}
                onPaymentSuccess={() => {
                  outstandingPaymentsRes.refetch();
                }}
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
  paymentId: string;
  onPaymentSuccess: () => void;
};

const PaymentItem: FC<PaymentItemProps> = ({ paymentId, onPaymentSuccess }) => {
  const profileRes = useProfile();
  const paymentRes = usePaymentDetail({ variables: { id: paymentId } });
  const payment = paymentRes.data;
  const sessionRes = useSession(payment?.sessionId || "");
  const toast = useToast();

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
    <Flex w="full" align="center">
      <Flex direction="column" w="full">
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
      <Button
        as={RemitaInline}
        data={{
          key: payment.transaction?.publicKey || "",
          customerId: profileRes.data?.user?.email as string,
          firstName: profileRes.data?.user?.firstName as string,
          lastName: profileRes.data?.user?.lastName as string,
          email: profileRes.data?.user?.email as string,
          amount: payment.amount,
          narration: payment.title,
          processRrr: true,
          transactionId: payment.transaction?.referenceNumber,
          extendedData: {
            customFields: [
              {
                name: "rrr",
                value: payment.transaction?.rrr,
              },
            ],
          },
        }}
        onSuccess={() => {
          onPaymentSuccess();
          toast({
            status: "success",
            title: "Payment Successful",
            description:
              "If payment doesn't reflect immediately, requery transaction status later.",
          });
        }}
        onError={() => {
          toast({
            status: "error",
            title: "Payment Failed",
            description: "Please try again later.",
          });
        }}
        text="Pay Now"
      />
    </Flex>
  );
};
