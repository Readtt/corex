import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function List({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function ListItem({
  children,
  number,
  className,
  description,
}: {
  children: ReactNode;
  number: number;
  className?: string;
  description?: string;
}) {
  return (
    <div className={cn("flex gap-4", className)}>
      <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-primary">
        {number}
      </span>
      <div
        className={cn("flex-start mb-2 flex h-min", {
          "flex-col": description,
        })}
      >
        <span className="font-medium">{children}</span>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
