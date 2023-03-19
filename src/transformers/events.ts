import { DATE_ONLY_FORMAT } from "@/constants/date";
import parse from "date-fns/parse";
import format from "date-fns/format";

export function toCalendarEvent(event: any) {
  return {
    name: event.name,
    time: event.time,
    date: parse(event.start_date, "yyyy-MM-dd", new Date()),
  } as CalendarEvent;
}

export function toEventDateMapping(events: CalendarEvent[]) {
  return events.reduce((acc, event) => {
    const date = format(event.date, DATE_ONLY_FORMAT);
    const dateList = acc.get(date);
    if (dateList) {
      dateList.push(event);
    } else {
      acc.set(date, [event]);
    }
    return acc;
  }, new Map<string, CalendarEvent[]>());
}
