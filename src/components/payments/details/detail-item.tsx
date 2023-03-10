import { Text, VStack } from "@chakra-ui/react";

type DetailItemProps = {
  name: string;
  value: number | string;
};

export default function DetailItem({ name, value }: DetailItemProps) {
  return (
    <VStack align="flex-start" spacing={0.5}>
      <Text fontSize="xs" fontWeight="bold" color="grey">
        {name.toUpperCase()}
      </Text>
      <Text fontWeight="semibold">{value}</Text>
    </VStack>
  );
}
