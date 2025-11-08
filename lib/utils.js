// lib/utils.js
export function formatDate(dateString) {
  // format date nicely with Indian time (IST)
  // example: from this 👉 2025-05-20T10:30:00Z to this 👉 May 20, 2025, 4:00 PM IST
  const date = new Date(dateString);
  
  // Format the date and time in Indian timezone (IST)
  return date.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
