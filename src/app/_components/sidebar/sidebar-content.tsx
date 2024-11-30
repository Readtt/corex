import { Separator } from "@/components/ui/separator";
import { type ReactNode } from "react";

export interface SidebarContentProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function SidebarContent({
  title,
  description,
  children,
}: SidebarContentProps) {
  return (
    <div className="flex-1 lg:max-w-2xl">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Separator />
        {children}
      </div>
    </div>
  );
}
