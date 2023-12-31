'use client';

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { FaHammer } from 'react-icons/fa';
import { PiUserCircleBold, PiUserCircleGearFill } from 'react-icons/pi';

import { RoleDropdown } from '@/components/client/RoleDropdown';
import SensitiveInfo from '@/components/client/SensetiveInfo';
import { BooleanIcon } from '@/components/server/BooleanIcon';
import { UserWithCount } from '@/lib/db/types';

import { SyncGithubBio } from './SyncGithubBio';

export const mentorColumns: ColumnDef<UserWithCount>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="flat"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="relative inline-flex items-center">
          <Avatar
            as="button"
            className="transition-transform"
            color={row.original.isPremium ? 'danger' : 'default'}
            isBordered={row.original.isPremium}
            name={row.original?.name as string}
            showFallback
            src={
              (row.original.github as string) || (row.original.image as string)
            }
          />
          <span className="ml-2">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'isOnboarded',
    header: 'Onboarding Completed',
    cell: ({ row }) => {
      return (
        <>
          <BooleanIcon
            className="items-center text-center w-6 h-6"
            condition={row.original.isOnboarded}
          />
        </>
      );
    },
  },
  {
    accessorKey: 'isPremium',
    header: 'Premium Member',
    cell: ({ row }) => {
      return (
        <>
          <BooleanIcon
            className="items-center text-center w-6 h-6"
            condition={row.original.isOnboarded}
          />
        </>
      );
    },
  },
  {
    accessorKey: 'calendly_token',
    header: 'Calendly Enabled',
    cell: ({ row }) => {
      return (
        <>
          <BooleanIcon
            className="items-center text-center w-6 h-6"
            condition={!!row.original?.calendly_token}
          />
        </>
      );
    },
  },
  {
    accessorKey: 'ciApiKey',
    header: 'CI API Key set',
    cell: ({ row }) => {
      return (
        <>
          <BooleanIcon
            className="items-center text-center w-6 h-6"
            condition={!!row.original?.ciApiKey}
          />
        </>
      );
    },
  },
  {
    accessorKey: '._count.studentSession',
    header: 'Total Student Sessions',
    cell: ({ row }) => {
      return (
        <>
          {row.original._count?.studentSession
            ? row.original._count?.studentSession
            : 0}
        </>
      );
    },
  },
  {
    accessorKey: '_count.students',
    header: 'Total Students',
    cell: ({ row }) => {
      return (
        <>{row.original._count?.students ? row.original._count?.students : 0}</>
      );
    },
  },
  {
    accessorKey: 'paidPerHour',
    header: 'Paid Per Hour',
    cell: ({ row }) => {
      return (
        <>
          {row.original.paidPerHour ? (
            <SensitiveInfo value={row.original.paidPerHour.toString()} />
          ) : (
            <span className="text-gray-400">Not set</span>
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      return (
        <>
          <RoleDropdown
            currentRole={row.original.role}
            userId={row.original.id}
          />
        </>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: true,
    header: 'Actions',
    cell: ({ row }) => {
      const mentor = row.original;

      return (
        <Dropdown backdrop="blur" showArrow>
          <DropdownTrigger>
            <Button className="h-8 w-8 p-0" variant="light">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dropdown menu with icons">
            <DropdownItem
              key="profile"
              startContent={<PiUserCircleBold className="mr-2" />}
            >
              <Link
                className="cursor-pointer"
                href={`/admin/mentor/${mentor.id}`}
              >
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
            <DropdownItem key="sync">
              <SyncGithubBio id={mentor.id} minimal />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    },
  },
];
