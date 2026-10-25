import { format } from "date-fns";

// "Sun, January 26, 2025"
export const formatDate = (date) => format(new Date(date), "eee, MMMM dd, yyyy");

// "10:03 AM"
export const formatTime = (date) => format(new Date(date), "hh:mm a");

// 83000 ms -> "1:23"
export function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
