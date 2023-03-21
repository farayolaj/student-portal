import { Flex, Badge, Text, Box, StackDivider, VStack } from "@chakra-ui/react";

type EventListProps = {
  isToday: boolean;
  date: string;
  events: CalendarEvent[];
};

export default function EventList({ date, events, isToday }: EventListProps) {
  return (
    <Box mt={8} p={[4, null, 0]}>
      <Text as="span" fontSize="lg" fontWeight="bold">
        {isToday ? "Today's Events" : `Events on ${date}`}
      </Text>
      <VStack mt={4} divider={<StackDivider />}>
        {events.length > 0 ? (
          events
            .sort((a, b) => {
              if (!a.startTime) return -1;
              if (!b.startTime) return 1;
              return a.startTime == b.startTime
                ? 0
                : a.startTime > b.startTime
                ? 1
                : -1;
            })
            .map((event) => <EventListItem key={event.id} event={event} />)
        ) : (
          <Text>No events on this day.</Text>
        )}
      </VStack>
    </Box>
  );
}

type EventListItemProps = {
  event: CalendarEvent;
};

function EventListItem({ event }: EventListItemProps) {
  const eventLocation = [event.location, event.centre]
    .filter(Boolean)
    .join(", ");

  return (
    <Flex
      direction="column"
      justify="space-between"
      flexWrap={["wrap", null, null, null, "initial"]}
      gap={1}
      w="full"
    >
      <Badge w="fit-content" colorScheme="primary">
        {event.startTime}{" "}
        {event.startTime && event.endTime ? `- ${event.endTime}` : ""}
      </Badge>
      <Text as="span">{event.name}</Text>
      <Text as="span" fontSize="xs" fontWeight="bold">
        <>
          {eventLocation} {event.batch && `(${event.batch})`}
        </>
      </Text>
    </Flex>
  );
}
