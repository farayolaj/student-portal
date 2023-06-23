import { toCalendarEvent, toEventDateMapping } from "@/transformers/events";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useEvents = createQuery(
  "events",
  async () => {
    const response = await getApi().get("/student_events");

    if (!response.data.status) throw new Error(response.data.message);

    return toEventDateMapping(
      (response.data.payload?.map(toCalendarEvent) as CalendarEvent[]) || []
    );
  },
  {
    staleTime: 1000 * 60 * 60 * 24,
  }
);
