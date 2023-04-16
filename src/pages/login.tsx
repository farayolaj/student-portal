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
import { useEffect, useState, FormEvent } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useValidateUsername } from "../api/auth/use-validate-username";
import Seo from "../components/common/seo";
import * as routes from "../constants/routes";
import useAuth from "../hooks/use-auth";

import uiLogo from "../images/ui-logo.png";
import blueGreenDiamonds from "../images/blue_green_diamonds.png";
import greenery from "../images/greenery.png";

const bgImages = [blueGreenDiamonds, greenery];

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

  const [bgImageIdx, setBgImageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIdx((bgImageIdx + 1) % bgImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [bgImageIdx]);

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
        <Text
          display={["none", null, "initial"]}
          as="span"
          fontSize="lg"
          fontWeight="semibold"
        >
          University of Ibadan
        </Text>
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
            <Image
              src={bgImages[bgImageIdx]}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
            <Box
              w={[null, null, "50%"]}
              pos="absolute"
              p="2rem"
              bg="primary.500"
              bottom={[null, null, "-1.5rem"]}
              color="white"
            >
              <Heading as="h2" size="lg">
                Student Portal
              </Heading>
              <Text mt={2}>
                Get to know your new community! This special section for
                admitted students includes a welcome message, posts from your
                new classmates, and important information about preparing to
                enroll.
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
        </Flex>
      </Flex>
    </>
  );
}

Login.layoutProps = {
  show: false,
  isAuthenticated: false,
};
