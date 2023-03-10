import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  VStack,
  Link,
  Flex,
  SkeletonText,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, ReactNode } from "react";

type ProfileCardProps = {
  matricNo?: string;
  level?: string;
  entryMode?: string;
  programme?: string;
  cgpa?: number;
};

const ProfileCard: FC<ProfileCardProps> = ({
  cgpa,
  entryMode,
  level,
  matricNo,
  programme,
}) => {
  return (
    <Card>
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
          <ProfileCardItem name="Matric. No." value={matricNo} />
          <ProfileCardItem name="Level" value={level} />
          <ProfileCardItem name="Entry Mode" value={entryMode} />
          <ProfileCardItem
            name="Programme"
            value={
              programme && (
                <Text as="span" textAlign="center">
                  {programme}
                </Text>
              )
            }
          />
          <ProfileCardItem name="CGPA" value={cgpa} />
          {/* <ProfileCardItem name="Session" value={session} /> */}
          {/* <ProfileCardItem name="Semester" value={semester} /> */}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;

type ProfileCardItemProps = {
  name: string;
  value?: ReactNode;
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
      {value ? <Text>{value}</Text> : <SkeletonText w={28} noOfLines={1} />}
    </VStack>
  );
};
