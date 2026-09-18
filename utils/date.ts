import type { Timestamp } from "firebase/firestore";

export function formatDateTime(timestamp: Timestamp): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp.toDate());
}
