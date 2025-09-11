export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "full",
    timeStyle: "short",
    hour12: true,
  }).format(date);
};
