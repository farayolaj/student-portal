import { Card, CardBody, Flex, Text } from "@chakra-ui/react";

type NameValueCardProps = {
  name: string;
  value: string | number;
};

export default function NameValueCard({ name, value }: NameValueCardProps) {
  return (
    <Card>
      <CardBody
        display="flex"
        flexDirection="row-reverse"
        justifyContent="flex-end"
        alignItems="center"
        gap={3}
      >
        <Text fontSize="sm" fontWeight="bold" w="fit-content">
          {name}
        </Text>
        <Flex
          p={4}
          bg="primary.200"
          boxSize={12}
          justify="center"
          align="center"
          borderRadius="full"
        >
          <Text fontSize="lg" fontWeight="bold">
            {value}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
}
