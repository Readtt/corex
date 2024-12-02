"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();
  
  return (
    <div className="flex w-full justify-center bg-secondary h-[30px]">
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
