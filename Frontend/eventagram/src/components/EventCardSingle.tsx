import { CalendarDays, Clock, MapPin, Users, Pencil } from "lucide-react";
import type { EventDataSingle } from "../types";
import { useRSVP } from "../hooks/useRSVP";
import RSVPButton from "./RSVPButton";
import WithdrawButton from "./WithdrawButton";
import { useAuth } from "../context/AuthContext";
import { getEventAttendees, type Attendee } from "../api/attendees";
import { useEffect, useState } from "react";
import { Link } from "react-router";

interface EventCardSingleProps {
  event: EventDataSingle;
}

export default function EventCardSingle({ event }: EventCardSingleProps) {
  const { rsvpState, isRegistered, isChecking, handleRSVP, handleWithdraw } =
    useRSVP(event.id);

  const { token } = useAuth();
  const [attendees, setAttendees] = useState<Attendee[] | null>(null);

  useEffect(() => {
    async function fetchAttendees() {
      try {
        const data = await getEventAttendees(event.id, token!);
        setAttendees(data);
      } catch (err) {
        console.error(err);
      }
    }

    setAttendees(null);

    if (token) {
      fetchAttendees();
    }
  }, [event.id, token]);

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

        {attendees !== null && (
          <>
            <div className="event-attendees">
              <h2>Event Attendees</h2>

              <p>
                Since you are the organiser of this event, here are the
                attendees so far:
              </p>

              {attendees.length === 0 ? (
                <p>No one has registered for this event yet.</p>
              ) : (
                <p>
                  {attendees.map((attendee, index) => (
                    <span key={attendee.id}>
                      {attendee.name} ({attendee.email})
                      {index < attendees.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              )}
            </div>

            <div className="edit-event-button">
              <Link to={`/events/${event.id}/edit`}>
                <Pencil size={17} />
                <span>Edit Event</span>
              </Link>
            </div>
          </>
        )}

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
