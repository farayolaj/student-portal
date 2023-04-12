import { Card, CardBody, Flex, Link, Text } from "@chakra-ui/react";
import { IoCheckmarkCircle } from "react-icons/io5";
import NextLink from "next/link";
import { useAllSessions } from "@/api/user/use-all-sessions";

type PaymentSummaryProps = {
  payment: Payment;
};

export default function PaymentSummary({ payment }: PaymentSummaryProps) {
  const { data: session } = useAllSessions({
    select: (sessions) =>
      sessions.find((session) => session.id === payment.sessionId),
  });
  const descriptionArr = [session?.name, payment.semester];
  let description = descriptionArr.filter(Boolean).join(" | ");
  let statusColor: string;
  let statusText: string;

  if (payment.status === "paid") {
    statusColor = "green";
    statusText = "Paid";
  } else {
    statusColor = "yellow";
    statusText = "Unpaid";
  }

  return (
    <Card>
      <CardBody minH={40}>
        <Flex direction="column" h="full">
          <Text as="span" fontWeight="semibold">
            {payment.title}
          </Text>
          <Text as="span" fontSize="xl" fontWeight="bold">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(payment.amount)}
          </Text>
          <Text as="span" mt={2} minH={6} fontSize="sm">
            {description}
          </Text>
          <Flex gap={2} align="center">
            <IoCheckmarkCircle color={statusColor} />
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
          <Link
            as={NextLink}
            variant="button"
            href={`/payments/${payment.id}`}
            mx="auto"
            w="fit-content"
            mt="auto"
          >
            View Details
          </Link>
        </Flex>
      </CardBody>
    </Card>
  );
}
