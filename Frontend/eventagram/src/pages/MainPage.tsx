import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import EventList from "../components/EventList";
import type { EventData } from "../types";

export type EventState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; events: EventData[] };

export default function MainPage() {
  const { token } = useAuth();

  const [eventState, setEventState] = useState<EventState>({
    status: "loading",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
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
        setEventState({ status: "success", events: data.events });
      } catch (err) {
        setEventState({
          status: "error",
          message: err instanceof Error ? err.message : "Something went wrong",
        });
      }
    };
    if (token) {
      fetchEvents();
    }
  }, [token]);

  return (
    <div className="main-page">
      <div className="main-container">
        <h1>Discover Events</h1>
        <p>Find something happening. Meet people. Make memories.</p>

        {eventState.status === "loading" && <p>Loading events...</p>}

        {eventState.status === "error" && (
          <p className="error">{eventState.message}</p>
        )}

        {eventState.status === "success" && (
          <EventList events={eventState.events} />
        )}
      </div>
    </div>
  );
}
