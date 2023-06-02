import { useVerifyResultVerificationTransaction } from "@/api/verify-result/use-verify-result-verification-transaction";
import { VERIFY_RESULT } from "@/constants/routes";
import {
  Box,
  Card,
  Flex,
  Icon,
  CardHeader,
  Heading,
  CardBody,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoShieldCheckmark } from "react-icons/io5";

export default function InitiateResultVerificationCard() {
  const router = useRouter();
  const verificationTransactionRes = useVerifyResultVerificationTransaction();

  if (verificationTransactionRes.data?.isPaid) return null;

  return (
    <Card p={4} mt={8}>
      <Flex gap={6}>
        <Icon as={IoShieldCheckmark} boxSize={24} color="primary.500" />
        <Box>
          <CardHeader>
            <Heading fontSize="larger" fontWeight="semibold">
              Request for O&apos;Level Result Verification
            </Heading>
          </CardHeader>
          <CardBody>
            <Button onClick={() => router.push(VERIFY_RESULT)}>
              Request Now
            </Button>
          </CardBody>
        </Box>
      </Flex>
    </Card>
  );
}
