import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import NavbarLayout from "./_components/navbar/navbar-layout";
import { auth } from "@/server/auth";
import { isUserAdminById } from "@/server/db/queries";
import { cn } from "@/lib/utils";

export default async function notFound() {
  const session = await auth();
  const isAdmin = session?.user.id ? (await isUserAdminById(session.user.id)) : false;

  return (
    <NavbarLayout session={session} isAdmin={isAdmin}>
      <div className={cn("mx-2 flex items-center justify-center py-48", {
        "h-[calc(100vh-56px)]": !isAdmin,
        "h-[calc(100vh-86px)]": isAdmin
      })}>
        <div className="flex flex-col">
          <div className="flex flex-col items-center">
            <div className="text-primary-500 text-5xl font-bold">404</div>
            <div className="mt-5 text-sm md:text-xl lg:text-2xl">
              The page you are looking for could not be found.
            </div>
            <div className="lg:text-md mt-1 text-xs text-muted-foreground md:text-sm">
              Open a{" "}
              <a className="text-background-foreground underline" href="/help">
                ticket
              </a>{" "}
              if this is an unexpected error.
            </div>
            <Button className="mt-6">
              <Link className="flex" href="/">
                <ChevronLeft className="mr-1.5 h-5 w-5" /> Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
}
