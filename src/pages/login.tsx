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
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Seo from "../components/common/seo";
import uiLogo from "../images/ui-logo.png";
import * as routes from "../constants/routes";
import useAuth from "../hooks/use-auth";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useValidateUsername } from "../api/auth/use-validate-username";

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
            title: "Invalid matric. number or email address",
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
      <Box minH="100vh" bg="gray.200">
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
        <Flex mt={8} justify="center">
          <Card
            w={["full", null, "40%"]}
            py={6}
            px={12}
            overflow="hidden"
            mb={8}
          >
            <CardHeader>
              <Heading textAlign="center" size="md">
                Log In to Student Portal
              </Heading>
            </CardHeader>
            <CardBody>
              <Flex direction="column" gap={6}>
                <chakra.form
                  mt={[16, null, 8]}
                  display="flex"
                  flexDir="column"
                  gap={6}
                  onSubmit={onSubmit}
                >
                  <FormControl hidden={usernameVerified}>
                    <FormLabel fontSize="sm" fontWeight="bold">
                      Matric. Number/Email Address
                    </FormLabel>
                    <Input
                      name="username"
                      placeholder="Enter matric. number or email address"
                      size="sm"
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                    />
                  </FormControl>
                  {usernameVerified && (
                    <FormControl>
                      <FormLabel fontSize="sm" fontWeight="bold">
                        Password
                      </FormLabel>
                      <InputGroup size="sm">
                        <Input
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
                              showPassword ? (
                                <IoEyeOutline />
                              ) : (
                                <IoEyeOffOutline />
                              )
                            }
                          />
                        </InputRightElement>
                      </InputGroup>
                      {/* <FormHelperText>
                        <Link as={NextLink} href={routes.FORGOT_PASSWORD}>
                          Forgot password?
                        </Link>
                      </FormHelperText> */}
                    </FormControl>
                  )}
                  <Box mt={16} mb={8}>
                    {usernameVerified ? (
                      <Button
                        w="full"
                        type="submit"
                        isDisabled={auth.isLoggingIn}
                      >
                        Log In
                      </Button>
                    ) : (
                      <Button
                        w="full"
                        isDisabled={validateUsername.isLoading}
                        type="submit"
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </chakra.form>
              </Flex>
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </>
  );
}

Login.layoutProps = {
  show: false,
  isAuthenticated: false,
};
