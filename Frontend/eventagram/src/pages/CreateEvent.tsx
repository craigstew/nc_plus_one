import { useState } from "react";
import { useNavigate } from "react-router";
import { CalendarDays } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import type { CreateEventData } from "../types";

type CreateEventState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success" };

export default function CreateEvent() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [venueId, setVenueId] = useState("");

  const [createEventState, setCreateEventState] = useState<CreateEventState>({
    status: "idle",
  });

  async function handleCreateEvent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateEventState({ status: "loading" });

    try {
      const eventData: CreateEventData = {
        title,
        description,
        starts_at: new Date(startsAt).toISOString(),
        ends_at: new Date(endsAt).toISOString(),
        venue_id: Number(venueId),
      };

      const response = await fetch(
        import.meta.env.VITE_API_BACKEND_URL + "/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "Failed to create event.");
      }

      setCreateEventState({ status: "success" });
      navigate(`/events/${data.event.id}`);
    } catch (err) {
      setCreateEventState({
        status: "error",
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  }

  if (createEventState.status === "success") {
    return <p>Event created successfully!</p>;
  }

  return (
    <div className="create-event-page">
      <div className="create-event-container">
        <div className="create-event-heading">
          <CalendarDays size={28} />

          <h1>Create an Event</h1>

          <p>Share something exciting with your community.</p>
        </div>

        <form onSubmit={handleCreateEvent}>
          <div className="form-group">
            <label htmlFor="title">Event Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Tell people what your event is about..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startsAt">Start Date and Time</label>
            <input
              id="startsAt"
              type="datetime-local"
              value={startsAt}
              onChange={(e) => setStartsAt(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endsAt">End Date and Time</label>
            <input
              id="endsAt"
              type="datetime-local"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="venueId">Venue ID</label>
            <input
              id="venueId"
              type="number"
              min="1"
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
              required
            />
          </div>

          {createEventState.status === "error" && (
            <p className="error">{createEventState.message}</p>
          )}

          <button
            type="submit"
            disabled={createEventState.status === "loading"}
          >
            {createEventState.status === "loading"
              ? "Creating Event..."
              : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}
