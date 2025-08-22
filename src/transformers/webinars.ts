/* eslint-disable @typescript-eslint/no-explicit-any */
export const toWebinar = (webinar: any) =>
  ({
    id: webinar.id,
    title: webinar.title,
    description: webinar.description,
    scheduledFor: new Date(webinar.scheduled_for),
    presentation: webinar.presentation_url
      ? {
          url: webinar.presentation_url,
          name: webinar.presentation_name,
        }
      : undefined,
  } as Webinar);

export const toWebinarWithRecordings = (webinar: any) =>
  ({
    ...toWebinar(webinar),
    recordings: webinar.recordings.map((recording: any) => ({
      id: recording.id,
      url: recording.recording_url,
      duration: recording.duration,
      dateRecorded: new Date(recording.date_recorded),
    })),
  } as WebinarWithRecordings);
