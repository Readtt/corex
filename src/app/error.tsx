"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={"mx-2 flex items-center justify-center py-48"}>
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="text-primary-500 text-5xl font-bold">500</div>
          <div className="mt-5 text-sm md:text-xl lg:text-2xl">
            The page you were on has experienced an error.
          </div>
          <div className="lg:text-md mt-1 text-xs text-muted-foreground md:text-sm">
            Open a{" "}
            <a className="text-background-foreground underline" href="/help">
              ticket
            </a>{" "}
            if this is an unexpected error.
          </div>
          <Button className="mt-6" onClick={() => reset()}>
            Try again <RefreshCcw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
