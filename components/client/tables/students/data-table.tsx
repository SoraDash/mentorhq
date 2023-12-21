'use client';

import { Button, Input } from '@nextui-org/react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { RiRocketFill } from 'react-icons/ri';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { syncStudentsWithDatabase } from '@/lib/students';

import AddStudentModal from '../../AddStudentModal';
import { LoadingModal } from '../../LoadingModal';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  async function handleSync() {
    setIsSyncing(true);

    try {
      const { added, removed, updated } = await syncStudentsWithDatabase();

      // Check for added, removed or updated students and update toast accordingly
      if (added.length > 0) {
        toast({
          title: `Success: Added ${added.length} student(s)!`,
          variant: 'default',
        });
      }

      if (removed.length > 0) {
        toast({
          title: `Notice: Unassigned ${removed.length} student(s)!`,
          variant: 'default',
        });
      }

      if (updated.length > 0) {
        toast({
          title: `Success: Updated ${updated.length} student(s)!`,
          variant: 'default',
        });
      }

      if (added.length === 0 && removed.length === 0 && updated.length === 0) {
        toast({
          title: "Everything's up-to-date!",
          description: 'No changes were made during the sync.',
          variant: 'default',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error: Something went wrong!',
        description: `Failed to sync students: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
      router.refresh();
    }
  }

  return (
    <>
      <div className="py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Input */}
          <div className="mb-2 md:mb-0 md:max-w-sm md:mr-4">
            <Input
              isClearable
              label="Filter by students name"
              onChange={(event) =>
                table.getColumn('name')?.setFilterValue(event.target.value)
              }
              onClear={() => table.getColumn('name')?.setFilterValue('')}
              type="text"
              value={
                (table.getColumn('name')?.getFilterValue() as string) ?? ''
              }
              variant="bordered"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <AddStudentModal />
            {session?.user?.hasKey && (
              <Button
                color={!isSyncing ? 'primary' : 'danger'}
                disabled={isSyncing}
                isLoading={isSyncing}
                onClick={handleSync}
                spinnerPlacement="end"
                variant="flat"
              >
                {isSyncing ? (
                  <>
                    <LoadingModal
                      close={() => !isSyncing}
                      isSyncing={isSyncing}
                    />
                    {}
                  </>
                ) : (
                  <>
                    {' '}
                    Sync Students <RiRocketFill className="ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && 'selected'}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 mr-4">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="md"
            variant="ghost"
          >
            Previous
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="md"
            variant="ghost"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
