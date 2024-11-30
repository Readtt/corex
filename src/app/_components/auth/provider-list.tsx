"use client";

import AuthButton from "@/app/_components/auth/auth-button";
import { Avatar } from "@/components/ui/avatar";
import { type BuiltInProviderType } from "next-auth/providers";
import { getProviders, type LiteralUnion } from "next-auth/react";
import Image from "next/image";
import { type ClientSafeProvider } from "node_modules/next-auth/lib/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "../../../components/ui/skeleton";

export default function ProviderList() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders();
        setProviders(res);
      } catch {
        toast.error("There was a problem", {
          description: "Could not get available providers",
        });
      }
    };

    void fetchProviders();
  }, []);

  return (
    <div className="space-y-6">
      {/* <SigninForm />
      <div className="flex items-center">
        <Separator className="flex-1" />
        <span className="mx-4 text-xs font-medium text-muted-foreground">
          OR CONTINUE WITH
        </span>
        <Separator className="flex-1" />
      </div> */}
      {providers ? (
        Object.values(providers)
          .filter((p) => p.id !== "credentials")
          .map((provider) => (
            <AuthButton
              key={provider.id}
              action="signin"
              className="w-full"
              variant={"outline"}
              provider={provider.id}
              redirectTo="/"
            >
              Login with {provider.name}
              <Avatar className="mr-2 h-5 w-5 rounded-none">
                <Image
                  fill
                  src={
                    "https://authjs.dev/img/providers/" + provider.id + ".svg"
                  }
                  alt={provider.id}
                  referrerPolicy="no-referrer"
                />
              </Avatar>
            </AuthButton>
          ))
      ) : (
        <Skeleton className="h-9 w-full" />
      )}
    </div>
  );
}
