import { DoNotCatchTRPCError } from "@/server/api/error";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getUserById, updateUserById } from "@/server/db/queries";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  updateName: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(2, {
            message: "Name must be at least 2 characters.",
          })
          .max(30, {
            message: "Name must not be longer than 30 characters.",
          })
          .regex(/^[a-zA-Z\s]+$/, {
            message:
              "Name must only contain alphabetic characters and spaces (no numbers or special characters).",
          }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        const existingUser = await getUserById(userId);
        if (!existingUser) {
          throw new DoNotCatchTRPCError({
            message: "No user was found.",
            code: "BAD_REQUEST",
          });
        }

        return await updateUserById(userId, { name: input.name });
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem updating your name.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
