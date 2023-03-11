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
import { useDashboardInfo } from "../../hooks/dashboard/use-dashboard-info";

const ProfileCard: FC = () => {
  const dashboardInfo = useDashboardInfo();
  const isLoading = dashboardInfo.isInitialLoading;
  const matricNo = dashboardInfo.data?.user?.matricNumber;
  const level = dashboardInfo.data?.programme?.level;
  const entryMode = dashboardInfo.data?.programme?.entryMode;
  const programme = dashboardInfo.data?.programme?.programme;
  const cgpa = dashboardInfo.data?.cpga || "N/A";

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
      maxW={[null, null, "20rem"]}
      _even={{ textAlign: ["right", null, "initial"] }}
    >
      <Text fontSize="sm" fontWeight="semibold">
        {name}
      </Text>
      {isLoading ? <SkeletonText w={28} noOfLines={1} /> : <Text>{value}</Text>}
    </VStack>
  );
};
