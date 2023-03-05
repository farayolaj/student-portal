import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  SimpleGrid,
  Text,
  VStack,
  Link,
  Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, ReactNode } from "react";

const ProfileCard: FC = () => {
  return (
    <Card mt={8}>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading as="h2" fontSize="md">
          Profile
        </Heading>
        <Text>
          <Link as={NextLink} href="#">
            See more &rarr;
          </Link>
        </Text>
      </CardHeader>
      <CardBody>
        <Flex
          flexWrap={["wrap", null, null, "nowrap"]}
          columnGap={12}
          rowGap={6}
          justify={["space-between", null, "initial"]}
        >
          <ProfileCardItem name="Matric. No." value="217349" />
          <ProfileCardItem name="Level" value="200" />
          <ProfileCardItem
            name="Programme"
            value={
              <Text as="span" textAlign="center">
                Environmental Science (B.Sc)
              </Text>
            }
          />
          <ProfileCardItem name="CGPA" value="3.64" />
          <ProfileCardItem name="Session" value="2022/2023" />
          <ProfileCardItem name="Semester" value="First" />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;

type ProfileCardItemProps = {
  name: string;
  value: ReactNode;
};

const ProfileCardItem: FC<ProfileCardItemProps> = ({ name, value }) => {
  return (
    <VStack
      align="initial"
      maxW={[null, null, "20rem"]}
      _even={{ textAlign: ["right", null, "initial"] }}
    >
      <Text fontSize="sm" fontWeight="semibold">
        {name}
      </Text>
      <Text>{value}</Text>
    </VStack>
  );
};
