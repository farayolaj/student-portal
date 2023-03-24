import { DATE_ONLY_FORMAT } from "@/constants/date";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import format from "date-fns/format";
import EventList from "./event-list";
import UpcomingEvents from "./upcoming-events";

type EventsProps = {
  eventMap?: Map<string, CalendarEvent[]>;
};

export default function Events({ eventMap }: EventsProps) {
  const formattedTodaysDate = format(new Date(), DATE_ONLY_FORMAT);

  return (
    <Tabs mt={8} variant="solid-rounded" colorScheme="primary">
      <TabList w="full" justifyContent="space-around">
        <Tab fontSize="sm">Upcoming Events</Tab>
        <Tab fontSize="sm">Today&apos;s Events</Tab>
      </TabList>
      <TabPanels mt={4}>
        <TabPanel p={0}>
          <UpcomingEvents eventMap={eventMap} />
        </TabPanel>
        <TabPanel p={0}>
          <EventList events={eventMap?.get(formattedTodaysDate) || []} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
