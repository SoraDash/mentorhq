import { CalendlyEvent } from "@/lib/calendly/types";
import {
  addDays,
  addHours,
  addMinutes,
  differenceInDays,
  formatDistanceStrict,
  isAfter,
  isPast,
  isToday,
  parseISO,
} from "date-fns";

interface MeetingStatusProps {
  event: CalendlyEvent;
}

export const MeetingStatus = ({ event }: MeetingStatusProps) => {
  const isTodayAndInPast = (session: any) => {
    const sessionDate = parseISO(session);
    if (eventInPast(session) === "Session In Progress") {
      return {
        class: "text-green-600 font-semibold",
        bg: "dot-label bg-green-600",
      };
    }
    if (isPast(sessionDate)) {
      return {
        class: "text-green-600 font-semibold",
        bg: "dot bg-green-600",
      };
    }

    if (isToday(sessionDate)) {
      return {
        class: "text-green-600 font-semibold",
        bg: "dot-label bg-green-600",
      };
    }
    // parse the sessionDate to compare with next 5 days
    const sessionFiveDays = addDays(new Date(), 5);
    if (isAfter(sessionDate, sessionFiveDays)) {
      return {
        class: "text-red-500",
        bg: "dot bg-red-500",
      };
    }

    return {
      class: "text-yellow-500",
      bg: "dot bg-yellow-500",
    };
  };

  const eventInPast = (session: string) => {
    const sessionDate = new Date(parseISO(session));
    const currentDate = new Date();
    if (isPast(sessionDate) && sessionDate > addMinutes(currentDate, -45)) {
      return "Session In Progress";
    } else if (isPast(sessionDate)) {
      return "Session Complete";
    } else {
      if (isToday(sessionDate)) {
        return `Today (in ${formatDistanceStrict(currentDate, sessionDate)})`;
      }
      return `In ${differenceInDays(sessionDate, currentDate)} days`;
    }
  };

  const shouldRenderSession = (session: any) => {
    const sessionDate = new Date(parseISO(session));
    const currentDate = new Date();
    // get the end time of the session
    const endTime = addHours(sessionDate, 2);
    // check if current time is after end time
    if (isAfter(currentDate, endTime)) {
      return false;
    }
    return true;
  };
  if (event.status !== "active" || !shouldRenderSession(event.start_time)) {
    return null; // Or some placeholder if needed
  }

  const renderStatus = () => {
    const sessionDate = parseISO(event.start_time);
    const isEventToday = isToday(sessionDate);
    const status = eventInPast(event.start_time);
    const statusClasses = isTodayAndInPast(event.start_time);
    const dotClass = isEventToday ? "pulsing-dot" : "dot";

    return (
      <div className={`flex items-center ${statusClasses.class}`}>
        <div className={`${statusClasses.bg} ${dotClass}`}></div>
        <span className="ml-2">{status}</span>
      </div>
    );
  };

  return <div className="text-center">{renderStatus()}</div>;
};
