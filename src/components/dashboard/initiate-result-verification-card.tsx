import { useProfile } from "@/api/user/use-profile";
import { VERIFY_RESULT } from "@/constants/routes";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoShieldCheckmark } from "react-icons/io5";

export default function InitiateResultVerificationCard() {
  const router = useRouter();

  const { data } = useProfile();
  const hasPaidOlevelRes = data?.user?.hasPaidOlevelVerification;
  const isVerifiedRes = data?.user?.isVerified;

  if (isVerifiedRes == undefined) return null;
  if (isVerifiedRes) return null;

  return (
    <Card p={4} mt={8}>
      <Flex gap={6} align="center">
        <Icon as={IoShieldCheckmark} boxSize={24} color="primary.500" />
        {hasPaidOlevelRes === false ? (
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
        ) : (
          <Box>
            <Heading fontSize={"1.5rem"}>Verification in Progress</Heading>
          </Box>
        )}
      </Flex>
    </Card>
  );
}
