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
import isSameDay from "date-fns/isSameDay";
import format from "date-fns/format";
import { FC, useState } from "react";
import Calendar from "../common/calendar";
import { DATE_ONLY_FORMAT } from "../../constants/date";

const events = new Map<string, { name: string; time: string }[]>();
events.set(format(new Date(2023, 2, 3), DATE_ONLY_FORMAT), [
  { name: "GES 101: Use of English", time: "2:00 PM" },
  { name: "GES 102: Use of English", time: "9:00 PM" },
  { name: "GES 103: Use of English", time: "7:00 PM" },
  { name: "GES 104: Use of English", time: "4:00 PM" },
  { name: "GES 105: Use of English", time: "1:00 PM" },
]);
events.set(format(new Date(2023, 2, 5), DATE_ONLY_FORMAT), [
  { name: "GES 101: Use of English", time: "2:00 PM" },
  { name: "GES 102: Use of English", time: "9:00 PM" },
]);

const EventSidebar: FC = () => {
  const formattedTodaysDate = format(new Date(), DATE_ONLY_FORMAT);
  const [selectedDate, setSelectedDate] = useState(formattedTodaysDate);

  const onDateClick = (date: Date) => {
    setSelectedDate(format(date, DATE_ONLY_FORMAT));
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
      alignSelf="flex-start"
    >
      <Card w="full">
        <CardHeader>
          <Text as="span" fontSize="lg" fontWeight="bold">
            Smart Table
          </Text>
        </CardHeader>
        <CardBody>
          <Calendar eventDates={[...events.keys()]} onDateClick={onDateClick} />
          <Box mt={8}>
            <Text as="span" fontSize="lg" fontWeight="bold">
              {selectedDate === formattedTodaysDate
                ? "Today's Events"
                : `Events on ${selectedDate}`}
            </Text>
            <VStack mt={4} divider={<StackDivider />}>
              {events.has(selectedDate) ? (
                events
                  .get(selectedDate)
                  ?.sort((a, b) =>
                    a.time == b.time ? 0 : a.time > b.time ? 1 : -1
                  )
                  .map(({ name, time }) => (
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
