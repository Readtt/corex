"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import WaitlistForm from "./waitlist-form";

export default function WaitlistCard() {
  return (
    <Card className="max-w-[400px] md:w-full shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>Join the waitlist</CardTitle>
        <CardDescription> 
          Enter your email address and we&apos;ll let you know when your spot is
          ready
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WaitlistForm />
      </CardContent>
    </Card>
  );
}
