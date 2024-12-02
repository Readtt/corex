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
    <div className={cn("min-h-screen overflow-x-hidden", className)}>
      <Navbar session={session} isAdmin={isAdmin} />
      {isAdmin && <AdminNavbar />} 
      {/* TODO: OVERFLOW ISSUE  */}

      <div className={cn("flex flex-col overflow-x-hidden", {
        "h-[calc(100vh-56px)]": !isAdmin,
        "h-[calc(100vh-86px)]": isAdmin
      })}>
        <div className="flex w-full justify-center">{children}</div>
        {!disableFooter && <Footer />}
      </div>
    </div>
  );
}
