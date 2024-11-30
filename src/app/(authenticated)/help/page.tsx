import NavbarLayout from "@/app/_components/navbar/navbar-layout";
import TicketLayout from "@/app/_components/ticket/ticket-layout";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <NavbarLayout disableFooter={true} session={session}>
      <div className="container mx-6 py-12">
        <TicketLayout session={session} />
      </div>
    </NavbarLayout>
  );
}
