import { Box, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useAuth } from "oidc-react";

const Navbar = () => {
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
      <Box width={"max-content"} cursor={"pointer"}>
        <Image
          width={300}
          height={52}
          src="/landing-page/logo.svg"
          alt="University of Ibadan Logo"
        />
      </Box>
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
};

export default Navbar;
