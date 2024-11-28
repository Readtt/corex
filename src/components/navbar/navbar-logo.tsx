"use client";

import config from "@/config";
import { Volleyball } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavbarLogo() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex cursor-pointer items-center gap-2"
    >
      <Volleyball />
      <span className="text-xl font-bold">{config.site.name}</span>
    </div>
  );
}
