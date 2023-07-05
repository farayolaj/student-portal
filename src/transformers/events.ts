import { DATE_ONLY_FORMAT } from "@/constants/date";
import parse from "date-fns/parse";
import format from "date-fns/format";

export function toEvents(event: any): CalendarEvent {
  return {
    id: `${event.course.id}-${event.details.date}-${event.details.batch}`,
    course: {
      id: event.course.id,
      title: event.course.title,
      code: event.course.code,
      status: event.course.status,
      semester: parseInt(event.course.semester),
      units: parseInt(event.course.units),
    },
    details: {
      centre: event.details.exam_centre,
      location: event.details.location,
      time: event.details.event_time,
      category: event.details.category,
      sessionId: event.details.sessionId,
      batch: event.details.batch,
      description: event.details.description,
      date: parse(event.details.date, "yyyy-MM-dd", new Date()),
    },
  };
}

export function toEventDateMapping(events: CalendarEvent[]) {
  const eventMapping = events?.reduce((acc, event) => {
    const date = format(event.details.date, DATE_ONLY_FORMAT);
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
      if (!a.details.time) return -1;
      if (!b.details.time) return 1;
      return a.details.time == b.details.time
        ? 0
        : a.details.time > b.details.time
        ? 1
        : -1;
    });
  }

  return eventMapping;
}
