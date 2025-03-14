import EventList from "@/components/common/events/event-list";
import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";
import { DATE_ONLY_FORMAT } from "@/constants/date";
import { Flex, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import compareAsc from "date-fns/compareAsc";
import isFuture from "date-fns/isFuture";
import isToday from "date-fns/isToday";
import parse from "date-fns/parse";
import { eventQueries } from "../api/event.queries";

export default function Events() {
  const { data, isLoading } = useQuery(eventQueries.list());
  const events = Array.from(data?.entries() ?? [])
    .map(
      ([date, events]) =>
        [parse(date, DATE_ONLY_FORMAT, new Date()), events] as const
    )
    .filter(([date]) => isToday(date) || isFuture(date))
    .sort(([dateA], [dateB]) => compareAsc(dateA, dateB))
    .flatMap(([_date, events]) => events);

  if (isLoading)
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
