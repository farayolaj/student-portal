import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  VStack,
  StackDivider,
  Flex,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Box,
  Heading,
} from "@chakra-ui/react";

export default function ProfileDetails() {
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
          <ProfileDetailsItem name="Full Name" value="John Doe" />
          <ProfileDetailsItem
            name="Email Address"
            value="e0493939@john.doe@ui.edu.ng"
          />
          <ProfileDetailsItem name="Gender" value="Male" />
          <ProfileDetailsItem
            name="Phone Number"
            value="08034583953"
            isEditable
          />
          <ProfileDetailsItem
            name="Alternate Email Address"
            value="john.doe@gmail.com"
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
