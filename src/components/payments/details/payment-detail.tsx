import { Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { IoCheckmarkCircle } from "react-icons/io5";

type PaymentDetailProps = {
  payment: Payment;
};

export default function PaymentDetail({ payment }: PaymentDetailProps) {
  const description =
    payment.type === "tuition"
      ? `${payment.session} - ${payment.semester}`
      : payment.type === "secondary"
      ? payment.session
      : payment.type === "custom"
      ? `${payment.session} - ${payment.semester} (Custom Payment)`
      : "";
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
      <CardBody>
        <Flex justify="space-between" align="center">
          <Flex direction="column" fontSize="xl">
            <Text as="span" fontWeight="semibold">
              {payment.title}
            </Text>
            <Text as="span" fontSize="3xl" fontWeight="bold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(payment.amount / 100)}
            </Text>
            <Text as="span" mt={2} fontSize="sm">
              {description}
            </Text>
            <Flex gap={2} align="center" mt={4}>
              <IoCheckmarkCircle color={statusColor} />
              <Text as="span" fontSize="md">
                {statusText}
              </Text>
            </Flex>
          </Flex>
          {payment.status === "paid" ? (
            <Button>Print Receipt</Button>
          ) : (
            <Flex direction="column">
              <Button
                isDisabled={payment.transactions?.at(0)?.status === "pending"}
              >
                Pay Now
              </Button>
              <Text as="span" fontSize="sm" fontWeight="semibold" mt={8}>
                {payment.dueDate &&
                  `Due ${payment.dueDate?.toLocaleDateString()}`}
              </Text>
            </Flex>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
}
