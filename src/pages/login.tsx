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
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Seo from "../components/common/seo";
import uiLogo from "../images/ui-logo.png";
import * as routes from "../constants/routes";
import useAuth from "../hooks/use-auth";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const router = useRouter();

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    auth.login(
      { username, password },
      {
        onSuccess: () => {
          router.push(routes.HOME);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return (
    <>
      <Seo title="Login" />
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
                Log In to Student Portal
              </Heading>
            </CardHeader>
            <CardBody>
              <chakra.form
                display="flex"
                flexDir="column"
                gap={6}
                onSubmit={onLogin}
              >
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="bold">
                    Matric. Number/Email Address
                  </FormLabel>
                  <Input
                    name="username"
                    placeholder="Enter matric. number or email address"
                    size="sm"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="bold">
                    Password
                  </FormLabel>
                  <Input
                    name="password"
                    placeholder="Default password is your last name in lowercase"
                    size="sm"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormHelperText>
                    <Link as={NextLink} href={routes.FORGOT_PASSWORD}>
                      Forgot password?
                    </Link>
                  </FormHelperText>
                </FormControl>
                <Button type="submit">Log In</Button>
              </chakra.form>
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
