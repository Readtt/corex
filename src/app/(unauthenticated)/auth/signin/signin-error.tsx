"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function SigninError() {
  const params = useSearchParams();
  const error = params.get("error");
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (!hasExecuted.current && error) {
      toast.error("There was a problem", { description: error });
      hasExecuted.current = true;
    }
  }, [error]);

  return null;
}
