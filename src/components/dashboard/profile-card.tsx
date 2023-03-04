import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  SimpleGrid,
  Text,
  VStack,
  Link,
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
        <SimpleGrid columns={[1, null, 2, 5]}>
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
        </SimpleGrid>
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
    <VStack>
      <Text fontSize="sm" fontWeight="semibold">
        {name}
      </Text>
      <Text>{value}</Text>
    </VStack>
  );
};
