import { auth } from "@/server/auth";

import NavbarLayout from "@/app/_components/navbar/navbar-layout";
import { redirect } from "next/navigation";

import BillingCard from "@/app/_components/billing/billing-card";
import SidebarContent from "@/app/_components/sidebar/sidebar-content";
import SidebarLayout from "@/app/_components/sidebar/sidebar-layout";
import { isUserAdminById } from "@/server/db/queries";
import { getUserSubscriptionPlan } from "@/server/stripe";
import { type Metadata } from "next";
import { settingsNavItems } from "../nav-items";

export const metadata: Metadata = {
  robots: {
    index: false
  }
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const subscription = await getUserSubscriptionPlan(session.user.id);
  const isAdmin = await isUserAdminById(session.user.id)

  return (
    <NavbarLayout disableFooter={true} session={session} isAdmin={isAdmin}>
      <SidebarLayout
        sidebarItems={{ items: settingsNavItems }}
        title="Settings"
        description="Manage your account settings and set preferences."
      >
        <SidebarContent
          title="Billing"
          description="Update your billing settings."
        >
          <BillingCard subscription={subscription} />
        </SidebarContent>
      </SidebarLayout>
    </NavbarLayout>
  );
}
