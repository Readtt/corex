"use client";

import { type BuiltInProviderType } from "next-auth/providers";
import { signIn, signOut, type LiteralUnion } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useState } from "react";

export default function AuthButton({
  children,
  provider,
  redirectTo,
  action,
  ...buttonProps
}: Readonly<
  {
    children: React.ReactNode;
    provider?: LiteralUnion<BuiltInProviderType>;
    redirectTo?: string;
    action: "signout" | "signin";
  } & ButtonProps
>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Button
      {...buttonProps}
      disabled={isLoading || buttonProps.disabled}
      onClick={async () => {
        setIsLoading(true);
        if (action == "signin") {
          await signIn(provider, { redirectTo });
        } else if (action == "signout") {
          await signOut();
        }
      }}
    >
      {isLoading && <Loader2 className="mr-0.5 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
