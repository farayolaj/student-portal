import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function MessageListItem() {
  return (
    <Box px={6} py={4} cursor="pointer" _hover={{ bg: "primary.100" }}>
      <Flex gap={2} justify="space-between" align="center">
        <Heading as="h3" size="sm" fontWeight="semibold">
          Faculty of Environmental Science
        </Heading>
        <Text
          as="span"
          textAlign="end"
          fontSize="xs"
          minW="20%"
          color="gray.600"
        >
          5 months ago
        </Text>
      </Flex>
      <Text fontSize="sm" fontWeight="medium" mt={2}>
        New Session Meet Up Requirements
      </Text>
      <Text fontSize="sm" color="gray.600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam urna nulla,
        tempor non commodo a, tempor vitae sapientia...
      </Text>
    </Box>
  );
}
