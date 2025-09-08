import isFuture from "date-fns/isFuture";

/* eslint-disable @typescript-eslint/no-explicit-any */
function calculateWebinarStatus(
  startTime: Date | null,
  endTime: Date | null,
  scheduledFor: Date
) {
  if (endTime) return "ended";
  if (startTime) return "started";
  if (isFuture(scheduledFor)) return "upcoming";
  return "pending-start";
}

export const toWebinar = (webinar: any) => {
  const scheduledFor = new Date(webinar.scheduled_for);
  const startTime = webinar.start_time ? new Date(webinar.start_time) : null;
  const endTime = webinar.end_time ? new Date(webinar.end_time) : null;

  return {
    id: webinar.id,
    title: webinar.title,
    description: webinar.description,
    status: calculateWebinarStatus(startTime, endTime, scheduledFor),
    scheduledFor,
    startTime,
    endTime,
    presentation: webinar.presentation_url
      ? {
          url: webinar.presentation_url,
          name: webinar.presentation_name,
        }
      : undefined,
    recordingUrl: webinar.recording_url,
    enableComments: webinar.enable_comments,
  } satisfies Webinar;
};

export const toWebinarComment = (comment: any) =>
  ({
    id: comment.id,
    content: comment.content,
    author: {
      id: comment.author_id,
      name: comment.author_name,
    },
    createdAt: new Date(comment.created_at),
  } as WebinarComment);
