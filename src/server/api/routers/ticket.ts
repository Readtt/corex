import { DoNotCatchTRPCError } from "@/server/api/error";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { checkLastTicketWithinTimeframe, createTicket } from "@/server/db/queries";
import { TRPCError } from "@trpc/server";
import { ticketFormSchema } from "../schemas";

export const ticketRouter = createTRPCRouter({
  createTicket: protectedProcedure
    .input(ticketFormSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.email != ctx.session.user.email) {
          throw new DoNotCatchTRPCError({
            message: "You are not allowed to create a ticket for this email.",
            code: "BAD_REQUEST",
          });
        }

        const isTicketTooRecent = await checkLastTicketWithinTimeframe(input.email, 10);

        if (isTicketTooRecent) {
          throw new DoNotCatchTRPCError({
            message: "You cannot create a ticket within 10 minutes of your last one.",
            code: "BAD_REQUEST",
          });
        }

        return await createTicket({ ...input });
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem creating your ticket.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
