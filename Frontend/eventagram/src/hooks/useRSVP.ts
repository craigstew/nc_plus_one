import { getUserEvents } from "../api/userEvents";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export type RSVPState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; action: "rsvp" | "withdraw" };

export function useRSVP(eventId: number) {
  const { token } = useAuth();

  const [isRegistered, setIsRegistered] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const [rsvpState, setRsvpState] = useState<RSVPState>({
    status: "idle",
  });

  useEffect(() => {
    async function checkRSVP() {
      try {
        const events = await getUserEvents(token!);
        const registered = events.some((userEvent) => userEvent.id === eventId);

        setIsRegistered(registered);
      } catch (err) {
        console.error(err);
      } finally {
        setIsChecking(false);
      }
    }

    if (token) {
      checkRSVP();
    }
  }, [eventId, token]);

  async function handleRSVP() {
    setRsvpState({ status: "loading" });

    try {
      const response = await fetch(
        import.meta.env.VITE_API_BACKEND_URL + `/events/${eventId}/rsvp`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "Failed to create rsvp");
      }

      setIsRegistered(true);
      setRsvpState({ status: "success", action: "rsvp" });
    } catch (err) {
      setRsvpState({
        status: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  async function handleWithdraw() {
    setRsvpState({ status: "loading" });

    try {
      const response = await fetch(
        import.meta.env.VITE_API_BACKEND_URL + `/events/${eventId}/rsvp/me`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(data?.error?.message || "Failed to withdraw RSVP");
      }

      setIsRegistered(false);
      setRsvpState({ status: "success", action: "withdraw" });
    } catch (err) {
      setRsvpState({
        status: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  return {
    rsvpState,
    isRegistered,
    isChecking,
    handleRSVP,
    handleWithdraw,
  };
}
