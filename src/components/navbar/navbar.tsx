"use client";

import { type Session } from "@auth/core/types";
import NavbarMain from "./navbar-main";
import NavbarMobile from "./navbar-mobile";

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <section
      className={
        "sticky z-30 flex h-[56px] w-full items-center justify-center border-b bg-background/75 px-2 backdrop-blur-lg"
      }
    >
      <div className="container">
        <nav className="hidden justify-between sm:flex">
          <NavbarMain session={session} />
        </nav>
        <div className="block sm:hidden">
          <NavbarMobile session={session} />
        </div>
      </div>
    </section>
  );
}
