import { DATE_ONLY_FORMAT } from "@/constants/date";
import parse from "date-fns/parse";
import format from "date-fns/format";

export function toCalendarEvent(event: any) {
  const [startTime, endTime] =
    (event.event_extra?.start_time || event.events.start_time)?.split("-") ||
    [];
  return {
    id: event.events.main_event_id,
    name: event.course_title,
    startTime,
    endTime,
    date: parse(event.events.event_date, "yyyy-MM-dd", new Date()),
    batch: event.event_extra?.batch_type,
    category: event.events.event_category,
    centre: event.exam_center,
    location: event.event_extra?.location || event.events.location,
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
