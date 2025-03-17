import { Box, Heading, Text, VStack, HStack, Button } from "@chakra-ui/react";
import Image from "next/image";

const Hero = () => {
  return (
    <Box
      bg="#F0FFF4"
      height="max-content"
      display={"flex"}
      justifyContent={"space-between"}
      pl="6rem"
      backgroundImage={"url(/landing-page/Pattern.png)"}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"right"}
      pt="5rem"
    >
      <VStack alignItems={"flex-start"} width={"50%"} pt="2rem" pb="8rem">
        <Text
          color="#01011A"
          fontSize={"4rem"}
          fontWeight={700}
          lineHeight={"110%"}
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

        <HStack gap="1rem">
          <Button
            boxShadow={"0px 1px 2px 0px rgba(13, 32, 62, 0.5)"}
            bg="white"
            color="black"
            _hover={{}}
            w="12rem"
            h="3rem"
          >
            Explore Programs
          </Button>

          <Button bg="#38A169" color={"white"} w={"12rem"} h="3rem">
            Apply Now
          </Button>
        </HStack>
      </VStack>

      {/* <Box alignSelf={"flex-end"}>
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
