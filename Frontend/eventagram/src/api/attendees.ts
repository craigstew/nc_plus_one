export interface Attendee {
  id: number;
  name: string;
  email: string;
}

export async function getEventAttendees(
  eventId: number,
  token: string,
): Promise<Attendee[] | null> {
  const response = await fetch(
    import.meta.env.VITE_API_BACKEND_URL + `/events/${eventId}/attendees`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch event attendees");
  }

  const data = await response.json();

  return data.attendees;
}
