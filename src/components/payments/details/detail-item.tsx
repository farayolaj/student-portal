import { SkeletonText, Text, VStack } from "@chakra-ui/react";

type DetailItemProps = {
  name: string;
  value: number | string;
  isLoading?: boolean;
};

export default function DetailItem({
  name,
  value,
  isLoading,
}: DetailItemProps) {
  return (
    <VStack align="flex-start" spacing={0.5}>
      <Text fontSize="xs" fontWeight="bold" color="grey">
        {name.toUpperCase()}
      </Text>
      {isLoading ? (
        <SkeletonText noOfLines={1} w="10rem" skeletonHeight={4} />
      ) : (
        <Text fontWeight="semibold">{value}</Text>
      )}
    </VStack>
  );
}
