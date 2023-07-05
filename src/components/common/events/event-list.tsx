import isValidUrl from "@/lib/is-valid-url";
import {
  Flex,
  Badge,
  Text,
  StackDivider,
  VStack,
  Link,
} from "@chakra-ui/react";
import format from "date-fns/format";
import { CSSProperties } from "react";

type EventListProps = {
  events: CalendarEvent[];
  variant?: "default" | "expanded";
};

export default function EventList({ events, variant }: EventListProps) {
  return (
    <VStack
      w="full"
      mt={2}
      p={[4, null, 0]}
      divider={<StackDivider />}
      spacing={2}
    >
      {events.length > 0 ? (
        events.map((event) => (
          <EventListItem
            key={event.id}
            event={event}
            size={variant == "expanded" ? "lg" : undefined}
            bg={variant == "expanded" ? "white" : undefined}
            padding={variant == "expanded" ? 2 : undefined}
          />
        ))
      ) : (
        <Text my={4}>You have no upcoming event.</Text>
      )}
    </VStack>
  );
}

type EventListItemProps = {
  event: CalendarEvent;
  size?: "base" | "lg";
  bg?: CSSProperties["color"];
  padding?: CSSProperties["padding"];
};

function EventListItem({
  event,
  size = "base",
  bg,
  padding,
}: EventListItemProps) {
  const isLocationUrl = isValidUrl(event.details.location);

  const eventLocation = isLocationUrl ? (
    <>
      <Link href={event.details.location} target="_blank">
        {event.details.location}
      </Link>{" "}
      - {event.details.centre}
    </>
  ) : (
    [event.details.location, event.details.centre].join(", ")
  );

  const style = {
    base: {
      day: { fontSize: "xl", fontWeight: "bold" },
      month: { fontSize: "xs", fontWeight: "bold" },
    },
    lg: {
      day: { fontSize: "3xl", fontWeight: "bold" },
      month: { fontSize: "md", fontWeight: "bold" },
    },
  };

  return (
    <Flex w="full" align="center" gap={2} rounded="md" bg={bg} p={padding}>
      <Flex
        direction="column"
        rounded="md"
        bg="primary.500"
        justify="center"
        align="center"
        px={3}
        sx={{ aspectRatio: "1 / 1" }}
        color="white"
      >
        <Text as="span" {...style[size].day}>
          {format(event.details.date, "dd")}
        </Text>
        <Text
          as="span"
          {...style[size].month}
          mt="-1.5"
          textTransform="uppercase"
        >
          {format(event.details.date, "MMM")}
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
          {event.course.code && `${event.course.code}:`} {event.course.title}
        </Text>
        <Badge w="fit-content" colorScheme="primary">
          {event.details.time}
        </Badge>
        <Text as="span" fontSize="xs" fontWeight="bold">
          <>
            {eventLocation} {event.details.batch && `(${event.details.batch})`}
          </>
        </Text>
      </Flex>
    </Flex>
  );
}
