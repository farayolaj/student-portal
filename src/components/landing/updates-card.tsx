import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { ReactNode } from "react";

interface UpdateCardProps {
  image: string;
  title: string;
  description: ReactNode;
}

export default function UpdateCard({
  image,
  title,
  description,
}: UpdateCardProps) {
  return (
    <VStack
      border={"1px solid #E8E8EA"}
      alignItems={"flex-start"}
      borderRadius={"6px"}
      gap={"1rem"}
      p={"1rem"}
    >
      <Box w="100%" h={{ base: "10rem", lg: "15rem" }} position={"relative"}>
        <Image
          fill
          style={{
            objectFit: "cover",
            borderRadius: "6px",
          }}
          src={image}
          alt="apply image"
        />
      </Box>
      <VStack p=".5rem" alignItems={"flex-start"}>
        <Text fontWeight={700} fontSize={"1.5rem"} color="#181A2A">
          {title}
        </Text>

        <Text
          color="#777777"
          fontSize={"18px"}
          lineHeight={{ base: "2rem", lg: "2.5rem" }}
        >
          {description}
        </Text>
      </VStack>
    </VStack>
  );
}
