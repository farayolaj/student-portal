import { Card, CardBody, CardHeader, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import EventCalendar from "../common/events/event-calendar";

const EventSidebar: FC = () => {
  return (
    <VStack
      display={["none", null, "flex"]}
      as="aside"
      w="25%"
      p={4}
      gap={8}
      position="sticky"
      top="0rem"
      alignSelf="flex-start"
    >
      <Card w="full">
        <CardHeader>
          <Text as="span" fontSize="lg" fontWeight="bold">
            Smart Table
          </Text>
        </CardHeader>
        <CardBody>
          <EventCalendar />
        </CardBody>
      </Card>
    </VStack>
  );
};

export default EventSidebar;
