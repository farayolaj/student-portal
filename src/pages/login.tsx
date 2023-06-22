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
  Spacer,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, FormEvent } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useValidateUsername } from "../api/auth/use-validate-username";
import Seo from "../components/common/seo";
import * as routes from "../constants/routes";
import useAuth from "../hooks/use-auth";

import uiLogo from "../images/ui-logo.png";
import greenery from "../images/greenery.png";

const textContent = [
  {
    title: "Student Portal",
    content: [
      "Student Portal is your personal website containing all the " +
        "information and menu you need as a student. Login to access your " +
        "academic schedule, fees, courses, documents and more.",
    ],
  },
  {
    title: "Sign In",
    content: [
      "New students: Sign in with your application number or email address as username.",
      "Registered students: Use matric number or @dlc email. The default password is your surname.",
    ],
  },
  {
    title: "Student Support",
    content: [
      "If you have any questions or are experiencing technical difficulties please contact us at " +
        "student support or use the life chat during office hours.",
    ],
  },
];

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

  const [imgScaleX, setImgScaleX] = useState(1);
  const [selectedText, setSelectedText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgScaleX((prev) => -prev);
      setSelectedText((prev) => (prev + 1) % textContent.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
        <Text as="span" fontSize="lg" fontWeight="semibold">
          University of Ibadan
        </Text>
        <Spacer />
        <Link href="https://dlcportal.ui.edu.ng/i-help">i-Help</Link>
        <Spacer display={["none", null, "initial"]} />
      </Flex>
      <Flex wrap={["wrap", null, "nowrap"]} minH="calc(100vh - 4rem)">
        <Box
          bg="primary.500"
          w={["full", null, "66.6%"]}
          p={[null, null, "5rem"]}
        >
          <Box
            pos="relative"
            h="full"
            _before={{
              content: "''",
              display: ["none", null, "block"],
              pos: "absolute",
              w: "100%",
              h: "100%",
              top: "1.5rem",
              left: "1.5rem",
              bg: "white",
            }}
          >
            <Box display={["none", null, "block"]}>
              <Image
                src={greenery}
                alt=""
                fill
                style={{
                  objectFit: "cover",
                  transform: `scaleX(${imgScaleX})`,
                }}
                priority
              />
            </Box>
            <Box
              w={[null, null, "50%"]}
              pos={[null, null, "absolute"]}
              p="2rem"
              bg="primary.500"
              bottom={[null, null, "-1.5rem"]}
              color="white"
            >
              <Heading as="h2" size="lg">
                {textContent[selectedText].title}
              </Heading>
              <Text mt={2}>
                {textContent[selectedText].content.map((content) => (
                  <span key={content}>
                    {content} <br />
                  </span>
                ))}
              </Text>
            </Box>
          </Box>
        </Box>
        <Flex align="center" w={["full", null, "33.4%"]} bg="primary.50">
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
                    <Link as={NextLink} href={routes.FORGOT_PASSWORD}>
                      Forgot password?
                    </Link>
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
      </Flex>
    </>
  );
}

Login.layoutProps = {
  show: false,
  isAuthenticated: false,
};
