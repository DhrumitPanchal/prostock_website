export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const optionsDate = { day: "numeric", month: "long", year: "numeric" };
  const optionsTime = { hour: "numeric", minute: "numeric", hour12: true };

  if (isToday) {
    return `Today, ${date.toLocaleTimeString("en-US", optionsTime)}`;
  } else {
    return `${date.toLocaleDateString(
      "en-US",
      optionsDate
    )}, ${date.toLocaleTimeString("en-US", optionsTime)}`;
  }
}
