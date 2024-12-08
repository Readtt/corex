"use client";

import Footer from "@/app/_components/footer/footer";
import Navbar from "@/app/_components/navbar/navbar";
import { cn } from "@/lib/utils";
import { type Session } from "next-auth";
import AdminNavbar from "./admin-navbar";

export default function NavbarLayout({
  session,
  children,
  className,
  disableFooter,
  isAdmin,
}: {
  session: Session | null;
  children: React.ReactNode;
  className?: string;
  disableFooter?: boolean;
  isAdmin: boolean;
}) {
  return (
    <div className={cn("min-h-screen", className)}>
      <div className="sticky top-0 z-50">
        <Navbar session={session} isAdmin={isAdmin} />
        {isAdmin && <AdminNavbar />}
      </div>
      <div className={cn("flex flex-col overflow-x-hidden")}>
        <div className="flex w-full justify-center">{children}</div>
        {!disableFooter && <Footer />}
      </div>
    </div>
  );
}
