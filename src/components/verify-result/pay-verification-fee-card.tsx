import buildPaymentDetailUrl from "@/lib/payments/build-payment-detail-url";
import {
  Box,
  Card,
  Flex,
  Icon,
  CardHeader,
  Heading,
  CardBody,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoShieldCheckmark } from "react-icons/io5";

type PayVerificationFeeCardProps = {
  paymentId?: string;
  isPaid?: boolean;
};

export default function PayVerificationFeeCard({
  paymentId,
  isPaid = true,
}: PayVerificationFeeCardProps) {
  const { push } = useRouter();

  return (
    <Card p={4}>
      <Flex gap={6} direction={["column", null, "row"]} align="center">
        <Icon as={IoShieldCheckmark} boxSize={24} color="primary.500" />
        <Box>
          <CardHeader>
            <Heading fontSize="larger" fontWeight="semibold">
              Request for O&apos;Level Result Verification
            </Heading>
          </CardHeader>
          <CardBody>
            <Button
              isDisabled={isPaid}
              onClick={() =>
                push(buildPaymentDetailUrl({ id: paymentId || "" }))
              }
              minW={24}
            >
              {paymentId ? (
                isPaid ? (
                  "Paid"
                ) : (
                  "Pay Verification Fee"
                )
              ) : (
                <Spinner size="sm" />
              )}
            </Button>
          </CardBody>
        </Box>
      </Flex>
    </Card>
  );
}
