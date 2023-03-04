import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import Calendar from "../common/calendar";

const EventSidebar: FC = () => {
  const events = {
    "2023-03-03": [{ name: "GES 101: Use of English", time: "2:00 PM" }],
    "2023-03-06": [{ name: "Classes end", time: "" }],
  } as Record<string, { name: string; time: string }[]>;
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const onDateClick = (date: Date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  return (
    <VStack as="aside" minW="25%" p={4} gap={8} position="sticky" top="0rem">
      <Card w="full" h="full">
        <CardHeader>
          <Text as="span" fontSize="lg" fontWeight="bold">
            Calendar
          </Text>
        </CardHeader>
        <CardBody>
          <Calendar
            eventDates={Object.keys(events)}
            onDateClick={onDateClick}
          />
          <Box mt={8}>
            <Text as="span" fontSize="lg" fontWeight="bold">
              Today&apos;s Events
            </Text>
            <VStack mt={4} divider={<StackDivider />}>
              {events[selectedDate] ? (
                events[selectedDate].map(({ name, time }) => (
                  <Flex justify="space-between" gap={4} w="full" key={name}>
                    <Text>{name}</Text>
                    <Text>{time}</Text>
                  </Flex>
                ))
              ) : (
                <Text>No events today</Text>
              )}
            </VStack>
          </Box>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default EventSidebar;
