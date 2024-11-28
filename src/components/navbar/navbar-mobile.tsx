"use client";

import AuthButton from "@/components/auth/auth-button";
import NavbarLogo from "@/components/navbar/navbar-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { type Session } from "@auth/core/types";
import {
  CreditCard,
  Github,
  LifeBuoy,
  Menu,
  Settings
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "../ui/mode-toggle";
import config from "@/config";

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
      href={href}
      className={cn("font-semibold", {
        "text-muted-foreground": pathname != href,
      })}
    >
      {children}
    </Link>
  );
}

function NavbarDropdownItem({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      onClick={
        href
          ? () => {
              router.push(href);
            }
          : onClick
      }
      className={cn("justify-start text-muted-foreground", {
        "bg-muted text-foreground hover:bg-muted": pathname === href,
      })}
      variant={"ghost"}
    >
      {children}
    </Button>
  );
}

export default function NavbarMobile({ session }: { session: Session | null }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-row gap-4">
        <NavbarLogo />
        <ModeToggle />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              <NavbarLogo />
            </SheetTitle>
          </SheetHeader>
          <div className="my-8 flex flex-col gap-4">
            <NavbarItem href="/">Home</NavbarItem>
          </div>
          <div className="border-t pt-4">
            {session && (
              <div className="grid grid-cols-2 justify-start gap-2">
                <NavbarDropdownItem href="/billing">
                  <CreditCard />
                  <span>Billing</span>
                </NavbarDropdownItem>

                <NavbarDropdownItem href="/settings">
                  <Settings />
                  <span>Settings</span>
                </NavbarDropdownItem>

                <NavbarDropdownItem
                  onClick={() => {
                    window.open(config.site.socialUrls.github, "_blank");
                  }}
                >
                  <Github />
                  <span>GitHub</span>
                </NavbarDropdownItem>

                <NavbarDropdownItem
                  onClick={() => {
                    window.open(config.site.socialUrls.github, "_blank");
                  }}
                >
                  <LifeBuoy />
                  <span>Support</span>
                </NavbarDropdownItem>
              </div>
            )}
            <div className="mt-2 flex flex-col gap-3">
              {session ? (
                <AuthButton action="signout" variant={"destructive"}>
                  Sign out
                </AuthButton>
              ) : (
                <>
                  <a
                    className={cn(
                      buttonVariants({
                        variant: "default",
                      }),
                    )}
                    href="/auth/signin"
                  >
                    Log in
                  </a>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
