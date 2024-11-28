import {
  CreditCard,
  Github,
  LifeBuoy,
  Loader2,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { AvatarFallback } from "@/components/ui/avatar";
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
import { type Session } from "@auth/core/types";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "../ui/avatar";

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
        <Button className="aspect-square h-8 w-8 rounded-full bg-slate-400">
          <Avatar className="relative h-8 w-8">
            {session?.user?.image ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  loader={() => session.user?.image ?? ""}
                  src={session?.user?.image}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className="sr-only">{session?.user?.name}</span>
                <User className="h-4 w-4 text-zinc-600" />
              </AvatarFallback>
            )}
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
          <DropdownMenuItem>
            <CreditCard />
            <span>Billing</span>
          </DropdownMenuItem>
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
            window.open("https://github.com/Readtt/corex", "_blank");
          }}
        >
          <Github />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            window.open("https://github.com/Readtt/corex/issues", "_blank");
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
