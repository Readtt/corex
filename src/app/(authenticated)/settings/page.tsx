import { auth } from "@/server/auth";

import { AccountForm } from "@/app/(authenticated)/settings/account-form";
import NavLayout from "@/app/_components/nav-layout";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/(authenticated)/settings/components/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Account",
    href: "/settings",
  },
];

export default async function Page() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <NavLayout session={session}>
      <div className="container mx-4">
        <div className="my-10 space-y-6 px-4 py-6">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">
              {" "}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your account settings.
                  </p>
                </div>
                <Separator />
                <AccountForm session={session} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavLayout>
  );
}
