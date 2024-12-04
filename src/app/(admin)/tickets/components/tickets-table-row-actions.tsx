"use client";

import { type Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { api } from "@/trpc/react";
import { TicketStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { type TicketsTableRow } from "./tickets-table";

interface TicketsTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function TicketsTableRowActions<TData>({
  row,
}: TicketsTableRowActionsProps<TData>) {
  const data = row.original as TicketsTableRow;
  const utils = api.useUtils();

  const { mutate: deleteTicketById, isPending } =
    api.ticket.deleteTicketById.useMutation({
      onMutate: async() => {
        toast.success("Loading...", {
          description: "Your ticket is deleting.",
        });
      },
      onSuccess: async () => {
        await utils.ticket.invalidate();

        toast.success("Success!", {
          description: "This ticket has been deleted.",
        });
      },
      onError: (error) => {
        toast.error("There was a problem", {
          description: error.message,
          action: {
            label: "Try again",
            onClick: () => deleteTicketById({ id: data.id }),
          },
        });
      },
    });

  const { mutate: updateTicketById } = api.ticket.updateTicketById.useMutation({
    onMutate: async() => {
      toast.success("Loading...", {
        description: "Your ticket is updating.",
      });
    },
    onSuccess: async () => {
      await utils.ticket.invalidate();

      toast.success("Success!", {
        description: "Your ticket has been updated successfully.",
      });
    },
    onError: (error) => {
      toast.error("There was a problem", {
        description: error.message,
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={data.status ?? ""}>
              {Object.keys(TicketStatus).map((status) => (
                <DropdownMenuRadioItem
                  onClick={() => {
                    updateTicketById({
                      id: data.id,
                      status: status as TicketStatus,
                    });
                  }}
                  key={status}
                  value={status}
                >
                  {status}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => {
            deleteTicketById({ id: data.id });
          }}
        >
          {isPending && <Loader2 className="mr-0.5 w-4 animate-spin" />} Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
