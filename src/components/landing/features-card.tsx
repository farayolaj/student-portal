import { Text, VStack } from "@chakra-ui/react";

interface FeaturesCardProps {
  title: string;
  description: string;
}

export default function FeaturesCard({
  title,
  description,
}: FeaturesCardProps) {
  return (
    <VStack alignItems={"flex-start"} bg="white" gap="5px" p={"2rem"}>
      <Text fontSize={"1.5rem"} color="#25324B" fontWeight={700}>
        {title}
      </Text>
      <Text fontSize={"1rem"} color="#7C8493">
        {description}
      </Text>
    </VStack>
  );
}
