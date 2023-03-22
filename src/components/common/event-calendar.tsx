import { Flex, Spinner } from "@chakra-ui/react";
import format from "date-fns/format";
import { useState } from "react";
import Calendar from "./calendar";
import { DATE_ONLY_FORMAT } from "../../constants/date";
import { useEvents } from "@/api/event/use-events";
import EventList from "./event-list";

export default function EventCalendar() {
  const formattedTodaysDate = format(new Date(), DATE_ONLY_FORMAT);
  const { data: events, isInitialLoading } = useEvents();
  const [selectedDate, setSelectedDate] = useState(formattedTodaysDate);

  const onDateClick = (date: Date) => {
    setSelectedDate(format(date, DATE_ONLY_FORMAT));
  };

  if (isInitialLoading)
    return (
      <Flex w="full" py={10} justify="center" align="center">
        <Spinner size="xl" color="black" />
      </Flex>
    );

  return events ? (
    <>
      <Calendar eventDates={[...events.keys()]} onDateClick={onDateClick} />
      <EventList
        isToday={selectedDate === formattedTodaysDate}
        date={selectedDate}
        events={events.get(selectedDate) || []}
      />
    </>
  ) : (
    <Calendar eventDates={[]} onDateClick={onDateClick} />
  );
}
