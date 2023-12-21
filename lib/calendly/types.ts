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
  join_url: string;
  status: 'pushed';
  type: string;
}

export interface Question {
  answer: string;
  position: number;
  question: string;
}

export interface CalendlyEvent {
  calendar_event: CalendarEvent;
  cancel_url: string;
  created_at: string;
  end_time: string;
  event_guests: any[];
  // if you know more specific structure of guest, replace any with that structure
  event_memberships: EventMembership[];
  event_type: string;
  invitees_counter: InviteesCounter;
  location: Location;
  name: string;
  questions: Question[];
  reschedule_url: string;
  start_time: string;
  status: 'active' | 'canceled';
  studentID: string;
  student_email: string;
  student_name: string;
  updated_at: string;
  uri: string;
}

export interface CalendlyToken {
  access_token: string;
  created_at: number;
  expires_in: number;
  organization: string;
  owner: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}
