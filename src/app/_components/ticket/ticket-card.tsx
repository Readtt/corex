"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TicketForm from "./ticket-form";
import { type Session } from "next-auth";

export default function TicketCard({ session }: { session: Session }) {
  return (
    <Card className="shadow-lg max-w-[600px] sm:w-full">
      <CardHeader>
        <CardTitle>Submit a case to our Customer Support Team</CardTitle>
      </CardHeader>
      <CardContent>
        <TicketForm session={session} />
      </CardContent>
    </Card>
  );
}
