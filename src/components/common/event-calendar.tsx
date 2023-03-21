import {
  Box,
  VStack,
  StackDivider,
  Flex,
  Badge,
  Text,
  Spinner,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { useState } from "react";
import Calendar from "./calendar";
import { DATE_ONLY_FORMAT } from "../../constants/date";
import { useEvents } from "@/api/event/use-events";

export default function EventCalendar() {
  const formattedTodaysDate = format(new Date(), DATE_ONLY_FORMAT);
  const { data: events } = useEvents();
  const [selectedDate, setSelectedDate] = useState(formattedTodaysDate);

  const onDateClick = (date: Date) => {
    setSelectedDate(format(date, DATE_ONLY_FORMAT));
  };

  return events ? (
    <>
      <Calendar eventDates={[...events.keys()]} onDateClick={onDateClick} />
      <Box mt={8} p={[4, null, 0]}>
        <Text as="span" fontSize="lg" fontWeight="bold">
          {selectedDate === formattedTodaysDate
            ? "Today's Events"
            : `Events on ${selectedDate}`}
        </Text>
        <VStack mt={4} divider={<StackDivider />}>
          {events.has(selectedDate) ? (
            events
              .get(selectedDate)
              ?.sort((a, b) => {
                if (!a.startTime) return -1;
                if (!b.startTime) return 1;
                return a.startTime == b.startTime
                  ? 0
                  : a.startTime > b.startTime
                  ? 1
                  : -1;
              })
              .map(({ id, name, startTime, endTime, batch, location }) => (
                <Flex
                  direction="column"
                  justify="space-between"
                  flexWrap={["wrap", null, null, null, "initial"]}
                  gap={1}
                  w="full"
                  key={id}
                >
                  <Badge w="fit-content" colorScheme="primary">
                    {startTime} {startTime && endTime ? `- ${endTime}` : ""}
                  </Badge>
                  <Text as="span">{name}</Text>
                  <Text as="span" fontSize="xs" fontWeight="bold">
                    {location} {batch && `(${batch})`}
                  </Text>
                </Flex>
              ))
          ) : (
            <Text>No events on this day.</Text>
          )}
        </VStack>
      </Box>
    </>
  ) : (
    <Flex w="full" h="full" justify="center" align="center">
      <Spinner size="xs" color="white" />
    </Flex>
  );
}
