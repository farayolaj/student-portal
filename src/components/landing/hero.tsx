import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "oidc-react";
import Image from "next/image";

import heroCornerImg from "../../images/home/hero-corner.png";

export default function Hero() {
  const auth = useAuth();

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
          fontSize={{ base: "2.25rem", lg: "4rem" }}
        >
          Study at Your Own <br /> Pace with UI Open
          <br />
          Distance e-Learning
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
          Flexible, accredited programmes designed for working professionals &
          students nationwide.
        </Text>

        <HStack gap="1rem" w={{ base: "100%", lg: "max-content" }}>
          <Button
            minW={"7rem"}
            w={{ lg: "12rem" }}
            bg="#38A169"
            color={"white"}
            h="3rem"
            onClick={() => auth.signIn()}
          >
            Start Now
          </Button>
        </HStack>
      </VStack>

      <Box alignSelf={"flex-end"} display={{ base: "none", md: "block" }}>
        <Image src={heroCornerImg} alt="" width={600} height={600} />
      </Box>
    </Box>
  );
}
