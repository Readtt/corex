import { z } from "zod";

import { DoNotCatchTRPCError } from "@/server/api/error";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createWaitlist, getWaitlistByEmail } from "@/server/db/queries";
import { TRPCError } from "@trpc/server";

export const waitlistRouter = createTRPCRouter({
  addEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      try {
        const existingEmail = await getWaitlistByEmail(input.email);
        if (existingEmail) {
          throw new DoNotCatchTRPCError({
            message: "Your email is already on the waitlist.",
            code: "BAD_REQUEST",
          });
        }

        return await createWaitlist(input.email);
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem adding you to the waitlist.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
