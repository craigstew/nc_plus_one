import type { RSVPState } from "../hooks/useRSVP";

interface WithdrawButtonProps {
  rsvpState: RSVPState;
  handleWithdraw: () => Promise<void>;
}

export default function WithdrawButton({
  rsvpState,
  handleWithdraw,
}: WithdrawButtonProps) {
  return (
    <button
      className="withdraw-button"
      onClick={handleWithdraw}
      disabled={rsvpState.status === "loading"}
    >
      {rsvpState.status === "loading" ? "Withdrawing..." : "Withdraw"}
    </button>
  );
}
