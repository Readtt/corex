import { auth } from "@/server/auth";

import NavLayout from "@/app/_components/nav-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WaitlistForm from "./waitlist-form";

export default async function Page() {
  const session = await auth();

  return (
    <NavLayout session={session}>
      <div className="flex items-center">
        <Card className="w-[400px] shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Join the waitlist</CardTitle>
            <CardDescription>
              Enter your email address and we&apos;ll let you know when your
              spot is ready
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WaitlistForm />
          </CardContent>
        </Card>
      </div>
    </NavLayout>
  );
}
