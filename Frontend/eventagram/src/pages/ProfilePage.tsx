import { Plus, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import type { UserEventData } from "../types";
import UserEventList from "../components/UserEventList";
import { Link } from "react-router";
import { getUserEvents } from "../api/userEvents";

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
        const events = await getUserEvents(token!);

        setEventState({
          status: "success",
          events,
        });
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

        <div className="create-event">
          <Link to="/events/create" className="create-event-button">
            <Plus size={18} />
            Create Event
          </Link>
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
