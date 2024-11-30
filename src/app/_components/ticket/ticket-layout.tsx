"use client";

import { type Session } from "next-auth";
import TicketCard from "./ticket-card";

export default function TicketLayout({ session }: { session: Session }) {
  return (
    <div className="container flex justify-center">
      <TicketCard session={session} />
    </div>
  );
}
