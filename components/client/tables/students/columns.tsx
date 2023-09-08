"use client"

import { BooleanIcon } from '@/components/server/BooleanIcon'
import { cleanProgrammeID } from '@/lib/course/courseUtils'
import { UnifiedStudent } from '@/lib/students'
import { Button } from '@nextui-org/react'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, } from 'lucide-react'
import Link from 'next/link'
import { BiLinkExternal } from 'react-icons/bi'
import ContactMethodDropdown from '../../ContactMethodDropdown'

export const studentColumns: ColumnDef<UnifiedStudent>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="light"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "lmsAccess",
    header: "LMS Access",
    cell: ({ row }) => {
      return (
        <BooleanIcon condition={row.original.lmsAccess ?? false} />
      )
    }
  },
  {
    id: "contactMethod",
    cell: ({ row }) => {
      return row.original.contactMethod && <ContactMethodDropdown studentId={row.original.id} currentMethod={row.original.contactMethod} />
    },
    header: "Prefered Meeting Method",
  },
  {
    accessorKey: "programmeID",
    header: "Programme ID",
    cell: ({ row }) => {
      return cleanProgrammeID(row.original.programmeID || "")
    }
  },
  {
    accessorKey: "projects",
    header: "Projects",
    cell: ({ row }) => {
      return row.original.projects?.length || 0
    }
  },
  {
    id: "actions",
    header: "Profile",
    cell: ({ row }) => {
      const student = row.original

      return (
        <Link href={`/student/${student.id}`} className='cursor-pointer'>
          <BiLinkExternal className="h-4 w-4" />
        </Link>

      )
    },
  },
]