import NavbarLayout from "@/app/_components/navbar/navbar-layout";
import { auth } from "@/server/auth";
import { isUserAdminById } from "@/server/db/queries";
import { notFound, redirect } from "next/navigation";
import TicketsLayout from "./tickets-layout";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Tickets",
  robots: {
    index: false
  }
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");

  const isAdmin = await isUserAdminById(session.user.id);
  if (!isAdmin) {
    notFound();
  }

  return (
    <NavbarLayout disableFooter={true} session={session} isAdmin={isAdmin}>
      <div className="container flex flex-col py-12">
        <div className="mx-6">
          <TicketsLayout session={session} />
        </div>
      </div>
    </NavbarLayout>
  );
}
