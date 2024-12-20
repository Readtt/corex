"use client";

import { type Session } from "@auth/core/types";
import NavbarMain from "./navbar-main";
import NavbarMobile from "./navbar-mobile";

export default function Navbar({ session, isAdmin }: { session: Session | null, isAdmin: boolean }) {
  return (
    <section
      className={
        "flex h-[56px] w-full items-center justify-center border-b bg-background/75 px-6 backdrop-blur-lg"
      }
    >
      <div className="container">
        <nav className="hidden justify-between sm:flex">
          <NavbarMain session={session} isAdmin={isAdmin} />
        </nav>
        <div className="block sm:hidden">
          <NavbarMobile session={session} isAdmin={isAdmin} />
        </div>
      </div>
    </section>
  );
}
