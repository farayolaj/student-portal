import {
  Box,
  Button,
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
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useValidateUsername } from "../api/auth/use-validate-username";
import Seo from "../components/common/seo";
import * as routes from "../constants/routes";
import useAuth from "../hooks/use-auth";

import uiLogo from "../images/ui-logo.png";
import studentImage from "../images/student_image.jpg";

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
      <Flex wrap={["wrap", null, "nowrap"]} minH="100vh">
        <Box w={["full", null, "33.4%"]} order={[1, null, 2]}>
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
          <Heading textAlign="center" size="md" mt={8}>
            Log In to Student Portal
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
            <FormControl isReadOnly={usernameVerified}>
              <FormLabel fontSize="sm" fontWeight="bold">
                Matric. Number/Email Address
              </FormLabel>
              <Input
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
                        showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />
                      }
                    />
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>
                  <Link as={NextLink} href={routes.FORGOT_PASSWORD}>
                    Forgot password?
                  </Link>
                </FormHelperText>
              </FormControl>
            )}
            <Box mt={16} mb={8}>
              {usernameVerified ? (
                <Button w="full" type="submit" isDisabled={auth.isLoggingIn}>
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
        </Box>
        <Box
          bg="gray.200"
          w={["full", null, "66.6%"]}
          order={[2, null, 1]}
          pos="relative"
        >
          <Image
            src={studentImage}
            alt="Students in a class"
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Flex>
    </>
  );
}

Login.layoutProps = {
  show: false,
  isAuthenticated: false,
};
