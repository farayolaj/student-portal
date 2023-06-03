export function toMinimalMessage(
  data: gapi.client.gmail.Message
): MinimalMessage {
  return {
    id: data.id || "",
    from:
      data?.payload?.headers?.find((header) => header.name === "From")?.value ||
      "Unknown Sender",
    subject:
      data?.payload?.headers?.find((header) => header.name === "Subject")
        ?.value || "No Subject",
    date: new Date(parseInt(data?.internalDate || "0")),
    snippet: data.snippet || "",
  };
}

export function toMessage(data: gapi.client.gmail.Message): Message {
  let payload: gapi.client.gmail.MessagePart | undefined = data.payload;
  let attachments: MinimalAttachment[] = [];

  if (data.payload?.mimeType === "multipart/mixed") {
    // There are attachments
    payload = data.payload?.parts?.find(
      (part) => part.mimeType === "multipart/alternative"
    );
    attachments =
      data.payload?.parts
        ?.filter((part) => Boolean(part.body?.attachmentId))
        .map(toMinimalAttachment) || [];
  }

  return {
    id: data.id || "",
    from:
      data?.payload?.headers?.find((header) => header.name === "From")?.value ||
      "Unknown Sender",
    subject:
      data?.payload?.headers?.find((header) => header.name === "Subject")
        ?.value || "No Subject",
    date: new Date(parseInt(data?.internalDate || "0")),
    snippet: data.snippet || "",
    htmlContent: Buffer.from(
      payload?.parts?.find((part) => part.mimeType === "text/html")?.body
        ?.data ||
        data?.payload?.body?.data ||
        "",
      "base64"
    ).toString("utf8"),
    plainContent: Buffer.from(
      payload?.parts?.find((part) => part.mimeType === "text/plain")?.body
        ?.data || "",
      "base64"
    ).toString("utf8"),
    attachments,
  };
}

export function toMinimalAttachment(
  data: gapi.client.gmail.MessagePart
): MinimalAttachment {
  return {
    id: data.body?.attachmentId || "",
    size: data.body?.size || 0,
    filename: data.filename || "",
    mimeType: data.mimeType || "",
  };
}

export function toAttachment(
  data: gapi.client.gmail.MessagePartBody,
  minimal: MinimalAttachment
): Attachment {
  return {
    id: data.attachmentId || "",
    size: data.size || 0,
    filename: minimal.filename,
    mimeType: minimal.mimeType,
    data: data.data ? Buffer.from(data.data, "base64") : null,
  };
}
