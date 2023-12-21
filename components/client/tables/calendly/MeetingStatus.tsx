import {
  addDays,
  addMinutes,
  differenceInDays,
  formatDistanceStrict,
  isAfter,
  isPast,
  isToday,
  parseISO,
} from 'date-fns';

import { CalendlyEvent } from '@/lib/calendly/types';

interface MeetingStatusProps {
  event: CalendlyEvent;
}

export const MeetingStatus = ({ event }: MeetingStatusProps) => {
  const isTodayAndInPast = (session: any) => {
    const sessionDate = parseISO(session);

    if (eventInPast(session) === 'Session In Progress') {
      return {
        class: 'text-green-600 font-semibold',
        bg: 'dot-label bg-green-600',
      };
    }

    if (isPast(sessionDate)) {
      return {
        class: 'text-green-600 font-semibold',
        bg: 'dot bg-green-600',
      };
    }

    if (isToday(sessionDate)) {
      return {
        class: 'text-green-600 font-semibold',
        bg: 'dot-label bg-green-600',
      };
    }

    // parse the sessionDate to compare with next 5 days
    const sessionFiveDays = addDays(new Date(), 5);

    if (isAfter(sessionDate, sessionFiveDays)) {
      return {
        class: 'text-red-500',
        bg: 'dot bg-red-500',
      };
    }

    return {
      class: 'text-yellow-500',
      bg: 'dot bg-yellow-500',
    };
  };

  const eventInPast = (session: string) => {
    const sessionDate = new Date(parseISO(session));
    const currentDate = new Date();
    const sessionEndTime = addMinutes(sessionDate, 45); // 45 minutes after session starts

    // Session in progress
    if (currentDate >= sessionDate && currentDate <= sessionEndTime) {
      return 'Session In Progress';
    }

    // Session is scheduled for later today
    if (isToday(sessionDate) && currentDate < sessionDate) {
      const timeToStart = formatDistanceStrict(sessionDate, currentDate);

      return `Today (in ${timeToStart})`;
    }

    // Session complete
    if (currentDate > sessionEndTime) {
      return 'Session Complete';
    }

    // Future session (not today)
    if (!isToday(sessionDate)) {
      if (differenceInDays(sessionDate, currentDate) === 0) {
        return 'Tomorrow';
      }

      return `In ${differenceInDays(sessionDate, currentDate)} days`;
    }
  };

  if (event.status !== 'active') return null;

  const renderStatus = () => {
    const sessionDate = parseISO(event.start_time);
    const isEventToday = isToday(sessionDate);
    const status = eventInPast(event.start_time);
    const statusClasses = isTodayAndInPast(event.start_time);
    const dotClass = isEventToday ? 'pulsing-dot' : 'dot';

    return (
      <div className={`flex items-center ${statusClasses.class}`}>
        <div className={`${statusClasses.bg} ${dotClass}`} />
        <span className="ml-2">{status}</span>
      </div>
    );
  };

  return <div className="text-center">{renderStatus()}</div>;
};
