import { Flex, Spinner } from "@chakra-ui/react";
import Calendar from "../calendar";
import { useEvents } from "@/api/event/use-events";
import Events from "./events";

export default function EventCalendar() {
  const { data: events, isInitialLoading } = useEvents();

  if (isInitialLoading)
    return (
      <Flex w="full" py={10} justify="center" align="center">
        <Spinner size="xl" color="black" />
      </Flex>
    );

  return (
    <>
      <Calendar eventDates={[...(events?.keys() || [])]} />
      <Events eventMap={events} />
    </>
  );
}
