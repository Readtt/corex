"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { type RouterOutputs } from "@/trpc/react";
import { Loader2, SearchIcon } from "lucide-react";
import { useState } from "react";
import { TicketsTablePagination } from "./tickets-table-pagination";
import { TicketsTableToolbar } from "./tickets-table-toolbar";

export type TicketsTableRow =
  RouterOutputs["ticket"]["getRecentTicketsWithPagination"]["tickets"][0];

interface TicketsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  pagination: {
    state: PaginationState;
    onPaginationChange: OnChangeFn<PaginationState>;
    pageCount: number;
    rowCount?: number;
  };

  sorting: {
    state: SortingState;
    onSortingChange: OnChangeFn<SortingState>;
  };

  columnFilters: {
    state: ColumnFiltersState;
    onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  };

  isLoading?: boolean;
  openTicket: (id: string) => void;
}

export function TicketsTable<TData, TValue>({
  columns,
  data,
  pagination,
  sorting,
  columnFilters,
  isLoading,
  openTicket,
}: TicketsTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection,

      pagination: pagination.state,
      sorting: sorting.state,
      columnFilters: columnFilters.state,
    },
    onPaginationChange: pagination.onPaginationChange,
    onSortingChange: sorting.onSortingChange,
    onColumnFiltersChange: columnFilters.onColumnFiltersChange,

    pageCount: pagination.pageCount,
    rowCount: pagination.rowCount,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,

    enableRowSelection: true,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="w-full space-y-4">
      <TicketsTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex w-full flex-col items-center justify-center space-y-4 p-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        onClick={() => {
                          openTicket((row.original as TicketsTableRow).id);
                        }}
                        className="cursor-pointer"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex w-full flex-col items-center justify-center space-y-4 p-8">
                    <SearchIcon className="h-20 w-20" />
                    <span className="text-lg font-semibold">
                      No results found
                    </span>
                    <span className="max-w-xs text-sm text-muted-foreground">
                      No results match this filter criteria. Remove all filters
                      or clear all filters to show results.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TicketsTablePagination table={table} />
    </div>
  );
}
