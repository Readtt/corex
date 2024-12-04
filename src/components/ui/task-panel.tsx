import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ReactNode } from "react";

interface TaskPanelItemProps {
  label: string;
  tooltip?: string;
  children: ReactNode;
}

export function TaskPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}) {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>;
}

export function TaskPanelItem({
  label,
  children,
  tooltip,
}: TaskPanelItemProps) {
  return (
    <div className="flex flex-row items-center gap-6">
      <Tooltip>
        <TooltipTrigger className="w-28 text-start">
          <span className="text-xs">{label}</span>
        </TooltipTrigger>
        {tooltip && <TooltipContent className="w-32">{tooltip}</TooltipContent>}
      </Tooltip>
      <div>{children}</div>
    </div>
  );
}
