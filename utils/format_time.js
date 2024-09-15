export default function formatTimestamp(timestampOrIsoString) {
  let date;

  // Check if input is a number (Unix timestamp in seconds) or a string (ISO 8601 date)
  if (typeof timestampOrIsoString === "number") {
    date = new Date(timestampOrIsoString * 1000); // Convert Unix timestamp to milliseconds
  } else if (typeof timestampOrIsoString === "string") {
    date = new Date(timestampOrIsoString); // Parse ISO 8601 date string
  } else {
    throw new Error(
      "Invalid input: expected a Unix timestamp (number) or an ISO 8601 date string (string)"
    );
  }

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysOfWeek[date.getUTCDay()];
  const dayOfMonth = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = String(date.getUTCFullYear()).slice(-2); // Get last two digits of year

  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  return `${day} ${dayOfMonth}-${month}-${year} ${hours}:${minutes}${ampm}`;
}

export function calculateAge(birthDateString) {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
