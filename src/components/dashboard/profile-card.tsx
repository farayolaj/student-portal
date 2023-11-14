import { useProfile } from "@/api/user/use-profile";
import { PROFILE } from "@/constants/routes";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  VStack,
  Flex,
  SkeletonText,
  Avatar,
  SimpleGrid,
  GridProps,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, ReactNode } from "react";
import { useDashboardInfo } from "../../api/dashboard/use-dashboard-info";

const ProfileCard: FC = () => {
  const dashboardInfo = useDashboardInfo();
  const { data: profile } = useProfile();
  const isLoading = dashboardInfo.isInitialLoading;
  const matricNo = profile?.academicProfile?.matricNumber;
  const level = dashboardInfo.data?.programme?.level;
  const entryMode = dashboardInfo.data?.programme?.entryMode;
  const programme = dashboardInfo.data?.programme?.programme;
  const cgpa = dashboardInfo.data?.cpga || "N/A";
  const fullName = `${dashboardInfo.data?.user?.firstName} ${
    dashboardInfo.data?.user?.otherNames || ""
  } ${dashboardInfo.data?.user?.lastName}`;
  const session = dashboardInfo.data?.programme.currentSession;
  const examCentre = dashboardInfo.data?.programme.examCentre;

  return (
    <Card>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading as="h2" fontSize="md">
          Profile
        </Heading>
        <Text>
          <Link as={NextLink} href={PROFILE}>
            Check your profile &rarr;
          </Link>
        </Text>
      </CardHeader>
      <CardBody>
        <Flex direction="column" gap={4}>
          <Flex gap={8} wrap={["wrap", null, "nowrap"]} justify="center">
            <Avatar
              rounded="md"
              size="xl"
              name={fullName}
              src={dashboardInfo.data?.user.profileImage}
              getInitials={(name) => {
                const names = name.split(" ").filter(name => Boolean(name));
                const initials = `${names[0].at(0)}${names.at(-1)?.at(0)}`.toUpperCase();
                return initials;
              }}
            />
            <SimpleGrid
              columns={[2, null, 5]}
              columnGap={8}
              rowGap={4}
              w="full"
            >
              <ProfileCardItem
                isLoading={isLoading}
                name="Matric. No."
                value={matricNo}
              />
              <ProfileCardItem
                isLoading={isLoading}
                name="Level"
                value={level}
              />
              <ProfileCardItem
                isLoading={isLoading}
                name="Entry Mode"
                value={entryMode}
              />
              <ProfileCardItem isLoading={isLoading} name="CGPA" value={cgpa} />
              <ProfileCardItem
                isLoading={isLoading}
                name="Session"
                value={session}
              />
              <ProfileCardItem
                isLoading={isLoading}
                name="Examination Centre"
                value={
                  <Text as="span" textAlign="center">
                    {examCentre}
                  </Text>
                }
                gridColumn={["initial", null, "1 / span 2"]}
              />
              <ProfileCardItem
                isLoading={isLoading}
                name="Programme"
                value={
                  <Text as="span" textAlign="center">
                    {programme}
                  </Text>
                }
                gridColumn={["1 / -1", null, "3 / -1"]}
              />
            </SimpleGrid>
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
  gridColumn?: GridProps["gridColumn"];
};

const ProfileCardItem: FC<ProfileCardItemProps> = ({
  name,
  value,
  isLoading,
  gridColumn,
}) => {
  return (
    <VStack
      align="initial"
      _even={{ textAlign: ["right", null, "initial"] }}
      _last={{ textAlign: "left" }}
      spacing="0.125rem"
      gridColumn={gridColumn}
    >
      <Text fontSize="sm" fontWeight="bold">
        {name}
      </Text>
      {isLoading ? <SkeletonText w={28} noOfLines={1} /> : <Text>{value}</Text>}
    </VStack>
  );
};
