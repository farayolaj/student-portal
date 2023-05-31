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
import { IoShieldCheckmark } from "react-icons/io5";

export default function PayVerificationFeeCard() {
  return (
    <Card p={4}>
      <Flex gap={6}>
        <Icon as={IoShieldCheckmark} boxSize={24} color="primary.500" />
        <Box>
          <CardHeader>
            <Heading fontSize="larger" fontWeight="semibold">
              Request for Result Verification
            </Heading>
          </CardHeader>
          <CardBody>
            <Button>Pay Verification Fee</Button>
            {/* <Button isDisabled>Paid</Button> */}
          </CardBody>
        </Box>
      </Flex>
    </Card>
  );
}
