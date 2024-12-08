"use client";

import NavbarLogo from "@/app/_components/navbar/navbar-logo";
import { buttonVariants } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { type Session } from "@auth/core/types";
import Link from "next/link";
import { ModeToggle } from "../../../components/ui/mode-toggle";
import { NavbarAccountDropdown } from "./navbar-account-dropdown";
import { usePathname } from "next/navigation";

function NavbarItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        {
          "text-muted-foreground": pathname != href,
        },
        navigationMenuTriggerStyle,
        buttonVariants({
          variant: "ghost",
        }),
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

export default function NavbarMain({ session, isAdmin }: { session: Session | null, isAdmin: boolean }) {
  return (
    <>
      <div className="flex items-center gap-6">
        <NavbarLogo isAdmin={isAdmin} />
        <div className="flex items-center">
          <NavbarItem href="/">Home</NavbarItem>
          <NavbarItem href="/pricing">Pricing</NavbarItem>
          <NavbarItem href="/docs/getting-started">Docs</NavbarItem>
        </div>
      </div>
      <div className="flex gap-4">
        <ModeToggle />
        {session ? (
          <NavbarAccountDropdown session={session} />
        ) : (
          <Link
            className={cn(
              buttonVariants({
                variant: "default",
              }),
            )}
            href="/auth/signin"
          >
            Log in
          </Link>
        )}
      </div>
    </>
  );
}
