import {
  toAttachment,
  toMessage,
  toMinimalMessage,
} from "@/transformers/messages";

export async function listMessages({ limit = 10 }: { limit?: number }) {
  const response = await gapi.client.gmail.users.messages.list({
    userId: "me",
    maxResults: limit,
  });

  if (response.status !== 200) {
    throw new Error("Error fetching messages");
  }

  return response.result.messages?.map(toMinimalMessage);
}

export async function getMessage({ id }: { id: string }) {
  const response = await gapi.client.gmail.users.messages.get({
    userId: "me",
    id,
  });

  if (response.status !== 200) {
    throw new Error(`Error fetching message with id ${id}`);
  }

  return toMessage(response.result);
}

export async function getAttachment(
  minimal: MinimalAttachment,
  messageId: string
) {
  const response = await gapi.client.gmail.users.messages.attachments.get({
    userId: "me",
    messageId: messageId,
    id: minimal.id,
  });

  if (response.status !== 200) {
    throw new Error(
      `Error fetching attachment with id ${minimal.id} for message with id ${messageId}`
    );
  }

  return toAttachment(response.result, minimal);
}
