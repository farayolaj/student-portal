export const getWebinarTimingInfo = (scheduledFor: Date) => {
  const now = new Date();
  const webinarTime = new Date(scheduledFor);

  const canJoin = now >= webinarTime;
  const tooltipMessage = canJoin
    ? ""
    : `Webinar will start on ${formatDate(webinarTime)}`;

  return {
    canJoin,
    tooltipMessage,
  };
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
};
