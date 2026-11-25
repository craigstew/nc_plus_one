import type { RSVPState } from "../hooks/useRSVP";

interface RSVPButtonProps {
  rsvpState: RSVPState;
  handleRSVP: () => Promise<void>;
}

export default function RSVPButton({ rsvpState, handleRSVP }: RSVPButtonProps) {
  return (
    <button
      className="rsvp-button"
      onClick={handleRSVP}
      disabled={rsvpState.status === "loading"}
    >
      {rsvpState.status === "loading" ? "Registering..." : "RSVP"}
    </button>
  );
}
