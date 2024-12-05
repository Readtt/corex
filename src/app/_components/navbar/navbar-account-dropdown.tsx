"use client";

import {
  Github,
  LifeBuoy,
  Loader2,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import config from "@/config";
import { type Session } from "@auth/core/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "../../../components/ui/avatar";

export function NavbarAccountDropdown({
  session,
}: {
  session: Session | null;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} className="h-8 w-8 rounded-full bg-zinc-500">
          <Avatar className="relative h-8 w-8">
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback>
              <User className="h-4 w-4 text-primary" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
        sideOffset={10}
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push("/settings");
            }}
          >
            <Settings />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            window.open(config.site.socialUrls.github, "_blank");
          }}
        >
          <Github />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            window.open(config.site.socialUrls.github + "/issues", "_blank");
          }}
        >
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            setIsLoading(true);
            await signOut();
          }}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <LogOut />}
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
