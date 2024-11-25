import {
  Box,
  Card,
  CardBody,
  Heading,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { VERIFY_RESULT } from "@/constants/routes";

const ScreeningInfo = () => {
  return (
    <>
      <Box w='full'>
        <Card>
          <CardBody>
            <Heading fontSize="medium" fontWeight="semibold">
              Please start your screening/verification process.
              <Link px=".2rem" as={NextLink} href={VERIFY_RESULT}>
                Click here
              </Link>
              for online verification
            </Heading>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default ScreeningInfo;