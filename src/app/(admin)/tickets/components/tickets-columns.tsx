"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { TicketStatus } from "@prisma/client";
import { type TicketsTableRow } from "./tickets-table";
import { TicketsTableColumnHeader } from "./tickets-table-column-header";
import { TicketsTableRowActions } from "./tickets-table-row-actions";

export const ticketsColumns: ColumnDef<TicketsTableRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "problem",
    header: ({ column }) => (
      <TicketsTableColumnHeader column={column} title="Problem" />
    ),
    cell: ({ row }) => {
      return <Badge variant="outline">{row.original.problem}</Badge>;
    },
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <TicketsTableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.original.subject}
        </span>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <TicketsTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <TicketsTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant={"secondary"}>
          <div
            className={cn("mr-2 h-2 w-2 rounded-full", {
              "bg-green-500": row.original.status == TicketStatus.OPEN,
              "bg-yellow-500": row.original.status == TicketStatus.PENDING,
              "bg-orange-500": row.original.status == TicketStatus.IN_PROGRESS,
              "bg-red-500": row.original.status == TicketStatus.CLOSED,
            })}
          />
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "severity",
    header: ({ column }) => (
      <TicketsTableColumnHeader column={column} title="Severity" />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant={"secondary"}>
          <div
            className={cn("mr-2 h-2 w-2 rounded-full", {
              "bg-yellow-500": row.original.severity == "Low",
              "bg-muted-foreground": row.original.severity == "Normal",
              "bg-orange-500": row.original.severity == "High",
              "bg-red-500": row.original.severity == "Urgent",
            })}
          />
          {row.original.severity}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TicketsTableRowActions row={row} />,
  },
];
