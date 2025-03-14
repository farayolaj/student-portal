import { Flex, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { eventQueries } from "../../../api/event.queries";
import Calendar from "../calendar";
import Events from "./events";

export default function EventCalendar() {
  const { data: events, isLoading } = useQuery(eventQueries.list());

  if (isLoading)
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
