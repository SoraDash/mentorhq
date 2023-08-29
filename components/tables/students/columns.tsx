"use client"

import { Button } from '@/components/ui/button'
import { Student } from '@prisma/client'
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, } from 'lucide-react'
import { BiUserCircle } from 'react-icons/bi'
import Link from 'next/link'

export const studentColumns: ColumnDef<Student>[] = [
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
    accessorKey: "courseCode",
    header: "Course Code",
  },
  {
    accessorKey: "programmeID",
    header: "Programme ID",

  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original

      return (
        <Link href={`/student/${student.id}`} className='cursor-pointer'>
          <BiUserCircle className="h-4 w-4" />
        </Link>

      )
    },
  },
]
