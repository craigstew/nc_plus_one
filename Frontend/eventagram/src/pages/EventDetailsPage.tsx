import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import EventCardSingle from "../components/EventCardSingle";
import type { EventDataSingle } from "../types";

type EventState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; event: EventDataSingle };

export default function EventDetailsPage() {
  const { id } = useParams();

  const { token } = useAuth();

  const [eventState, setEventState] = useState<EventState>({
    status: "loading",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BACKEND_URL}/events/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }

        const data = await response.json();

        setEventState({
          status: "success",
          event: data.events,
        });
      } catch (err) {
        setEventState({
          status: "error",
          message: err instanceof Error ? err.message : "Something went wrong",
        });
      }
    };

    if (token && id) {
      fetchEvent();
    }
  }, [token, id]);

  if (eventState.status === "loading") {
    return <p>Loading event...</p>;
  }

  if (eventState.status === "error") {
    return <p className="error">{eventState.message}</p>;
  }

  return (
    <div className="event-details-page">
      <div className="event-details-container">
        <EventCardSingle event={eventState.event} />
      </div>
    </div>
  );
}
