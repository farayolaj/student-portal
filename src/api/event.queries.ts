import { queryOptions } from "@tanstack/react-query";
import { toEventDateMapping, toEvents } from "../transformers/events";
import getApi from "./api";

async function listEvents() {
  const response = await getApi().get("/student_events");

  if (!response.data.status) throw new Error(response.data.message);

  return toEventDateMapping(
    (response.data.payload?.map(toEvents) as CalendarEvent[]) || []
  );
}

export const eventQueries = {
  all: () => ["events"],
  list: () =>
    queryOptions({
      queryKey: [...eventQueries.all(), "list"],
      queryFn: listEvents,
    }),
};
