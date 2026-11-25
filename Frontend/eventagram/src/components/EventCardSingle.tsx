import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import type { EventDataSingle } from "../types";
import { useRSVP } from "../hooks/useRSVP";
import RSVPButton from "./RSVPButton";
import WithdrawButton from "./WithdrawButton";

interface EventCardSingleProps {
  event: EventDataSingle;
}

export default function EventCardSingle({ event }: EventCardSingleProps) {
  const { rsvpState, isRegistered, isChecking, handleRSVP, handleWithdraw } =
    useRSVP(event.id);

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

          {event.address ? <p>{event.address}</p> : <p>No Current Address</p>}

          <p>
            <Users size={18} />
            Capacity: {event.capacity}
          </p>
        </div>

        <div className="event-rsvp">
          {isChecking ? (
            <p>Checking RSVP status...</p>
          ) : isRegistered ? (
            <WithdrawButton
              rsvpState={rsvpState}
              handleWithdraw={handleWithdraw}
            />
          ) : (
            <RSVPButton rsvpState={rsvpState} handleRSVP={handleRSVP} />
          )}
        </div>
      </div>
    </div>
  );
}
