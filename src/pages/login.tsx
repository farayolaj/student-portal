import {
  Box,
  Button,
  Flex,
  Link,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import Seo from "../components/common/seo";

import LoginCarousel from "@/components/login/carousel";
import { HOME } from "@/constants/routes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useAuth } from "oidc-react";
import { useEffect } from "react";
import uiLogo from "../images/ui-logo.png";

function snakeToSentence(snake: string) {
  return snake
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Login() {
  const { signIn, isLoading, userData } = useAuth();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  useEffect(() => {
    if (error && errorDescription) {
      toast({
        title: snakeToSentence(error),
        description: errorDescription,
        status: "error",
        isClosable: true,
      });
    }
  }, [error, errorDescription, toast]);

  if (userData) {
    push(HOME);
  }

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
            fontWeight="semibold"
            fontSize="sm"
            as="span"
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
          justify={"center"}
          w={["full", null, "33.4%"]}
          bg="primary.50"
          mt={["4rem", "0px"]}
        >
          <Button
            onClick={() => signIn()}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Sign In (SSO)
          </Button>
        </Flex>
      </Box>
    </>
  );
}

Login.layoutProps = {
  isAuthenticated: false,
};
