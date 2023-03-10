import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Seo from "../components/common/seo";
import uiLogo from "../images/ui-logo.png";
import * as routes from "../constants/routes";
import { useState } from "react";

export default function ForgotPassword() {
  const [isResetRequestSent, setIsResetRequestSent] = useState(false);

  return (
    <>
      <Seo title="Reset Password" />
      <Box h="100vh" bg="gray.200">
        <Flex align="center" py={8} direction="column" gap={2}>
          <Image src={uiLogo} alt="University of Ibadan Logo" width={64} />
          <Box>
            <Text
              as="span"
              display="block"
              size="md"
              textAlign="center"
              textTransform="uppercase"
              fontWeight="bold"
            >
              Distance Learning Center
            </Text>
            <Text
              as="span"
              display="block"
              textAlign="center"
              textTransform="uppercase"
              fontWeight="semibold"
              fontSize="sm"
            >
              University of Ibadan
            </Text>
          </Box>
        </Flex>
        <Flex justify="center">
          <Card w="40%" py={6} px={12}>
            <CardHeader>
              <Heading textAlign="center" size="md">
                Reset Password
              </Heading>
            </CardHeader>
            <CardBody>
              {isResetRequestSent ? (
                <Flex direction="column" align="center" gap={8}>
                  <Text>Password has been reset. Check your email.</Text>
                  <Link as={NextLink} href={routes.LOGIN}>
                    &larr; Go back to Login
                  </Link>
                </Flex>
              ) : (
                <Flex as="form" direction="column" gap={6} align="center">
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="bold">
                      Matric. Number/Email Address
                    </FormLabel>
                    <Input
                      placeholder="Enter your matric. number or email address"
                      size="sm"
                    />
                    <FormHelperText mt={4}>
                      <Link as={NextLink} href={routes.LOGIN}>
                        &larr; Back to Login
                      </Link>
                    </FormHelperText>
                  </FormControl>
                  <Button onClick={() => setIsResetRequestSent(true)}>
                    Reset Password
                  </Button>
                </Flex>
              )}
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </>
  );
}

ForgotPassword.layoutProps = {
  show: false,
  isAuthenticated: false,
};
