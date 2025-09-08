// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toNotification(data: any) {
  return {
    id: data.id,
    type: data.type,
    title: data.title,
    message: data.message,
    data: data.data,
    createdAt: new Date(data.created_at),
  } satisfies EventNotification;
}
