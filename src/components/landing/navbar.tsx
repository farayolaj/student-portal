import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useAuth } from "oidc-react";

import uiLogo from "../../images/ui-logo.png";

export default function Navbar() {
  const auth = useAuth();

  return (
    <Box
      justifyContent={"space-between"}
      borderBottom={"1px solid #DEDEDE"}
      px={{ base: "1rem", lg: "6rem" }}
      alignItems={"center"}
      position={"sticky"}
      height={"4.875rem"}
      display={"flex"}
      w="100%"
      top={0}
      bg="white"
      zIndex={999}
    >
      <Flex width={"max-content"} cursor={"pointer"} gap={4}>
        <Image height={52} src={uiLogo} alt="University of Ibadan Logo" />
        <Flex direction="column" justify={"space-between"}>
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
      </Flex>
      <Button
        h={"3rem"}
        w={{ base: "6rem", lg: "8rem" }}
        bg="#38A169"
        fontWeight={700}
        fontSize={"1rem"}
        onClick={() => auth.signIn()}
      >
        Login
      </Button>
    </Box>
  );
}
