"use client";
import { CalendlyEvent } from "@/lib/calendly/types";
import { getLastWord } from "@/lib/last-word";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  cn,
} from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  BiLinkExternal,
  BiLogoGoogle,
  BiLogoSlack,
  BiLogoZoom,
} from "react-icons/bi";
import { FaEllipsisV, FaLink } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { TbCalendarCancel } from "react-icons/tb";
import AddSessionModal from "../../AddSessionModal";
import AddStudentModal from "../../AddStudentModal";
import { copyToClipboard } from "../../CopyToClipboard";
import { MeetingStatus } from "./MeetingStatus";

export const calendlyColumns: ColumnDef<CalendlyEvent>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <MeetingStatus event={row.original} />;
    },
  },
  {
    accessorKey: "student_name",
    header: "Student",
    cell: ({ row }) => {
      return row.original.studentID ? (
        <Link
          href={`/student/${row.original.studentID}`}
          className="cursor-pointer">
          {row.original.student_name}
        </Link>
      ) : (
        <div className="cursor-default">{row.original.student_name}</div>
      );
    },
  },
  {
    id: "location",
    cell: ({ row }) => {
      switch (row.original.location.type) {
        case "zoom_conference":
          return (
            <div className="inline-flex items-center text-[#2d8cff] cursor-pointer">
              <Link
                href={row.original.location.join_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex">
                <BiLogoZoom className="w-6 h-6 mr-2" />
                Zoom
              </Link>
            </div>
          );
        case "slack_conference":
          return (
            <div className="flex items-center text-[#e01563] cursor-default">
              <BiLogoSlack className="w-6 h-6 mr-2" />
              Slack Huddle
            </div>
          );
        case "google_conference":
          return (
            <div className="inline-flex items-center text-[#34a853] cursor-pointer">
              <Link
                href={row.original.location.join_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex">
                <BiLogoGoogle className="w-6 h-6 mr-2" />
                Google Meet
              </Link>
            </div>
          );
        default:
          return null;
      }
    },
    header: "Location",
  },
  {
    accessorKey: "name",
    header: "Meeting Type",
    cell: ({ row }) => {
      return <>{getLastWord(row.original.name)}</>;
    },
  },
  {
    accessorFn: (row) => {
      const date = new Date(row.start_time);
      return new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(date);
    },
    accessorKey: "Date",
  },
  {
    accessorFn: (row) => {
      const date = new Date(row.start_time);
      return date.toLocaleTimeString([], { timeStyle: "short" });
    },
    header: "Time",
  },
  {
    id: "new_session",
    header: "New Session",
    cell: ({ row }) => {
      return row.original.studentID ? (
        <AddSessionModal studentId={row.original.studentID} />
      ) : (
        <AddStudentModal />
      );
    },
  },
  {
    id: "actions",
    enableHiding: true,
    header: "Actions",
    cell: ({ row }) => {
      const iconClasses =
        "text-xl text-default-500 pointer-events-none flex-shrink-0";
      return (
        <>
          <Dropdown
            backdrop="blur"
            showArrow>
            <DropdownTrigger>
              <Button
                variant="light"
                className="h-8 w-8 p-0"
                color="primary">
                <span className="sr-only">Open menu</span>
                <FaEllipsisV className="h-4 w-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="faded"
              aria-label="Dropdown Actions for meeting">
              <DropdownSection
                title="Current Meeting"
                showDivider>
                <DropdownItem
                  key="session"
                  description="Record a new Session"
                  startContent={<PiStudent className={iconClasses} />}
                  title="New Session"
                />
                <DropdownItem
                  key="meeting"
                  description="Open the meeting in a new tab"
                  startContent={<BiLinkExternal className={iconClasses} />}
                  href={row.original.location.join_url}
                  target="_blank"
                  rel="noopener"
                  title="Join Meeting"
                />
                <DropdownItem
                  key="meeting_url"
                  description="Copy Meeting URL to clipboard"
                  startContent={<FaLink className={iconClasses} />}
                  title="Meeting URL"
                  onPress={() =>
                    copyToClipboard(row.original.location.join_url)
                  }
                />
              </DropdownSection>
              <DropdownSection title="Meeting Tools">
                <DropdownItem
                  key="meeting_info"
                  description="Answers from Calendly Questions"
                  startContent={
                    <AiOutlineInfoCircle
                      className={cn(iconClasses, "text-danger")}
                    />
                  }
                  title="Meeting Info"
                />
                <DropdownItem
                  key="reschedule"
                  description="Reschedule this meeting"
                  startContent={
                    <TbCalendarCancel
                      className={cn(iconClasses, "text-danger")}
                    />
                  }
                  onClick={() =>
                    window.open(row.original.reschedule_url, "_blank")
                  }
                  title="Reschedule"
                />
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          {/* Old component */}
        </>
      );
    },
  },
];
