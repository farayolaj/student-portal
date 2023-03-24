import { Flex, Badge, Text, StackDivider, VStack } from "@chakra-ui/react";

type EventListProps = {
  events: CalendarEvent[];
};

export default function EventList({ events }: EventListProps) {
  return (
    <VStack
      w="full"
      mt={2}
      p={[4, null, 0]}
      divider={<StackDivider />}
      spacing={2}
    >
      {events.length > 0 ? (
        events.map((event) => <EventListItem key={event.id} event={event} />)
      ) : (
        <Text my={4}>You have no event today.</Text>
      )}
    </VStack>
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
      <Text as="span">{event.name}</Text>
      <Badge w="fit-content" colorScheme="primary">
        {event.startTime}{" "}
        {event.startTime && event.endTime ? `- ${event.endTime}` : ""}
      </Badge>
      <Text as="span" fontSize="xs" fontWeight="bold">
        <>
          {eventLocation} {event.batch && `(${event.batch})`}
        </>
      </Text>
    </Flex>
  );
}
