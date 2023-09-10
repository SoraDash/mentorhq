"use client"
import { CalendlyEvent } from '@/lib/calendly/types'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, cn } from '@nextui-org/react'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BiLinkExternal, BiLogoGoogle, BiLogoSlack, BiLogoZoom } from 'react-icons/bi'
import { FaEllipsisV, FaLink } from 'react-icons/fa'
import { PiStudent } from 'react-icons/pi'
import { TbCalendarCancel } from 'react-icons/tb'
import AddSessionModal from '../../AddSessionModal'
import { MeetingInfoWithToast } from './MeetingInfo'


export const calendlyColumns: ColumnDef<CalendlyEvent>[] = [
  {
    accessorKey: "status",
    header: "Status",

  },
  {
    accessorKey: "student_name",
    header: ({ column }) => {
      return (
        <Button
          variant="light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Link href={`/student/${row.original.studentID}`} className='cursor-pointer'>
          {row.original.student_name}
        </Link>
      )
    }
  },
  {
    id: "location",
    cell: ({ row }) => {
      switch (row.original.location.type) {
        case "zoom_conference":
          return (
            <div className="inline-flex items-center text-[#2d8cff] cursor-pointer" >
              <Link href={row.original.location.join_url} target='_blank' rel="noopener noreferrer" className='inline-flex'>
                <BiLogoZoom className="w-6 h-6 mr-2" />
                Zoom
              </Link>
            </div >
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
              <Link href={row.original.location.join_url} target='_blank' rel="noopener noreferrer" className='inline-flex'>
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

  },
  {
    accessorFn: (row) => {
      const date = new Date(row.start_time)
      return date.toLocaleDateString()
    },
    header: "Date",

  },
  {
    accessorFn: (row) => {
      const date = new Date(row.start_time)
      return date.toLocaleTimeString([], { timeStyle: "short" })
    },
    header: "Time",

  },
  {
    id: "new_session",
    header: "New Session",
    cell: ({ row }) => {
      return <AddSessionModal />
    }
  },
  {
    id: "actions",
    enableHiding: true,
    header: "Actions",
    cell: ({ row }) => {
      const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
      return (
        <>
          <Dropdown
            backdrop='blur'
            showArrow
          >
            <DropdownTrigger>
              <Button variant="light" className="h-8 w-8 p-0" color='primary'>
                <span className="sr-only">Open menu</span>
                <FaEllipsisV className="h-4 w-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown Actions for meeting">
              <DropdownSection title="Current Meeting" showDivider>
                <DropdownItem
                  key="session"
                  description="Record a new Session"
                  startContent={<PiStudent className={iconClasses} />}>
                  New Session
                </DropdownItem>
                <DropdownItem
                  key="meeting"
                  description="Open the meeting in a new tab"
                  startContent={<BiLinkExternal className={iconClasses} />}
                >
                  Join Meeting
                </DropdownItem>
                <DropdownItem
                  key="meeting_url"
                  description="Copy Meeting URL to clipboard"
                  startContent={<FaLink className={iconClasses} />}
                >
                  <MeetingInfoWithToast event={row.original} >
                    Meeting URL
                  </MeetingInfoWithToast>
                </DropdownItem>

              </DropdownSection>
              <DropdownSection title="Meeting Tools">
                <DropdownItem
                  key="meeting_info"
                  description="Answers from Calendly Questions"
                  startContent={<AiOutlineInfoCircle className={cn(iconClasses, "text-danger")} />}
                >
                  Meeting Info
                </DropdownItem>
                <DropdownItem
                  key="reschedule"
                  description="Reschedule this meeting"
                  startContent={<TbCalendarCancel className={cn(iconClasses, "text-danger")} />}
                  onClick={() => window.open(row.original.reschedule_url, "_blank")}
                >
                  Reschedule
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          {/* Old component */}
        </>

      )
    },
  }
]

