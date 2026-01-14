export const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffSeconds = Math.floor((date - now) / 1000);
  const absSeconds = Math.abs(diffSeconds);

  const isFuture = diffSeconds > 0;

  if (absSeconds < 60) {
    return isFuture ? "In a moment" : "Just now";
  }

  const minutes = Math.floor(absSeconds / 60);
  if (minutes < 60) {
    return isFuture
      ? `In ${minutes} min`
      : `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return isFuture
      ? `In ${hours} hr`
      : `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return isFuture ? "Tomorrow" : "Yesterday";
  }

  if (days < 7) {
    return isFuture
      ? `In ${days} days`
      : `${days} days ago`;
  }

  const optionsSameYear = { month: "short", day: "numeric" };
  const optionsDiffYear = { month: "short", day: "numeric", year: "numeric" };

  return date.getFullYear() === now.getFullYear()
    ? date.toLocaleDateString("en-US", optionsSameYear)
    : date.toLocaleDateString("en-US", optionsDiffYear);
};
