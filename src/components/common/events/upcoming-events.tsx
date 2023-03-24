import { DATE_ONLY_FORMAT } from "@/constants/date";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import format from "date-fns/format";
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
        Array.from(eventMap.entries()).map(([date, events]) => (
          <Box key={date}>
            <Heading as="h3" size="sm">
              {format(
                parse(date, DATE_ONLY_FORMAT, new Date()),
                "EEEE, MMMM do, yyyy"
              )}
            </Heading>
            <EventList events={events} />
          </Box>
        ))
      )}
    </VStack>
  );
}
