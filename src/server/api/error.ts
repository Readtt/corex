import { TRPCError } from "@trpc/server";
import type { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";

export class DoNotCatchTRPCError extends TRPCError {
  constructor({
    message,
    code,
  }: {
    message: string;
    code: TRPC_ERROR_CODE_KEY;
  }) {
    super({
      message: message,
      code: code,
    });
    this.name = "DoNotCatchTRPCError";
  }
}
