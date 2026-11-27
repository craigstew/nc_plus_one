import { CalendarDays } from "lucide-react";
import type { EventFormData } from "../types";

interface EditEventFormProps {
  formData: EventFormData;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleUpdateEvent: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  submitError: string;
}

export default function EditEventForm({
  formData,
  handleChange,
  handleUpdateEvent,
  isSubmitting,
  submitError,
}: EditEventFormProps) {
  return (
    <div className="create-event-container">
      <div className="create-event-heading">
        <CalendarDays size={28} />

        <h1>Edit Event</h1>

        <p>Update your event information below.</p>
      </div>

      <form onSubmit={handleUpdateEvent}>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startsAt">Start Date and Time</label>
          <input
            id="startsAt"
            name="startsAt"
            type="datetime-local"
            value={formData.startsAt}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endsAt">End Date and Time</label>
          <input
            id="endsAt"
            name="endsAt"
            type="datetime-local"
            value={formData.endsAt}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="venueId">Venue ID</label>
          <input
            id="venueId"
            name="venueId"
            type="number"
            min="1"
            value={formData.venueId}
            onChange={handleChange}
            required
          />
        </div>

        {submitError && <p className="error">{submitError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating Event..." : "Update Event"}
        </button>
      </form>
    </div>
  );
}
