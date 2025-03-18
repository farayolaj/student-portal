import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

interface UpdateCardProps {
  description: string;
  title: string;
  image: string;
}

const UpdateCard: React.FC<UpdateCardProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <VStack
      border={"1px solid #E8E8EA"}
      alignItems={"flex-start"}
      borderRadius={"6px"}
      w={{ md: "30%", lg: "32%" }}
      maxW="25rem"
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
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </VStack>
    </VStack>
  );
};


export default UpdateCard;
