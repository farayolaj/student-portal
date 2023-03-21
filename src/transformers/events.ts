import { DATE_ONLY_FORMAT } from "@/constants/date";
import parse from "date-fns/parse";
import format from "date-fns/format";

export function toCalendarEvent(event: any) {
  return {
    name: event.name,
    startTime: event.time,
    date: parse(event.start_date, "yyyy-MM-dd", new Date()),
  } as CalendarEvent;
}

export function toEventDateMapping(events: CalendarEvent[]) {
  const eventMapping = events.reduce((acc, event) => {
    const date = format(event.date, DATE_ONLY_FORMAT);
    const dateList = acc.get(date);
    if (dateList) {
      dateList.push(event);
    } else {
      acc.set(date, [event]);
    }
    return acc;
  }, new Map<string, CalendarEvent[]>());

  for (let dateString of eventMapping.keys()) {
    eventMapping.get(dateString)?.sort((a, b) => {
      if (!a.startTime) return -1;
      if (!b.startTime) return 1;
      return a.startTime == b.startTime
        ? 0
        : a.startTime > b.startTime
        ? 1
        : -1;
    });
  }

  return eventMapping;
}
