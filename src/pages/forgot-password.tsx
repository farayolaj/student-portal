import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  chakra,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import NextLink from "next/link";
import { FormEventHandler, useState } from "react";
import { resetPassword } from "../api/auth.mutations";
import Seo from "../components/common/seo";
import * as routes from "../constants/routes";
import uiLogo from "../images/ui-logo.png";

export default function ForgotPassword() {
  const [isResetRequestSent, setIsResetRequestSent] = useState(false);
  const [username, setUsername] = useState("");
  const passwordResetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => setIsResetRequestSent(true),
  });

  const onPasswordReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    passwordResetMutation.mutate({ username });
  };

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
              Distance Learning Centre
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
          <Card w={["80%", null, null, "40%"]} py={6} px={[4, null, null, 12]}>
            <CardHeader>
              <Heading textAlign="center" size="md">
                Reset Password
              </Heading>
            </CardHeader>
            <CardBody>
              {isResetRequestSent ? (
                <Flex direction="column" align="center" gap={8}>
                  <Text>
                    Your password has been reset to default. Kindly login with
                    your default password.
                  </Text>
                  <Link as={NextLink} href={routes.LOGIN}>
                    &larr; Go back to Login
                  </Link>
                </Flex>
              ) : (
                <chakra.form
                  display="flex"
                  flexDir="column"
                  gap={6}
                  alignItems="center"
                  onSubmit={onPasswordReset}
                >
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="bold">
                      Matric. Number/Email Address
                    </FormLabel>
                    <Input
                      placeholder="Enter your matric. number or email address"
                      name="username"
                      size="sm"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <FormHelperText mt={4}>
                      <Link as={NextLink} href={routes.LOGIN}>
                        &larr; Back to Login
                      </Link>
                    </FormHelperText>
                  </FormControl>
                  <Button
                    isDisabled={passwordResetMutation.isPending}
                    type="submit"
                  >
                    {passwordResetMutation.isPending ? (
                      <Spinner size="sm" />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </chakra.form>
              )}
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </>
  );
}

ForgotPassword.layoutProps = {
  isAuthenticated: false,
};
