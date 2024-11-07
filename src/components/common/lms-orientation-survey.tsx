import { useLMSSurveyMutation } from "@/api/common/use-lms-survey-mutation";
import transparentAbstractImage from "@/images/transparent_abstract.png";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  chakra,
  ListItem,
  Radio,
  RadioGroup,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function LMSOrientationSurvey({
  defaultIsOpen,
  dateString,
}: {
  defaultIsOpen?: boolean;
  dateString: string;
}) {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen });
  const cancelRef = useRef();
  const [attendanceOption, setAttendanceOption] =
    useState<AttendanceOptions>("on-site");

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
        <AlertDialogContent overflow={"clip"} maxW={[null, null, "50%"]}>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            textAlign={"center"}
            bgColor={"purple"}
            color={"white"}
            bgImage={`url(${transparentAbstractImage.src})`}
            bgSize={"cover"}
            bgBlendMode={"screen"}
            bgPos={"center"}
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
                <Radio value="on-site" borderColor="black" colorScheme="purple">
                  <strong>On-site:</strong> PIFA Hall, DLC, Ibadan (Bring Your
                  Own Device: Mobile device & earpiece) - {dateString}
                </Radio>
                <Radio value="online" borderColor="black" colorScheme="purple">
                  <strong>Online:</strong> Watch Live Webinar Link -&gt;,
                  11:00am & 4pm on {dateString}
                </Radio>
                <Radio
                  value="self-paced"
                  borderColor="black"
                  colorScheme="purple"
                >
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
            <chakra.details mt={2}>
              <chakra.summary fontWeight={"bold"}>
                What are the opportunities?
              </chakra.summary>
              <UnorderedList mt={2}>
                <ListItem>
                  Explore Mobile Class LMS features: access, navigation course
                  blocks and tools.
                </ListItem>
                <ListItem>
                  Explore course catalogs / registration courses.
                </ListItem>
                <ListItem>Meet our support team.</ListItem>
                <ListItem>Connect with peers.</ListItem>
                <ListItem>Get a head start on your learning journey!</ListItem>
              </UnorderedList>
            </chakra.details>
            <Text mt={4}>Secure your spot now!</Text>
            <Text color="purple.900">
              Ensure you choose your attendance option above.
            </Text>
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
