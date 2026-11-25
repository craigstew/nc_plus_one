import type { UserEventData } from "../types";

export async function getUserEvents(token: string): Promise<UserEventData[]> {
  const response = await fetch(
    import.meta.env.VITE_API_BACKEND_URL + `/user/me/events`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch your events");
  }

  const data = await response.json();

  return data.events;
}
