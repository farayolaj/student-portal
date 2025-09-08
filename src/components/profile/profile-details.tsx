import { dashboardQueries } from "@/api/dashboard.queries";
import { useSchoolPeriod } from "@/api/user/use-current-period";
import { useProfile } from "@/api/user/use-profile";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  SkeletonText,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import EditProfileModal from "./edit-profile-modal";

export default function ProfileDetails() {
  const profileRes = useProfile();
  const schoolPeriod = useSchoolPeriod();
  const user = profileRes?.data?.user;
  const academicProfile = profileRes?.data?.academicProfile;
  const fullName = `${user?.lastName.toUpperCase()}, ${user?.firstName} ${
    user?.otherNames || ""
  }`.replace("undefined", "");
  const { data: currentSession, isLoading: currentSessionIsLoading } = useQuery(
    {
      ...dashboardQueries.dashboardInfo(),
      select: (data) => data?.programme.currentSession,
    }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack spacing={8}>
        <Box w="full">
          <Heading
            size="sm"
            textTransform="uppercase"
            color="gray.500"
            fontWeight="extrabold"
            fontSize="sm"
          >
            Personal Details
          </Heading>
          <VStack
            mt={4}
            divider={<StackDivider />}
            align="flex-start"
            spacing="1rem"
            gridRow="1 / -1"
            gridColumn="2"
          >
            <ProfileDetailsItem
              isLoading={profileRes.isLoading}
              name="Full Name"
              value={fullName}
            />
            <ProfileDetailsItem
              isLoading={profileRes.isLoading}
              name="Email Address"
              value={user?.email}
            />
            <ProfileDetailsItem
              isLoading={profileRes.isLoading}
              name="Phone Number"
              value={user?.phone}
              onEdit={onOpen}
              isEditable
            />
            <ProfileDetailsItem
              isLoading={profileRes.isLoading}
              name="Alternate Email Address"
              value={user?.alternativeEmail || ""}
              onEdit={onOpen}
              isEditable
            />
          </VStack>
        </Box>
        <Box w="full">
          <Heading
            size="sm"
            textTransform="uppercase"
            color="gray.500"
            fontWeight="extrabold"
            fontSize="sm"
          >
            Academic Details
          </Heading>
          <VStack
            mt={4}
            divider={<StackDivider />}
            align="flex-start"
            spacing="1rem"
            gridRow="1 / -1"
            gridColumn="2"
          >
            <ProfileDetailsItem
              isLoading={profileRes.isLoading}
              name="Matric. Number"
              value={academicProfile?.matricNumber}
            />
            <ProfileDetailsItem
              isLoading={profileRes.isLoading}
              name="Level"
              value={academicProfile?.level}
            />
            <ProfileDetailsItem
              isLoading={profileRes.isLoading}
              name="Entry Mode"
              value={academicProfile?.entryMode}
            />
            <ProfileDetailsItem
              isLoading={profileRes.isLoading}
              name="Programme"
              value={academicProfile?.programme}
            />
            <ProfileDetailsItem
              isLoading={profileRes.isLoading}
              name="Department"
              value={academicProfile?.department}
            />
            <ProfileDetailsItem
              isLoading={profileRes.isLoading}
              name="Faculty"
              value={academicProfile?.faculty}
            />
            <ProfileDetailsItem
              isLoading={profileRes.isLoading || currentSessionIsLoading}
              name="Current Session"
              value={currentSession}
            />
            <ProfileDetailsItem
              isLoading={profileRes.isLoading || schoolPeriod.isLoading}
              name="School Session"
              value={schoolPeriod.period.session.name}
            />
            <ProfileDetailsItem
              isLoading={profileRes.isLoading}
              name="Semester"
              value={`${schoolPeriod.period.semester.name} Semester`}
            />
          </VStack>
        </Box>
      </VStack>
      {user && (
        <EditProfileModal
          isOpen={isOpen}
          onClose={onClose}
          initialData={{
            alternativeEmail: user.alternativeEmail || "",
            phone: user.phone,
          }}
        />
      )}
    </>
  );
}

type ProfileItemProps = {
  name: string;
  value?: string;
  isLoading?: boolean;
  isEditable?: boolean;
  onEdit?: () => void;
};

function ProfileDetailsItem({
  name,
  value,
  isLoading = false,
  isEditable = false,
  onEdit,
}: ProfileItemProps) {
  return (
    <Flex direction="column" gap={2} px={2} w="full">
      <Text as="span" fontSize="sm" fontWeight="bold">
        {name}
      </Text>
      {isLoading ? (
        <SkeletonText noOfLines={1} />
      ) : (
        <Flex gap={4} w="full">
          <Text minH={5} as="span" fontSize="sm" w="full">
            {value ?? ""}
          </Text>
          {isEditable && (
            <IconButton
              icon={<EditIcon />}
              size="xs"
              aria-label="Edit"
              onClick={onEdit}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
}
