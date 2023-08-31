"use client"

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CalendlyEvent } from '@/lib/calendly/types'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, } from 'lucide-react'
import Link from 'next/link'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BiLinkExternal, BiLogoGoogle, BiLogoSlack, BiLogoZoom } from 'react-icons/bi'
import { FaLink } from 'react-icons/fa'
import { PiStudent } from 'react-icons/pi'
import { TbCalendarCancel } from 'react-icons/tb'
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
          variant="ghost"
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
    id: "actions",
    enableHiding: true,
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Tools</DropdownMenuLabel>
            <DropdownMenuItem>
              <PiStudent className="mr-2" />
              Add New Session
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BiLinkExternal className="mr-2" />
              Join Meeting
            </DropdownMenuItem>
            <MeetingInfoWithToast event={row.original} >
              <DropdownMenuItem>
                <FaLink className="mr-2" />
                Copy Meeting URL to clipboard
              </DropdownMenuItem>
            </MeetingInfoWithToast>

            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              Meeting Tools
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <AiOutlineInfoCircle className="mr-2" />
              Meeting Info
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open(row.original.reschedule_url)}>
              <TbCalendarCancel className="mr-2" />Rescheudle Meeting
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu >
      )
    },
  }
]
