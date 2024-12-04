import { DoNotCatchTRPCError } from "@/server/api/error";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  checkLastTicketWithinTimeframe,
  createTicket,
  deleteTicketById,
  getRecentTickets,
  getRecentTicketsWithPagination,
  getTicketById,
  getTicketCount,
  getTicketCountLastMonths,
  updateTicketById,
} from "@/server/db/queries";
import { Prisma, TicketStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
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

        const isTicketTooRecent = await checkLastTicketWithinTimeframe(
          input.email,
          10,
        );

        if (isTicketTooRecent) {
          throw new DoNotCatchTRPCError({
            message:
              "You cannot create a ticket within 10 minutes of your last one.",
            code: "BAD_REQUEST",
          });
        }

        return await createTicket({ ...input, status: TicketStatus.OPEN });
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
  getTicketCount: adminProcedure
    .input(
      z.object({
        sinceInMinutes: z.number().optional(),
        statuses: z.array(z.nativeEnum(TicketStatus)).optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await getTicketCount(input);
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem getting the ticket count.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  getTicketCountLastMonths: adminProcedure
    .input(
      z.object({
        monthsAgo: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        // Default to 1 month if monthsAgo is not provided
        const monthsAgo = input.monthsAgo ?? 1;
        return await getTicketCountLastMonths(monthsAgo);
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error; // Re-throw TRPC error if it occurs
        }

        throw new TRPCError({
          message: "There was a problem retrieving ticket counts.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  getRecentTicketsWithPagination: adminProcedure
    .input(
      z.object({
        page: z.number().optional(),
        pageSize: z.number().optional(),
        filters: z
          .array(
            z.tuple([
              z.enum(
                Object.keys(Prisma.TicketScalarFieldEnum) as [
                  keyof Prisma.TicketWhereInput,
                ],
              ),
              z.array(z.any()).or(z.any()),
            ]),
          )
          .optional(),
        order: z
          .array(
            z.tuple([
              z.enum(
                Object.keys(Prisma.TicketScalarFieldEnum) as [
                  keyof Prisma.TicketWhereInput,
                ],
              ),
              z.nativeEnum(Prisma.SortOrder),
            ]),
          )
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await getRecentTicketsWithPagination({ ...input });
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem getting tickets.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  getRecentTickets: adminProcedure
    .input(
      z.object({
        count: z.number().optional(),
        statuses: z.array(z.nativeEnum(TicketStatus)).optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await getRecentTickets(input);
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem getting recent tickets.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  deleteTicketById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        return await deleteTicketById(input.id);
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem deleting the ticket.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  updateTicketById: adminProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(TicketStatus).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { id, ...data } = input;
        return await updateTicketById(id, data);
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem deleting the ticket.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  getTicketById: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await getTicketById(input.id);
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem deleting the ticket.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
