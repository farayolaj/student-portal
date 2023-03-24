import { DATE_ONLY_FORMAT } from "@/constants/date";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import compareAsc from "date-fns/compareAsc";
import format from "date-fns/format";
import isFuture from "date-fns/isFuture";
import isToday from "date-fns/isToday";
import parse from "date-fns/parse";
import EventList from "./event-list";

type UpcomingEventsProps = {
  eventMap?: Map<string, CalendarEvent[]>;
};

export default function UpcomingEvents({ eventMap }: UpcomingEventsProps) {
  return (
    <VStack align="stretch" spacing={6}>
      {!eventMap || eventMap.size === 0 ? (
        <Text my="4" as="span" color="black" textAlign="center">
          You have no upcoming event.
        </Text>
      ) : (
        Array.from(eventMap.entries())
          .map(
            ([date, events]) =>
              [parse(date, DATE_ONLY_FORMAT, new Date()), events] as const
          )
          .filter(([date]) => isToday(date) || isFuture(date))
          .sort(([dateA], [dateB]) => compareAsc(dateA, dateB))
          .map(([date, events]) => (
            <Box key={date.getTime()}>
              <Heading as="h3" size="sm">
                {format(date, "EEEE, MMMM do, yyyy")}
              </Heading>
              <EventList events={events} />
            </Box>
          ))
      )}
    </VStack>
  );
}
