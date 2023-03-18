import useAuth from "@/hooks/use-auth";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  VStack,
  StackDivider,
  Flex,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Box,
  Heading,
} from "@chakra-ui/react";

export default function ProfileDetails() {
  const auth = useAuth();
  const user = auth.user as User;
  const fullName = `${user.firstName} ${user.otherNames || ""} ${
    user.lastName
  }`.replace("undefined", "");

  return (
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
          gridRow="1 / -1"
          gridColumn="2"
        >
          <ProfileDetailsItem name="Full Name" value={fullName} />
          <ProfileDetailsItem name="Email Address" value={user.email} />
          <ProfileDetailsItem name="Gender" value={user.gender} />
          <ProfileDetailsItem
            name="Phone Number"
            value={user.phone}
            isEditable
          />
          <ProfileDetailsItem
            name="Alternate Email Address"
            value={user.alternativeEmail || ""}
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
          gridRow="1 / -1"
          gridColumn="2"
        >
          <ProfileDetailsItem name="Matric. Number" value="E083940" />
          <ProfileDetailsItem name="Level" value="100 Level" />
          <ProfileDetailsItem name="Entry Mode" value="UTME" />
          <ProfileDetailsItem
            name="Programme"
            value="Bachelor of Science (Computer Science)"
          />
          <ProfileDetailsItem
            name="Department"
            value="Department of Computer Science"
          />
          <ProfileDetailsItem name="Faculty" value="Faculty of Science" />
          <ProfileDetailsItem name="Session" value="2021/2022" />
          <ProfileDetailsItem name="Semester" value="First Semester" />
        </VStack>
      </Box>
    </VStack>
  );
}

type ProfileItemProps = {
  name: string;
  value: string;
  isEditable?: boolean;
  onSubmit?: (value: string) => void;
};

function ProfileDetailsItem({
  name,
  value,
  isEditable = false,
  onSubmit,
}: ProfileItemProps) {
  return (
    <Flex direction="column" gap={2} px={2} w="full">
      <Text as="span" fontSize="sm" fontWeight="bold">
        {name}
      </Text>
      <Editable
        size="md"
        defaultValue={value}
        isPreviewFocusable={false}
        onSubmit={onSubmit}
      >
        <Flex gap={4} w="full" justify="space-between">
          <Box>
            <EditablePreview />
            <EditableInput />
          </Box>
          {isEditable && <EditableControls />}
        </Flex>
      </Editable>
    </Flex>
  );
}

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="xs" alignItems="center">
      <IconButton
        aria-label="Confirm edit"
        icon={<CheckIcon />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="Cancel edit"
        icon={<CloseIcon />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center" align="center">
      <IconButton
        aria-label="Edit"
        size="xs"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
}
