"use client";

import { type Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ticketProblems, ticketSeverity } from "@/server/api/schemas";
import { TicketStatus } from "@prisma/client";
import { TicketsTableFacetedFilter } from "./tickets-table-faceted-filter";
import { TicketsTableViewOptions } from "./tickets-table-view-options";

interface TicketsTableToolbarProps<TData> {
  table: Table<TData>;
}

export function TicketsTableToolbar<TData>({
  table,
}: TicketsTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [inputValue, setInputValue] = useState(
    (table.getColumn("email")?.getFilterValue() as string) ?? ""
  );
  const [debouncedInputValue] = useDebounce(inputValue, 300); // 300ms debounce

  // Update filter when the debounced value changes
  useEffect(() => {
    if (debouncedInputValue) {
      table.getColumn("email")?.setFilterValue(debouncedInputValue);
    }
  }, [debouncedInputValue, table]);

  return (
    <div className="flex items-center justify-between overflow-x-auto">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter email..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("problem") && (
          <TicketsTableFacetedFilter
            column={table.getColumn("problem")}
            title="Problem"
            options={ticketProblems.map((t) => ({
              label: t,
              value: t,
            }))}
          />
        )}
        {table.getColumn("status") && (
          <TicketsTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={Object.keys(TicketStatus).map((t) => ({
              label: t,
              value: t,
            }))}
          />
        )}
        {table.getColumn("severity") && (
          <TicketsTableFacetedFilter
            column={table.getColumn("severity")}
            title="Severity"
            options={ticketSeverity.map((t) => ({
              label: t,
              value: t,
            }))}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <TicketsTableViewOptions table={table} />
    </div>
  );
}
