import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import type { EventDataSingle } from "../types";

interface EventCardSingleProps {
  event: EventDataSingle;
}

export default function EventCardSingle({ event }: EventCardSingleProps) {
  return (
    <div className="event-card-single">
      <div className="event-card-single-content">
        <h1>{event.title}</h1>
        <p className="event-description">{event.description}</p>
        <div className="event-info">
          <p>
            <CalendarDays size={18} />
            {new Date(event.starts_at).toLocaleDateString("en-GB", {
              dateStyle: "full",
            })}
          </p>

          <p>
            <Clock size={18} />
            {new Date(event.starts_at).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" - "}
            {new Date(event.ends_at).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <p>
            <MapPin size={18} />
            {event.location}
          </p>

          {event.address && <p>{event.address}</p>}

          <p>
            <Users size={18} />
            Capacity: {event.capacity}
          </p>
        </div>
      </div>
    </div>
  );
}
