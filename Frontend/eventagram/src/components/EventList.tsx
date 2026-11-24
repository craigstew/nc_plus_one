import EventCard from "./EventCard";
import type { EventData } from "../types";

interface EventListProps {
  events: EventData[];
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return <p>There are currently no events available.</p>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
