import {
  VerificationTransaction,
  isVerificationTransactionError,
} from "@/api/verify-result/use-verify-result-verification-transaction";
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
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoShieldCheckmark } from "react-icons/io5";

type PayVerificationFeeCardProps = {
  data: VerificationTransaction;
};

export default function PayVerificationFeeCard({
  data,
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
            {!isVerificationTransactionError(data) ? (
              <Button
                isDisabled={data.isPaid}
                onClick={() =>
                  push(buildPaymentDetailUrl({ id: data.paymentId || "" }))
                }
                minW={24}
              >
                {data.paymentId ? (
                  data.isPaid ? (
                    "Paid"
                  ) : (
                    "Pay Verification Fee"
                  )
                ) : (
                  <Spinner size="sm" />
                )}
              </Button>
            ) : (
              <Text as="span">{data.error}</Text>
            )}
          </CardBody>
        </Box>
      </Flex>
    </Card>
  );
}
