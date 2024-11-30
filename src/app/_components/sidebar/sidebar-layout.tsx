import { Separator } from "@/components/ui/separator";
import { type ReactNode } from "react";
import { SidebarNav, type SidebarNavProps } from "./sidebar-nav";

export default function SidebarLayout({
  sidebarItems,
  title,
  description,
  children,
}: {
  sidebarItems: SidebarNavProps;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="container mx-4">
      <div className="my-10 space-y-6 px-4 py-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav {...sidebarItems} />
          </aside>
          {children}
        </div>
      </div>
    </div>
  );
}
