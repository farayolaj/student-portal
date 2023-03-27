import { useEvents } from "@/api/event/use-events";
import EventList from "@/components/common/events/event-list";
import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";
import { DATE_ONLY_FORMAT } from "@/constants/date";
import { Flex, Spinner } from "@chakra-ui/react";
import compareAsc from "date-fns/compareAsc";
import parse from "date-fns/parse";

export default function Events() {
  const eventsRes = useEvents();
  const events = Array.from(eventsRes.data?.entries() ?? [])
    .map(
      ([date, events]) =>
        [parse(date, DATE_ONLY_FORMAT, new Date()), events] as const
    )
    .sort(([dateA], [dateB]) => compareAsc(dateA, dateB))
    .flatMap(([_date, events]) => events);

  if (eventsRes.isInitialLoading)
    return (
      <Flex w="full" py={20} justify="center" align="center">
        <Spinner size="xl" color="black" />
      </Flex>
    );

  return (
    <>
      <Seo title="Events" />
      <PageTitle showBackButton>All Events</PageTitle>
      <EventList events={events} variant="expanded" />
    </>
  );
}
