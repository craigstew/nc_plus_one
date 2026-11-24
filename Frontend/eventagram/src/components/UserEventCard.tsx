import { CalendarDays } from "lucide-react";
import type { UserEventData } from "../types";
import { Link } from "react-router";

interface UserEventCardProps {
  event: UserEventData;
}

export default function UserEventCard({ event }: UserEventCardProps) {
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
      </div>
    </Link>
  );
}
