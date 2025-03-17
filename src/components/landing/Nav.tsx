import { Box, Button, Link } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
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

      {/* <Box display={"flex"} gap="3rem">
        <Link
          href={"#"}
          fontWeight={500}
          color={"#192F1E"}
          _hover={{ color: "#38A169" }}
        >
          About Us
        </Link>
        <Link
          href={"#"}
          fontWeight={500}
          color={"#192F1E"}
          _hover={{ color: "#38A169" }}
        >
          Application / Change mode of study
        </Link>
      </Box> */}
      <Button
        h={"3rem"}
        w={{ base: "6rem", lg: "8rem" }}
        bg="#38A169"
        fontWeight={700}
        fontSize={"1rem"}
        onClick={() => router.push("/login")}
      >
        Login
      </Button>
    </Box>
  );
};

export default Navbar;
