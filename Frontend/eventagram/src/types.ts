export interface UserEventData {
  id: number;
  title: string;
  starts_at: string;
  rsvp_date: string;
  event_rank: number;
  total_rsvps: number;
}

export interface EventData {
  id: number;
  title: string;
  starts_at: string;
  ends_at: string;
  location: string;
}
