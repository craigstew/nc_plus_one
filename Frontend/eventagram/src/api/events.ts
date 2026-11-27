import type { EventData } from "../types";
import type { CreateEventData } from "../types";
import type { EditEventData } from "../types";

export async function getEvents(token: string): Promise<EventData[]> {
  const response = await fetch(
    import.meta.env.VITE_API_BACKEND_URL + "/events",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const data = await response.json();

  return data.events;
}

export async function editEvent(
  eventId: number,
  token: string,
  eventData: EditEventData,
) {
  const response = await fetch(
    import.meta.env.VITE_API_BACKEND_URL + `/events/${eventId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.detail?.message || data?.error?.message || "Failed to update event",
    );
  }

  return data.event;
}
