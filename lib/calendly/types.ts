type KindType = 'google' | 'zoom' | 'slack';

export interface CalendarEvent {
  external_id: string;
  kind: KindType;
}

export interface EventMembership {
  user: string;
}

export interface InviteesCounter {
  active: number;
  limit: number;
  total: number;
}

export interface Location {
  join_url: string
  status: 'pushed'
  type: string
}

export interface Question {
  answer: string;
  position: number;
  question: string;
}

export interface CalendlyEvent {
  calendar_event: CalendarEvent;
  created_at: string;
  end_time: string;
  event_guests: any[]; // if you know more specific structure of guest, replace any with that structure
  event_memberships: EventMembership[];
  event_type: string;
  invitees_counter: InviteesCounter;
  location: Location;
  name: string
  start_time: string;
  status: "active" | "canceled"
  updated_at: string;
  uri: string;
  student_name: string;
  student_email: string;
  cancel_url: string;
  reschedule_url: string;
  questions: Question[];
  studentID: string;
}
