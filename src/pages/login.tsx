import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoArrowBack } from "react-icons/io5";
import { useValidateUsername } from "../api/auth/use-validate-username";
import Seo from "../components/common/seo";
import * as routes from "../constants/routes";
import useAuth from "../hooks/use-auth";

import LoginCarousel from "@/components/login/carousel";
import uiLogo from "../images/ui-logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameVerified, setUsernameVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();
  const validateUsername = useValidateUsername();

  const onValidateUsername = () => {
    validateUsername.mutate(
      { username },
      {
        onSuccess: () => {
          setUsernameVerified(true);
        },
        onError: (err) => {
          const error = err as Error;
          toast({
            title: error.message.toLowerCase().includes("network")
              ? "Matric. number or email address could not be validated"
              : "Invalid matric. number or email address",
            description: error?.message,
            status: "error",
            isClosable: true,
          });
        },
      }
    );
  };

  const onLogin = () => {
    auth.login(
      { username, password },
      {
        onSuccess: () => {
          router.push(routes.HOME);
        },
        onError: (err) => {
          toast({
            title: "Login Failed",
            description: err?.message,
            status: "error",
            isClosable: true,
          });
        },
      }
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usernameVerified) onValidateUsername();
    else onLogin();
  };

  return (
    <>
      <Seo title="Login" />
      <Flex
        position="sticky"
        align="center"
        gap={4}
        top="0px"
        zIndex={999}
        as="header"
        bg="white"
        py={2}
        px={8}
        h="4rem"
        w="full"
      >
        <Image height={48} src={uiLogo} alt="University of Ibadan Logo" />
        <Flex direction="column">
          <Text
            display={["none", null, "initial"]}
            as="span"
            fontSize="lg"
            fontWeight="bold"
          >
            Distance Learning Centre
          </Text>
          <Text
            display={["none", null, "initial"]}
            as="span"
            fontSize="sm"
            fontWeight="semibold"
          >
            University of Ibadan
          </Text>
        </Flex>
        <Spacer />
        <Link href="https://dlcportal.ui.edu.ng/i-help">i-Help</Link>
        <Spacer display={["none", null, "initial"]} />
      </Flex>
      <Box display={[null, null, "flex"]} minH="calc(100vh - 4rem)">
        <LoginCarousel />
        <Flex
          align="center"
          w={["full", null, "33.4%"]}
          bg="primary.50"
          mt={["4rem", "0px"]}
        >
          <Box w="full">
            <Heading textAlign="center" size="md" mt={8}>
              Log In
            </Heading>
            <chakra.form
              mt={16}
              display="flex"
              flexDir="column"
              gap={6}
              onSubmit={onSubmit}
              w="80%"
              mx="auto"
            >
              <FormControl isReadOnly={usernameVerified} isRequired>
                <FormLabel fontSize="sm" fontWeight="bold">
                  Matric. Number/Email Address
                </FormLabel>
                <Input
                  bg="white"
                  name="username"
                  placeholder="Enter matric. number or email address"
                  size="sm"
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  hidden={usernameVerified}
                />
                {usernameVerified && (
                  <Text fontSize="sm" py={1} px={3}>
                    {username}
                  </Text>
                )}
              </FormControl>
              {usernameVerified && (
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="bold">
                    Password
                  </FormLabel>
                  <InputGroup size="sm">
                    <Input
                      bg="white"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Default password is your last name in lowercase"
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <InputRightElement>
                      <IconButton
                        variant="unstyled"
                        aria-label="Toggle password visibility"
                        boxSize={6}
                        onClick={togglePasswordVisibility}
                        icon={
                          showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText>
                    <HStack justifyContent={"space-between"}>
                      <Link as={NextLink} href={routes.FORGOT_PASSWORD}>
                        Forgot password?
                      </Link>

                      <Text
                        display={"flex"}
                        cursor={"pointer"}
                        onClick={() => setUsernameVerified(false)}
                      >
                        <IoArrowBack />
                        Go Back
                      </Text>
                    </HStack>
                  </FormHelperText>
                </FormControl>
              )}
              <Box mt={16} mb={8}>
                {usernameVerified ? (
                  <Button w="full" type="submit" isDisabled={auth.isLoggingIn}>
                    {auth.isLoggingIn ? (
                      <Spinner color="white" size="xs" />
                    ) : (
                      "Log In"
                    )}
                  </Button>
                ) : (
                  <Button
                    w="full"
                    isDisabled={validateUsername.isLoading}
                    type="submit"
                  >
                    {validateUsername.isLoading ? (
                      <Spinner color="white" size="xs" />
                    ) : (
                      "Next"
                    )}
                  </Button>
                )}
              </Box>
            </chakra.form>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

Login.layoutProps = {
  show: false,
  isAuthenticated: false,
};
