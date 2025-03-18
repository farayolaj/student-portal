import { Box, Text, VStack } from "@chakra-ui/react";

interface FeaturesCardProps {
  title: string;
  description: string;
}

const FeaturesCard = ({ title, description }: FeaturesCardProps) => {
  return (
    <VStack
      maxWidth={{ base: "25rem", lg: "19rem" }}
      minH={{ base: "12rem", lg: "15rem" }}
      w={{ base: "100%", lg: "22%" }}
      alignItems={"flex-start"}
      bg="white"
      gap="5px"
      p={"2rem"}
    >
      <Text fontSize={"1.5rem"} color="#25324B" fontWeight={700}>
        {title}
      </Text>
      <Text fontSize={"1rem"} color="#7C8493">
        {description}
      </Text>
    </VStack>
  );
};

export default FeaturesCard;
