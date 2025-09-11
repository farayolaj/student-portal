import { dashboardQueries } from "@/api/dashboard.queries";
import { tourQueries } from "@/api/tour.queries";
import { webinarQueries } from "@/api/webinar.queries";
import { COURSE_DETAIL, DASHBOARD, WEBINAR_DETAIL } from "@/constants/routes";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { Step } from "react-joyride";
import { completeTour, playTour, setTour } from "./tour/actions";
import { useTourDispatch, useTourState } from "./tour/hooks";

const TOUR_KEY = "new-feature-tour";

export default function NewFeatureTour() {
  const [isTourSet, setIsTourSet] = useState(false);
  const tourDispatch = useTourDispatch();
  const tourState = useTourState();

  const { data: enrolledCourses } = useQuery({
    ...dashboardQueries.dashboardInfo(),
    select: (data) => data.courses,
  });
  const { data: tourSettings } = useQuery(tourQueries.tourSettings());
  const courseId = tourSettings?.courseId;
  const sessionId = tourSettings?.sessionId;
  const { data: webinarId } = useQuery({
    ...webinarQueries.listBy(sessionId!, courseId!),
    enabled: !!sessionId && !!courseId,
    select: (data) =>
      data.find((webinar) =>
        ["started", "pending-start"].includes(webinar.status)
      )?.id,
  });
  const isEnrolledInTourCourse =
    enrolledCourses?.some((c) => c.id === courseId) ?? false;

  useEffect(() => {
    if (!isTourSet && courseId && webinarId) {
      const steps = getTourSteps(courseId, webinarId);
      tourDispatch(setTour(TOUR_KEY, steps));
      setIsTourSet(true);
    }
  }, [courseId, isTourSet, tourDispatch, webinarId]);

  const startTour = useCallback(() => {
    tourDispatch(playTour());
  }, [tourDispatch]);

  const skipTour = useCallback(() => {
    tourDispatch(completeTour());
  }, [tourDispatch]);

  if (
    tourState.isCompleted ||
    tourState.tour?.key !== TOUR_KEY ||
    !isEnrolledInTourCourse
  )
    return null;

  return (
    <Card mt={8}>
      <CardHeader>
        <Heading as="h2" fontSize="md">
          New Feature Tour
        </Heading>
      </CardHeader>
      <CardBody>
        <p>We have added some new features to enhance your experience!</p>
        <p>Would you like to take a quick tour?</p>
        <Flex gap={8} mt={4}>
          <Button variant="outline" onClick={skipTour}>
            Skip
          </Button>
          <Button onClick={startTour}>Start Tour</Button>
        </Flex>
      </CardBody>
    </Card>
  );
}

function getTourSteps(courseId: string, webinarId: string): Step[] {
  const coursePage = COURSE_DETAIL.replace("[courseId]", courseId);
  const webinarsTab = `${coursePage}?tab=webinars`;
  const webinarPage = WEBINAR_DETAIL.replace("[courseId]", courseId).replace(
    "[webinarId]",
    webinarId
  );

  return [
    {
      title: "Course Webinars",
      content:
        "You now have the ability to view and join webinars from your portal.",
      target: "body",
      placement: "center",
    },
    {
      title: "Registered Courses",
      content: "You can view all your registered courses here.",
      target: '[data-tour-id="course-list"]',
      placement: "top",
    },
    {
      content: "Click here to access the course page.",
      target: `[data-tour-id="course-card-${courseId}"]`,
      data: { nextPage: coursePage },
    },
    {
      title: "Course Page",
      content:
        "This is the course page. You can see all the details about your course here.",
      target: '[data-tour-id="page"]',
      placement: "center",
      data: { prevPage: DASHBOARD },
    },
    {
      title: "Course Guide",
      content: "If available, you can access the course guide here.",
      target: '[data-tour-id="course-guide-link"]',
    },
    {
      content: "Access your webinars from this tab.",
      target: '[data-tour-id="webinars-tab-btn"]',
      data: { nextPage: webinarsTab },
    },
    {
      title: "Webinars",
      content:
        "This is the webinars tab where you can see all webinars for this course.",
      target: '[data-tour-id="webinars-tab-panel"]',
      data: { prevPage: coursePage },
    },
    {
      content: `Each webinar card shows the title and scheduled date and time for the webinar. \
      It also shows the status of the webinar; whether it is upcoming, started or ended.`,
      target: `[data-tour-id="webinar-${webinarId}-card"]`,
    },
    {
      title: "Join Webinar/Playback",
      content: `You can click this button to join the webinar. \
      The button will be disabled until the webinar is scheduled to start. \
      After the webinar has ended, you can use this button to watch the webinar playback. \
      You will receive a notification when the webinar is available for playback.`,
      target: `[data-tour-id="webinar-${webinarId}-action"]`,
    },
    {
      content: "Click here to access the webinar page.",
      target: `[data-tour-id="webinar-room-${webinarId}-btn"]`,
      data: { nextPage: webinarPage },
    },
    {
      title: "Webinar Page",
      content: `This is the webinar page where you can see all the details about the webinar. \
        You can also access webinar comments and resources here.`,
      target: '[data-tour-id="page"]',
      placement: "center",
      data: { prevPage: webinarsTab },
    },
    {
      title: "Presentation File",
      content:
        "You can access the presentation file for the webinar here if it is available.",
      target: '[data-tour-id="webinar-presentation-btn"]',
    },
    {
      title: "Join Webinar/Playback",
      content: `You can join the webinar by clicking this button as well. \
      Like the join button in the webinar list, it will be disabled until the webinar is scheduled to start. \
      It will also be replaced with a playback button after the webinar has ended.`,
      target: `[data-tour-id="webinar-join-btn"]`,
    },
    {
      title: "Post Comments",
      content:
        "You can post comments about the webinar here if it is enabled by the instructor.",
      target: '[data-tour-id="webinar-comment-form"]',
    },
    {
      content: `By default, when you post a comment, no notification will be sent. \
      However, you can choose to notify everyone by toggling this switch.`,
      target: '[data-tour-id="webinar-comment-notify-all-switch"]',
    },
    {
      content: "Comments on this webinar will be shown here.",
      target: '[data-tour-id="webinar-comments-list"]',
    },
    {
      content: "You can sort comments by newest or oldest.",
      target: '[data-tour-id="webinar-comments-sort-btn"]',
    },
    {
      title: "Notifications",
      content:
        "You will now receive notifications about important events like upcoming webinars. \
        Click here to view your notifications and stay updated.",
      target: '[data-tour-id="notifications-menu"]',
    },
    {
      title: "The End",
      content: "This concludes the tour of the new features.",
      target: "body",
      placement: "center",
      hideCloseButton: true,
    },
  ] satisfies Step[];
}
