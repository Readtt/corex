import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { DoNotCatchTRPCError } from "@/server/api/error";

export const waitlistRouter = createTRPCRouter({
  addEmail: publicProcedure
    .input(z.object({ email: z.string().email() })) // Validate email format
    .mutation(async ({ ctx, input }) => {
      try {
        const existingEmail = await ctx.db.waitlist.findUnique({
          where: { email: input.email },
        });

        if (existingEmail) {
          throw new DoNotCatchTRPCError({
            message: "Your email is already on the waitlist.",
            code: "BAD_REQUEST",
          });
        }

        const newWaitlistEntry = await ctx.db.waitlist.create({
          data: {
            email: input.email,
          },
        });

        return newWaitlistEntry;
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
