import { DoNotCatchTRPCError } from "@/server/api/error";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getUserById, updateUserById } from "@/server/db/queries";
import { TRPCError } from "@trpc/server";
import { accountFormSchema } from "../schemas";

export const userRouter = createTRPCRouter({
  updateName: protectedProcedure
    .input(accountFormSchema)
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
