import { CalendarDays, MapPin } from "lucide-react";
import type { EventData } from "../types";
import { Link } from "react-router";

interface EventCardProps {
  event: EventData;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link to={`/events/${event.id}`} className="event-card">
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
          {event.location ? <p>{event.location}</p> : <p>No Location</p>}
        </p>
      </div>
    </Link>
  );
}
