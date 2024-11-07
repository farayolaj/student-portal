import { useLMSSurveyMutation } from "@/api/common/use-lms-survey-mutation";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ListItem,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function LMSOrientationSurvey({
  defaultIsOpen,
}: {
  defaultIsOpen?: boolean;
}) {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen });
  const cancelRef = useRef();
  const [attendanceOption, setAttendanceOption] = useState<
    AttendanceOptions
  >("on-site");

  const toast = useToast();

  const lmsSurveyMutation = useLMSSurveyMutation({
    onSuccess(data, variables, context) {
      toast({
        title: "Survey submitted successfully",
        description: "Thank you for your response.",
        status: "success",
      });
      onClose();
    },
    onError(error, variables, context) {
      const err = error as Error;
      toast({
        title: "Survey submission failed",
        description: err.message,
        status: "error",
      });
    },
  });

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as any}
      onClose={() => {}}
      isCentered
      closeOnOverlayClick={false}
      scrollBehavior="inside"
    >
      <AlertDialogOverlay>
        <AlertDialogContent overflow={"clip"} maxW={"50%"}>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            textAlign={"center"}
            bg={"purple"}
            color={"white"}
          >
            <Text as="h1">Welcome to FreshStart 2024: LMS Orientation</Text>
            <Text as="span" fontSize={"small"} fontStyle={"italic"}>
              Empower Your Learning Journey Ahead
            </Text>
          </AlertDialogHeader>

          <AlertDialogBody sx={{ "& > p": { mt: 2 } }}>
            <Text>
              Join us to discover the ins and outs of the DLC Mobile Class
              Learning Management System (LMS).
            </Text>
            <Box bg="purple" color="white" p={4} mt={4} borderRadius="md">
              <Text>Choose your attendance option:</Text>
            </Box>
            <RadioGroup
              onChange={setAttendanceOption as any}
              value={attendanceOption}
              mt={2}
            >
              <VStack align="start" spacing={2}>
                <Radio value="on-site" borderColor="black">
                  <strong>On-site:</strong> PIFA Hall, DLC, Ibadan (Bring Your
                  Own Device: Mobile device & earpiece)
                </Radio>
                <Radio value="online" borderColor="black">
                  <strong>Online:</strong> Watch Live Webinar Link -&gt;,
                  11:00am & 4pm on your faculty day
                </Radio>
                <Radio value="self-paced" borderColor="black">
                  <strong>Not attending live session?</strong> Register for
                  self-paced access and learn at your convenience.
                </Radio>
              </VStack>
            </RadioGroup>
            <Text mt={4}>
              Access is based on attendance option, indicate your attendance
              option now so that we can make adequate preparation. On-site
              registration closes 15th Nov., 2024.
            </Text>
            <Text mt={4}>Don&apos;t miss this opportunity to:</Text>
            <UnorderedList>
              <ListItem>
                Explore UIDLC Mobile Class LMS features: access, navigation
                course blocks and tools.
              </ListItem>
              <ListItem>Interact with Departmental Coordinators.</ListItem>
              <ListItem>
                Explore course catalogs / registration courses.
              </ListItem>
              <ListItem>Meet our support team.</ListItem>
              <ListItem>Connect with peers.</ListItem>
              <ListItem>Get a head start on your learning journey!</ListItem>
            </UnorderedList>
            <Text mt={4}>Secure your spot now!</Text>
            <Box bg="purple" color="white" p={4} mt={4} borderRadius="md">
              <Text>Ensure you choose your attendance option above.</Text>
            </Box>
            <Text mt={4}>For those attending on site (BYOD):</Text>
            <Table variant="simple" mt={2}>
              <Thead>
                <Tr>
                  <Th>Faculty</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Faculty of Social Science</Td>
                  <Td>Mon 18 Nov., 2024</Td>
                </Tr>
                <Tr>
                  <Td>Faculty of Arts and Science</Td>
                  <Td>Tues 19 Nov., 2024</Td>
                </Tr>
                <Tr>
                  <Td>Faculty of Clinical Science & Education</Td>
                  <Td>Wed 20 Nov., 2024</Td>
                </Tr>
              </Tbody>
            </Table>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              mx="auto"
              ref={cancelRef as any}
              onClick={() => {
                lmsSurveyMutation.mutate({ attendance: attendanceOption });
              }}
              isLoading={lmsSurveyMutation.isLoading}
              isDisabled={lmsSurveyMutation.isLoading}
              colorScheme="purple"
              bg="purple"
            >
              Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
