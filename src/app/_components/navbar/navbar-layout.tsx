"use client"

import { type Session } from "next-auth";
import Navbar from "@/app/_components/navbar/navbar";
import { cn } from "@/lib/utils";
import Footer from "@/app/_components/footer/footer";

export default function NavbarLayout({
  session,
  children,
  className,
  disableFooter,
}: {
  session: Session | null;
  children: React.ReactNode;
  className?: string;
  disableFooter?: boolean;
}) {
  return (
    <div className={cn("min-h-screen", className)}>
      <Navbar session={session} />
      <div className={"flex h-[calc(100vh-56px)] flex-col overflow-x-hidden"}>
        <div className="flex w-full justify-center">{children}</div>
        {!disableFooter && <Footer />}
      </div>
    </div>
  );
}
