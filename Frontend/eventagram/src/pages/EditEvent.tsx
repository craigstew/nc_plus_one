import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { editEvent } from "../api/events";
import EditEventForm from "../components/EditEventForm";
import type { EventFormData, EditEventData, EventDataSingle } from "../types";

type EventState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success" };

function formatDateTime(date: string): string {
  const parsedDate = new Date(date);

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const hours = String(parsedDate.getHours()).padStart(2, "0");
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function EditEvent() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [eventState, setEventState] = useState<EventState>({
    status: "loading",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    startsAt: "",
    endsAt: "",
    venueId: "",
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_BACKEND_URL + `/events/${id}`,
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
        const event: EventDataSingle = data.events;

        setFormData({
          title: event.title,
          description: event.description,
          startsAt: formatDateTime(event.starts_at),
          endsAt: formatDateTime(event.ends_at),
          venueId: String(event.venue_id),
        });

        setEventState({ status: "success" });
      } catch (err) {
        setEventState({
          status: "error",
          message: err instanceof Error ? err.message : "Something went wrong",
        });
      }
    }

    if (token && id) {
      fetchEvent();
    }
  }, [token, id]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleUpdateEvent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!id || !token) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const startDate = new Date(formData.startsAt);
      const endDate = new Date(formData.endsAt);
      const venueId = Number(formData.venueId);

      if (endDate <= startDate) {
        throw new Error("End time must be after the start time.");
      }

      if (!Number.isInteger(venueId) || venueId < 1) {
        throw new Error("Please enter a valid Venue ID.");
      }

      const eventData: EditEventData = {
        title: formData.title,
        description: formData.description,
        starts_at: startDate.toISOString(),
        ends_at: endDate.toISOString(),
        venue_id: Number(formData.venueId),
      };

      await editEvent(Number(id), token, eventData);

      navigate(`/events/${id}`);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (eventState.status === "loading") {
    return <p>Loading event information...</p>;
  }

  if (eventState.status === "error") {
    return <p className="error">{eventState.message}</p>;
  }

  return (
    <div className="edit-event-page">
      <EditEventForm
        formData={formData}
        handleChange={handleChange}
        handleUpdateEvent={handleUpdateEvent}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  );
}
