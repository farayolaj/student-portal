import { Card, CardBody, CardHeader, Flex, Heading } from "@chakra-ui/react";

export default function Error() {
  return (
    <Flex w="full" minH="100vh" align="center" justify="center" bg="gray.200">
      <Card w="40%" py={6} px={12}>
        <CardHeader>
          <Heading size="md">Oops! We&apos;ve done something wrong!</Heading>
        </CardHeader>
        <CardBody>
          Don&apos;t worry, we&apos;re working on fixing this already!
        </CardBody>
      </Card>
    </Flex>
  );

  return <div>Oops! We&apos;ve done something wrong! We&apos;re fixing it</div>;
}

Error.layoutProps = {
  show: false,
  isAuthenticated: false,
};
