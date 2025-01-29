import { HOME } from "@/constants/routes";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Error() {
  return (
    <Flex w="full" minH="100vh" align="center" justify="center" bg="gray.200">
      <Card w="40%" py={6} px={12} textAlign={"center"}>
        <CardHeader>
          <Heading size="md">Oops! We&apos;ve done something wrong!</Heading>
        </CardHeader>
        <CardBody>
          Don&apos;t worry, we&apos;re working on fixing this already!
          <Box mt={6}>
            <Link
              textAlign="center"
              as={NextLink}
              href={HOME}
              variant={"button"}
            >
              Go Back Home
            </Link>
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
}

Error.layoutProps = {
  isAuthenticated: false,
};
