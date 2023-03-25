import { Flex, Badge, Text, StackDivider, VStack } from "@chakra-ui/react";
import format from "date-fns/format";

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
    <Flex w="full" align="center" gap={2}>
      <Flex
        direction="column"
        rounded="md"
        bg="primary.500"
        justify="center"
        align="center"
        py={2}
        px={3}
        h="fit-content"
        color="white"
      >
        <Text as="span" fontSize="xl" fontWeight="bold">
          {format(event.date, "dd")}
        </Text>
        <Text as="span" fontSize="xs" fontWeight="bold">
          {format(event.date, "MMM").toUpperCase()}
        </Text>
      </Flex>
      <Flex
        direction="column"
        justify="space-between"
        flexWrap={["wrap", null, null, null, "initial"]}
        gap={1}
        w="full"
      >
        <Text as="span">
          {event.code && `${event.code}:`} {event.name}
        </Text>
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
    </Flex>
  );
}
