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

export default function Login() {
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
              <Flex as="form" direction="column" gap={6}>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="bold">
                    Matric. Number/Email Address
                  </FormLabel>
                  <Input
                    placeholder="Enter matric. number or email address"
                    size="sm"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="bold">
                    Password
                  </FormLabel>
                  <Input
                    placeholder="Default password is your last name in lowercase"
                    size="sm"
                  />
                  <FormHelperText>
                    <Link as={NextLink} href={routes.FORGOT_PASSWORD}>
                      Forgot password?
                    </Link>
                  </FormHelperText>
                </FormControl>
                <Button type="submit">Log In</Button>
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
