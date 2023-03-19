import { toEventDateMapping } from "@/transformers/events";
import { createQuery } from "react-query-kit";

export const useEvents = createQuery("events", async () => {
  // const response = await getApi().get("/event");

  // if (!response.data.status) throw new Error(response.data.message);

  // return toEventDateMapping(
  //   (response.data.payload?.map(toCalendarEvent) as CalendarEvent[]) || []
  // );

  return toEventDateMapping([
    { name: "Examination Starts", date: new Date(2023, 2, 20) },
  ]);
});
