import { Box, Button, HStack, Link, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

const Hero = () => {
  return (
    <Box
      bg="#F0FFF4"
      height="max-content"
      display={"flex"}
      justifyContent={"space-between"}
      pl={{ base: "1rem", lg: "6rem" }}
      pr={{ base: "1rem", lg: "0rem" }}
      pt={{ base: "2rem", lg: "5rem" }}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"right"}
      backgroundSize={"contain"}
      backgroundImage={"url(/landing-page/Pattern.png)"}
    >
      <VStack
        alignItems={"flex-start"}
        width={{ lg: "50%" }}
        pt="2rem"
        pb={{ base: "2rem", lg: "8rem" }}
      >
        <Text
          color="#01011A"
          fontWeight={700}
          lineHeight={"110%"}
          fontSize={{ base: "3rem", lg: "4rem" }}
        >
          Study at Your Own <br /> Pace with UI <br /> Distance Learning Centre
        </Text>
        <Box w="100%">
          <Image
            src={"/landing-page/underline.png"}
            alt="underline"
            width={500}
            height={100}
          />
        </Box>

        <Text fontSize="1.25rem" color="#606060" pt="1rem" pb="1.75rem">
          Flexible, accredited programs designed for working <br />{" "}
          professionals & students worldwide.
        </Text>

        <HStack gap="1rem" w={{ base: "100%", lg: "max-content" }}>
          <Button
            boxShadow={"0px 1px 2px 0px rgba(13, 32, 62, 0.5)"}
            w={{ lg: "12rem" }}
            bg="white"
            color="black"
            _hover={{}}
            h="3rem"
            as={Link}
            href="#"
          >
            Explore Programs
          </Button>

          <Button
            w={{ lg: "12rem" }}
            bg="#38A169"
            color={"white"}
            h="3rem"
            as={Link}
            href="https://modeofstudy.ui.edu.ng"
          >
            Apply Now
          </Button>
        </HStack>
      </VStack>

      {/* <Box alignSelf={"flex-end"} display={{base:"none", md:"none"}}>
        <Image
          src={"/landing-page/hero.png"}
          alt="hero image"
          width={600}
          height={600}
        />
      </Box> */}
    </Box>
  );
};

export default Hero;
