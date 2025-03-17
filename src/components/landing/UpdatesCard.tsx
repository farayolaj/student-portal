import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

interface UpdateCardProps {
  description: string;
  date: string;
  title: string;
  image: string;
}

const UpdateCard: React.FC<UpdateCardProps> = ({
  image,
  date,
  title,
  description,
}) => {
  return (
    <VStack
      border={"1px solid #E8E8EA"}
      alignItems={"flex-start"}
      borderRadius={"6px"}
      gap={"1rem"}
      p={"1rem"}
      maxW="25rem"
      w="32%"
    >
      <Box w="100%" h={"15rem"} position={"relative"}>
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
        <Text
          fontSize={"14px"}
          bg="rgba(62, 175, 63, 0.05)"
          color="rgba(56, 161, 105, 1)"
          fontWeight={500}
          px="10px"
          py="4px"
        >
          {date}
        </Text>

        <Text fontWeight={700} fontSize={"1.5rem"} color="#181A2A">
          {title}
        </Text>

        <Text color="#777777" fontSize={"18px"} lineHeight={"2.5rem"}>
          {description}
        </Text>
      </VStack>
    </VStack>
  );
};

export default UpdateCard;
