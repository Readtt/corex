import { auth } from "@/server/auth";

import { AccountForm } from "@/app/(authenticated)/settings/account-form";
import NavbarLayout from "@/app/_components/navbar/navbar-layout";
import { redirect } from "next/navigation";

import SidebarContent from "@/app/_components/sidebar/sidebar-content";
import SidebarLayout from "@/app/_components/sidebar/sidebar-layout";
import { CreditCard, User } from "lucide-react";
import { isUserAdminById } from "@/server/db/queries";

export const settingsNavItems = [
  {
    title: (
      <div className="flex flex-row">
        <User className="mr-2 h-4 w-4" />
        Account
      </div>
    ),
    href: "/settings",
  },
  {
    title: (
      <div className="flex flex-row">
        <CreditCard className="mr-2 h-4 w-4" />
        Billing
      </div>
    ),
    href: "/settings/billing",
  },
];

export default async function Page() {
  const session = await auth();

  if (!session) redirect("/");

  const isAdmin = await isUserAdminById(session.user.id)

  return (
    <NavbarLayout disableFooter={true} session={session} isAdmin={isAdmin}>
      <SidebarLayout
        sidebarItems={{ items: settingsNavItems }}
        title="Settings"
        description="Manage your account settings and set preferences."
      >
        <SidebarContent
          title="Account"
          description="Update your account settings."
        >
          <AccountForm session={session} />
        </SidebarContent>
      </SidebarLayout>
    </NavbarLayout>
  );
}
