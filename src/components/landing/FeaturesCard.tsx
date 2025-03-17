import { Box, Text, VStack } from "@chakra-ui/react";

interface FeaturesCardProps {
  title: string;
  description: string;
}

const FeaturesCard = ({ title, description }: FeaturesCardProps) => {
  return (
    <VStack
      height={"13rem"}
      maxWidth={"19rem"}
      w="22%"
      bg="white"
      gap="5px"
      alignItems={"flex-start"}
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
