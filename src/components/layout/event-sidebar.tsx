import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import Calendar from "../common/calendar";

const EventSidebar: FC = () => {
  const todaysDate = new Date().toISOString().split("T")[0];
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
    <VStack
      display={["none", null, "flex"]}
      as="aside"
      minW="25%"
      p={4}
      gap={8}
      position="sticky"
      top="0rem"
    >
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
              {selectedDate === todaysDate
                ? "Today's Events"
                : `Events on ${selectedDate}`}
            </Text>
            <VStack mt={4} divider={<StackDivider />}>
              {events[selectedDate] ? (
                events[selectedDate].map(({ name, time }) => (
                  <Flex
                    direction="column"
                    justify="space-between"
                    flexWrap={["wrap", null, null, null, "initial"]}
                    gap={2}
                    w="full"
                    key={name}
                  >
                    <Badge w="fit-content" colorScheme="primary">
                      {time}
                    </Badge>
                    <Text>{name}</Text>
                  </Flex>
                ))
              ) : (
                <Text>No events on this day.</Text>
              )}
            </VStack>
          </Box>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default EventSidebar;
