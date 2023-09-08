"use client"

import { RoleDropdown } from '@/components/client/RoleDropdown'
import SensitiveInfo from '@/components/client/SensetiveInfo'
import { BooleanIcon } from '@/components/server/BooleanIcon'
import { MentorWithCount } from '@/lib/admin/mentors'
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, } from 'lucide-react'
import Link from 'next/link'
import { FaHammer } from 'react-icons/fa'
import { PiUserCircleBold, PiUserCircleGearFill } from 'react-icons/pi'
import { SyncGithubBio } from './SyncGithubBio'

export const mentorColumns: ColumnDef<MentorWithCount>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="flat"
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
          <Avatar
            isBordered={row.original.isPremium}
            color={row.original.isPremium ? "danger" : "default"}
            as="button"
            className="transition-transform"
            src={row.original.github as string || row.original.image as string}
            name={row.original?.name as string}
            showFallback
          />
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
        <Dropdown
          backdrop='blur'
          showArrow
        >
          <DropdownTrigger>
            <Button variant="light" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dropdown menu with icons">
            <DropdownItem
              key="profile"
              startContent={<PiUserCircleBold className="mr-2" />}
            >
              <Link href={`/admin/mentor/${mentor.id}`} className='cursor-pointer'>
                View Profile
              </Link>
            </DropdownItem>
            <DropdownItem
              key="edit"
              startContent={<PiUserCircleGearFill className="mr-2" />}
            >

              Edit Mentor
            </DropdownItem>
            <DropdownItem
              key="ban"
              startContent={<FaHammer className="mr-2" />}
            >
              Ban Mentor
            </DropdownItem>
            <DropdownItem
              key="sync"
            >
              <SyncGithubBio id={mentor.id} minimal />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown >
      )
    },
  }
]
