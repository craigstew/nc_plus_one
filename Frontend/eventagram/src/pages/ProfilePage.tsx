import { UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import type { UserEventData } from "../types";
import UserEventList from "../components/UserEventList";

export type EventState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; events: UserEventData[] };

export default function ProfilePage() {
  const { user, token } = useAuth();

  const [eventState, setEventState] = useState<EventState>({
    status: "loading",
  });

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_BACKEND_URL + "/user/me/events",
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
        setEventState({ status: "success", events: data.events });
      } catch (err) {
        setEventState({
          status: "error",
          message: err instanceof Error ? err.message : "Something went wrong",
        });
      }
    };
    if (token) {
      fetchUserEvents();
    }
  }, [token]);

  const events = eventState.status === "success" ? eventState.events : [];

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-info">
          <div className="profile-picture">
            <UserRound size={65} strokeWidth={1.5} />
          </div>

          <h1>{user?.name}</h1>

          <p>{events.length} events upcoming</p>
        </div>

        <div className="upcoming-events">
          <h2>My Registered Events</h2>

          {eventState.status === "loading" && <p>Loading your events...</p>}

          {eventState.status === "error" && (
            <p className="error">{eventState.message}</p>
          )}

          {eventState.status === "success" && (
            <UserEventList events={eventState.events} />
          )}
        </div>
      </div>
    </div>
  );
}
