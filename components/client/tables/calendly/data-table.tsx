"use client";

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
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { RiRocketFill } from "react-icons/ri";
import { LoadingModal } from "../../LoadingModal";
import { useToast } from "@/components/ui/use-toast";
import { syncStudentsWithDatabase } from "@/lib/students";
import { useRouter } from "next/navigation";
import { refreshCalendlyEventsForUser } from "@/actions/calendly.actions";
import { CalendarSearch } from "lucide-react";

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
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
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
    setCurrentAction("sync");
    try {
      const { added, removed, updated } = await syncStudentsWithDatabase();

      // Check for added, removed or updated students and update toast accordingly
      if (added.length > 0) {
        toast({
          title: `Success: Added ${added.length} student(s)!`,
          variant: "default",
        });
      }
      if (removed.length > 0) {
        toast({
          title: `Notice: Unassigned ${removed.length} student(s)!`,
          variant: "default",
        });
      }
      if (updated.length > 0) {
        toast({
          title: `Success: Updated ${updated.length} student(s)!`,
          variant: "default",
        });
      }
      if (added.length === 0 && removed.length === 0 && updated.length === 0) {
        toast({
          title: "Everything's up-to-date!",
          description: "No changes were made during the sync.",
          variant: "default",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error: Something went wrong!",
        description: `Failed to sync students: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
      setCurrentAction(null);
      router.refresh();
    }
  }
  async function refreshCalendly() {
    setIsSyncing(true);
    setCurrentAction("calendly");
    try {
      await refreshCalendlyEventsForUser();
    } finally {
      setIsSyncing(false);
      setCurrentAction(null);
      router.refresh();
    }
  }

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  // eslint-disable-next-line no-unused-vars
  async function handleAddSession() {}

  return (
    <>
      <div className="py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Input */}
          <div className="mb-2 md:mb-0 md:max-w-sm md:mr-4">
            <Input
              placeholder="Filter by name..."
              value={
                (table.getColumn("student_name")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("student_name")
                  ?.setFilterValue(event.target.value)
              }
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="flat"
              color={!isSyncing ? "primary" : "danger"}
              disabled={isSyncing}
              isLoading={isSyncing}
              spinnerPlacement="end"
              onClick={refreshCalendly}
              endContent={<CalendarSearch />}>
              Refresh Calendly
            </Button>
            <Button
              variant="flat"
              color={!isSyncing ? "primary" : "danger"}
              onClick={handleSync}
              disabled={isSyncing}
              isLoading={isSyncing}
              spinnerPlacement="end">
              {isSyncing ? (
                <>
                  <LoadingModal
                    close={() => !isSyncing}
                    isSyncing={isSyncing}
                    headerText={
                      currentAction === "sync"
                        ? "Fetching your students from CI Spreadsheet..."
                        : "Refreshing Calendly..."
                    }
                  />
                </>
              ) : (
                <>
                  {" "}
                  Sync Students <RiRocketFill className="ml-2" />
                </>
              )}
            </Button>
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
                            header.getContext()
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4 mr-4">
          <Button
            variant="flat"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="flat"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
