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

export interface EventDataSingle {
  id: number;
  title: string;
  description: string;
  starts_at: string;
  ends_at: string;
  location: string;
  address: string;
  capacity: number;
  created_at: string;
  venue_id: number;
}

export interface CreateEventData {
  title: string;
  description: string;
  starts_at: string;
  ends_at: string;
  venue_id: number;
}

export interface EditEventData {
  title: string;
  description: string;
  starts_at: string;
  ends_at: string;
  venue_id: number;
}

export interface EventFormData {
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  venueId: string;
}
