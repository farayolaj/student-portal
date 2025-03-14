import { useProfile } from "@/api/user/use-profile";
import transparentAbstractImage from "@/images/transparent_abstract.png";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  chakra,
  ListItem,
  Radio,
  RadioGroup,
  Text,
  UnorderedList,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import isBefore from "date-fns/isBefore";
import parse from "date-fns/parse";
import { useState } from "react";
import { submitLMSSurvey } from "../../api/common.mutations";

export default function LMSOrientationSurvey({
  isFresher,
  orientationAttendance,
  orientationAttendanceDate,
  orientationSeatNo,
}: {
  isFresher: boolean;
  orientationAttendance: AttendanceOptions | null;
  orientationAttendanceDate: string;
  orientationSeatNo?: string;
}) {
  const dateString = orientationAttendanceDate || "";
  const parsedDate = parse(dateString, "EEE dd MMM., yyyy", new Date());
  /**
   * Survey status:
   * - not-applicable: User is not a fresher
   * - passed: Orientation occurred already
   * - pending: User is a fresher and has not filled survey
   * - filled: User is a fresher and has filled survey
   */
  const surveyStatus = !isFresher
    ? "not-applicable"
    : isBefore(parsedDate, new Date())
      ? "passed"
      : !!orientationAttendance
        ? "filled"
        : "pending";

  const [attendanceOption, setAttendanceOption] =
    useState<AttendanceOptions>("on-site");

  const toast = useToast();

  const queryClient = useQueryClient();
  const lmsSurveyMutation = useMutation({
    mutationFn: submitLMSSurvey,
    onSuccess() {
      queryClient.refetchQueries(useProfile.getKey());
      toast({
        title: "Survey submitted successfully",
        description: "Thank you for your response.",
        status: "success",
      });
    },
    onError(error) {
      const err = error as Error;
      toast({
        title: "Survey submission failed",
        description: err.message,
        status: "error",
      });
    },
  });

  if (surveyStatus === "not-applicable" || surveyStatus === "passed")
    return null;

  return (
    <Card overflow={"hidden"}>
      <CardHeader
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
      </CardHeader>

      <CardBody sx={{ "& > p": { mt: 2 } }}>
        {surveyStatus === "pending" && (
          <>
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
              option now so that we can make adequate preparation.
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
          </>
        )}
        {surveyStatus === "filled" && (
          <>
            <Text>
              You have chosen your preferred attendance option. Here are your
              chosen details:
            </Text>
            <Box bg="purple" color="white" p={4} mt={4} borderRadius="md">
              <Text mt={2}>
                {attendanceOption === "on-site" && (
                  <>
                    <strong>On-site:</strong> PIFA Hall, DLC, Ibadan (Bring Your
                    Own Device: Mobile device & earpiece) - {dateString}
                    <br />
                    <strong>Seat Number:</strong> {orientationSeatNo}
                  </>
                )}
                {attendanceOption === "online" && (
                  <>
                    <strong>Online:</strong> Watch Live Webinar Link -&gt;,
                    11:00am & 4pm on {dateString}
                  </>
                )}
                {attendanceOption === "self-paced" && (
                  <>
                    <strong>Self-paced:</strong> You have registered for
                    self-paced access and can learn at your convenience.
                  </>
                )}
              </Text>
            </Box>
          </>
        )}

        <Box>
          {surveyStatus === "pending" && (
            <Button
              mx="auto"
              onClick={() => {
                lmsSurveyMutation.mutate({ attendance: attendanceOption });
              }}
              isLoading={lmsSurveyMutation.isPending}
              isDisabled={lmsSurveyMutation.isPending}
              colorScheme="purple"
              bg="purple"
            >
              Submit
            </Button>
          )}
        </Box>
      </CardBody>
    </Card>
  );
}
