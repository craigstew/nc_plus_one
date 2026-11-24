import UserEventCard from "./UserEventCard";
import type { UserEventData } from "../types";

interface UserEventListProps {
  events: UserEventData[];
}

export default function UserEventList({ events }: UserEventListProps) {
  if (events.length === 0) {
    return <p>You haven't registered for any events yet.</p>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <UserEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
