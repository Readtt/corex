"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  return (
    <div className="flex h-[30px] w-full justify-center bg-secondary/75 backdrop-blur-lg">
      <div className="container flex flex-row items-center">
        <Button
          variant={"link"}
          onClick={() => {
            router.push("/tickets");
          }}
        >
          Manage Tickets
        </Button>
      </div>
    </div>
  );
}
