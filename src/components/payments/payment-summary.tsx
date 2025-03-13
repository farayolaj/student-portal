import { useAllSessions } from "@/api/user/use-all-sessions";
import buildPaymentDetailUrl from "@/lib/payments/build-payment-detail-url";
import queryClient from "@/lib/query-client";
import { Button, Card, CardBody, Flex, Text, Tooltip } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoCheckmarkCircle, IoTime } from "react-icons/io5";
import { paymentQueries } from "../../api/payment.queries";

type PaymentSummaryProps = {
  payment: Payment;
  isFresherSchoolFee: boolean;
};

export default function PaymentSummary({
  payment,
  isFresherSchoolFee,
}: PaymentSummaryProps) {
  const { push } = useRouter();
  const { data: session } = useAllSessions({
    select: (sessions) =>
      sessions.find((session) => session.id === payment.sessionId),
  });
  const descriptionArr = [session?.name, payment.semester];
  const verifyTransaction = useQuery({
    ...paymentQueries.verifyTransaction(payment.transaction?.rrr || ""),
    enabled: payment.status === "unpaid",
  });
  useEffect(() => {
    if (verifyTransaction.isSuccess && verifyTransaction.data)
      queryClient.invalidateQueries(["main-payments"]);
  }, [verifyTransaction, queryClient]);

  let description = descriptionArr.filter(Boolean).join(" | ");
  let statusIcon: JSX.Element;
  let statusText: string;

  if (payment.status === "paid") {
    if (payment.paymentOption === "part") {
      statusIcon = <IoCheckmarkCircle color="blue" />;
      statusText = "Partially Paid";
    } else {
      statusIcon = <IoCheckmarkCircle color="green" />;
      statusText = "Paid";
    }
  } else {
    statusIcon = <IoTime color="orange" />;
    statusText = "Unpaid";
  }
  const showPreselected =
    (payment.transaction && payment.containsPreselected) || payment.preselected;
  let amount = payment.amount;

  if (showPreselected) amount += payment.preselected?.amount || 0;

  return (
    <Tooltip
      label="Credentials verification required"
      isDisabled={!isFresherSchoolFee}
      isOpen={isFresherSchoolFee}
      placement={"top"}
      bg="red"
      hasArrow
    >
      <Card cursor="pointer" opacity={isFresherSchoolFee ? "0.4" : "none"}>
        <CardBody minH={40} pt="1.5rem" px="1.875rem" pb="2rem">
          <Flex direction="column" h="full">
            <Text as="span" fontWeight="semibold">
              {payment.title}
            </Text>

            <Text
              as="span"
              fontSize="xl"
              fontWeight="bold"
              mt={2}
              color="gray.700"
            >
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(amount)}
            </Text>
            <Text as="span" mt={2} minH={6} fontSize="sm" color="gray.600">
              {description}
            </Text>
            <Flex gap={2} align="center">
              {statusIcon}
              <Text as="span" fontSize="sm">
                {statusText}
              </Text>
            </Flex>
            <Text
              as="span"
              fontSize="sm"
              fontWeight="semibold"
              mt={2}
              mb={4}
              minH={6}
            >
              {Boolean(payment.dueDate.getTime()) &&
                payment.status !== "paid" &&
                `Due ${payment.dueDate?.toLocaleDateString()}`}
            </Text>
            <Button
              onClick={() =>
                push(
                  buildPaymentDetailUrl({
                    id: payment.id,
                    trxRef: payment.transactionRef,
                    trxType: payment.transactionType,
                  })
                )
              }
              mx="auto"
              w="fit-content"
              mt="auto"
              isDisabled={
                (payment.status === "unpaid" && !payment.isActive) ||
                isFresherSchoolFee
              }
            >
              {payment.status === "paid"
                ? "View Details"
                : payment.isActive
                  ? "View Details"
                  : "Payment Closed"}
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Tooltip>
  );
}
