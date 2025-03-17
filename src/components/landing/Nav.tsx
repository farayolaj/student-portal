import { Box, Button, Link } from "@chakra-ui/react";
import Image from "next/image";

const Navbar = () => {
  return (
    <Box
      justifyContent={"space-between"}
      borderBottom={"1px solid #DEDEDE"}
      position={"sticky"}
      alignItems={"center"}
      height={"4.875rem"}
      display={"flex"}
      w="100%"
      top={0}
      px={"6rem"}
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
        w={"8rem"}
        bg="#38A169"
        fontWeight={700}
        fontSize={"1rem"}
      >
        Login
      </Button>
    </Box>
  );
};

export default Navbar;
