import { Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { IoCheckmarkCircle, IoTime } from "react-icons/io5";
import { useAllSessions } from "@/api/user/use-all-sessions";
import { useRouter } from "next/router";

type PaymentSummaryProps = {
  payment: Payment;
};

export default function PaymentSummary({ payment }: PaymentSummaryProps) {
  const { push } = useRouter();
  const { data: session } = useAllSessions({
    select: (sessions) =>
      sessions.find((session) => session.id === payment.sessionId),
  });
  const descriptionArr = [session?.name, payment.semester];
  let description = descriptionArr.filter(Boolean).join(" | ");
  let statusIcon: JSX.Element;
  let statusText: string;

  if (payment.status === "paid") {
    statusIcon = <IoCheckmarkCircle color="green" />;
    statusText = "Paid";
  } else {
    statusIcon = <IoTime color="orange" />;
    statusText = "Unpaid";
  }

  let amount = payment.amount;

  if (payment.transaction && payment.containsPreselected) {
    amount += payment.preselected?.amount || 0;
  } else if (payment.preselected) {
    amount += payment.preselected.amount;
  }

  return (
    <Card>
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
            {payment.dueDate &&
              payment.status !== "paid" &&
              `Due ${payment.dueDate?.toLocaleDateString()}`}
          </Text>
          <Button
            onClick={() => push(`/payments/${payment.id}`)}
            mx="auto"
            w="fit-content"
            mt="auto"
            isDisabled={!payment.isActive}
          >
            {payment.isActive ? "View Details" : "Payment Closed"}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}
