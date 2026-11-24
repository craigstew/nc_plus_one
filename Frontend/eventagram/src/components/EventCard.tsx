import { CalendarDays, MapPin } from "lucide-react";
import type { EventData } from "../types";

interface EventCardProps {
  event: EventData;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="event-card">
      <div className="event-icon">
        <CalendarDays size={25} />
      </div>

      <div className="event-details">
        <h3>{event.title}</h3>

        <p>
          {new Date(event.starts_at).toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>

        <p className="event-location">
          <MapPin size={14} />
          {event.location}
        </p>
      </div>
    </div>
  );
}
