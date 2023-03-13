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
  Avatar,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, ReactNode } from "react";
import { useDashboardInfo } from "../../api/dashboard/use-dashboard-info";

const ProfileCard: FC = () => {
  const dashboardInfo = useDashboardInfo();
  const isLoading = dashboardInfo.isInitialLoading;
  const matricNo = dashboardInfo.data?.user?.matricNumber;
  const level = dashboardInfo.data?.programme?.level;
  const entryMode = dashboardInfo.data?.programme?.entryMode;
  const programme = dashboardInfo.data?.programme?.programme;
  const cgpa = dashboardInfo.data?.cpga || "N/A";
  const fullName = `${dashboardInfo.data?.user?.firstName} ${
    dashboardInfo.data?.user?.otherNames || ""
  } ${dashboardInfo.data?.user?.lastName}`;
  // const session = dashboardInfo.data?.programme.currentSession;

  return (
    <Card>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading as="h2" fontSize="md">
          Profile
        </Heading>
        {/* <Text>
          <Link as={NextLink} href="#">
            See more &rarr;
          </Link>
        </Text> */}
      </CardHeader>
      <CardBody>
        <Flex direction="column" gap={4}>
          <Flex align="center" gap={4}>
            <Avatar
              name={fullName}
              src={dashboardInfo.data?.user.profileImage}
              getInitials={(name) => {
                const names = name.split(" ");
                return `${names[0].at(0)}${names.at(-1)?.at(0)}`.toUpperCase();
              }}
            />
            <Text as="span">{fullName}</Text>
          </Flex>
          <Flex
            flexWrap={["wrap", null, null, "nowrap"]}
            columnGap={8}
            rowGap={6}
            justify={["space-between", null, "initial"]}
          >
            <ProfileCardItem
              isLoading={isLoading}
              name="Matric. No."
              value={matricNo}
            />
            <ProfileCardItem isLoading={isLoading} name="Level" value={level} />
            <ProfileCardItem
              isLoading={isLoading}
              name="Entry Mode"
              value={entryMode}
            />
            <ProfileCardItem
              isLoading={isLoading}
              name="Programme"
              value={
                <Text as="span" textAlign="center">
                  {programme}
                </Text>
              }
            />
            <ProfileCardItem isLoading={isLoading} name="CGPA" value={cgpa} />
            {/* <ProfileCardItem name="Session" value={session} /> */}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;

type ProfileCardItemProps = {
  name: string;
  value?: ReactNode;
  isLoading: boolean;
};

const ProfileCardItem: FC<ProfileCardItemProps> = ({
  name,
  value,
  isLoading,
}) => {
  return (
    <VStack
      align="initial"
      // maxW={[null, null, "20rem"]}
      _even={{ textAlign: ["right", null, "initial"] }}
      spacing="0.125rem"
    >
      <Text fontSize="xs" fontWeight="semibold">
        {name}
      </Text>
      {isLoading ? (
        <SkeletonText w={28} noOfLines={1} />
      ) : (
        <Text size="sm">{value}</Text>
      )}
    </VStack>
  );
};
