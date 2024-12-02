"use client";

import { ticketProblems, ticketSeverity } from "@/server/api/schemas";
import { api } from "@/trpc/react";
import { Prisma, TicketStatus } from "@prisma/client";
import {
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { ticketsColumns } from "./tickets-columns";
import { TicketsTable } from "./tickets-table";
import { TicketDisplay } from "./ticket-display";

export default function TicketsTableLayout() {
  const [ticketDisplay, setTicketDisplay] = useState<{
    open: boolean;
    id?: string;
  }>({ open: false });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "problem", value: ticketProblems },
    { id: "status", value: Object.keys(TicketStatus) as TicketStatus[] },
    { id: "severity", value: ticketSeverity },
  ]);

  const { data, isLoading } =
    api.ticket.getRecentTicketsWithPagination.useQuery({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      filters: columnFilters.map((r) => [
        r.id as keyof Prisma.TicketWhereInput,
        r.value,
      ]),
      order: sorting.map((r) => [
        r.id as keyof Prisma.TicketWhereInput,
        r.desc ? Prisma.SortOrder.desc : Prisma.SortOrder.asc,
      ]),
    });

  return (
    <div className="flex h-full flex-row">
      <TicketsTable
        isLoading={isLoading}
        pagination={{
          state: pagination,
          onPaginationChange: setPagination,
          pageCount: data?.totalPages ?? 1,
          rowCount: data?.totalRecords,
        }}
        sorting={{ state: sorting, onSortingChange: setSorting }}
        columnFilters={{
          state: columnFilters,
          onColumnFiltersChange: setColumnFilters,
        }}
        data={data?.tickets ?? []}
        columns={ticketsColumns}
        openTicket={(id) => {
          setTicketDisplay({ open: true, id });
        }}
      />
      <TicketDisplay
        open={ticketDisplay.open}
        setIsOpen={(open) => setTicketDisplay({ open, id: ticketDisplay.id })}
        ticketId={ticketDisplay.id}
      />
    </div>
  );
}
