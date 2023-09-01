"use client"

import Avatar from '@/components/client/Avatar'
import { RoleDropdown } from '@/components/client/RoleDropdown'
import SensitiveInfo from '@/components/client/SensetiveInfo'
import { BooleanIcon } from '@/components/server/BooleanIcon'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MentorWithCounts } from '@/lib/admin/mentors'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, } from 'lucide-react'
import Link from 'next/link'
import { PiHammerBold, PiTrashBold, PiUserCircleBold, PiUserCircleGearFill } from 'react-icons/pi'
import { FetchGithubBio } from './github-bio'

export const mentorColumns: ColumnDef<MentorWithCounts>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className='relative inline-flex items-center'>
          <Avatar entity={row.original} />
          <span className="ml-2">{row.original.name}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "isOnboarded",
    header: "Onboarding Completed",
    cell: ({ row }) => {
      return (<>
        <BooleanIcon condition={row.original.isOnboarded} className='items-center text-center w-6 h-6' />
      </>)
    }
  },
  {
    accessorKey: "isPremium",
    header: "Premium Member",
    cell: ({ row }) => {
      return (<>
        <BooleanIcon condition={row.original.isOnboarded} className='items-center text-center w-6 h-6' />
      </>)
    }
  },
  {
    accessorKey: "calendly_token",
    header: "Calendly Enabled",
    cell: ({ row }) => {
      return (<>
        <BooleanIcon condition={!!row.original?.calendly_token} className='items-center text-center w-6 h-6' />
      </>)
    }
  },
  {
    accessorKey: "ciApiKey",
    header: "CI API Key set",
    cell: ({ row }) => {
      return (<>
        <BooleanIcon condition={!!row.original?.ciApiKey} className='items-center text-center w-6 h-6' />
      </>)
    }
  },
  {
    accessorKey: "._count.studentSession",
    header: "Total Student Sessions",
    cell: ({ row }) => {
      return (
        <>
          {row.original._count?.studentSession ? row.original._count?.studentSession : 0}

        </>
      )
    }
  },
  {
    accessorKey: "_count.students",
    header: "Total Students",
    cell: ({ row }) => {
      return (
        <>
          {row.original._count?.students ? row.original._count?.students : 0}
        </>
      )
    }
  },
  {
    accessorKey: "paidPerHour",
    header: "Paid Per Hour",
    cell: ({ row }) => {
      return (<>
        {row.original.paidPerHour ? (<SensitiveInfo value={row.original.paidPerHour.toString()} />) : (<span className='text-gray-400'>Not set</span>)}
      </>)
    }
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return (
        <>
          <RoleDropdown userId={row.original.id} currentRole={row.original.role} />
        </>
      )
    }

  },
  {
    id: "actions",
    enableHiding: true,
    header: "Actions",
    cell: ({ row }) => {
      const mentor = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/mentor/${mentor.id}`} className='cursor-pointer'>
                <PiUserCircleBold className="mr-2" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PiUserCircleGearFill className="mr-2" />
              Edit Mentor
            </DropdownMenuItem>
            <DropdownMenuItem className='text-orange-500'>
              <PiHammerBold className="mr-2" />
              Ban Mentor
            </DropdownMenuItem>
            <DropdownMenuItem className='text-red-500'>
              <PiTrashBold className="mr-2" />
              Delete Mentor
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <FetchGithubBio id={mentor.id} />
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu >
      )
    },
  }
]
