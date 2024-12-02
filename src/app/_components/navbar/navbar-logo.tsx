"use client";

import config from "@/config";
import { Volleyball } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavbarLogo({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex cursor-pointer items-center gap-2"
    >
      <Volleyball />
      <span className="text-xl font-bold">
        {config.site.name}
        {isAdmin && <span className="text-sm font-medium ml-2">Admin</span>}
      </span>
    </div>
  );
}
