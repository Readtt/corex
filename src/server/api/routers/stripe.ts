import config from "@/config";
import { createTRPCRouter } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { getBaseUrl } from "@/lib/utils";
import { protectedProcedure } from "@/server/api/trpc";
import { getUserSubscriptionPlan, stripe } from "@/server/stripe";
import { DoNotCatchTRPCError } from "../error";
import { env } from "@/env";

const planNames = config.stripe.plans
  .filter(
    (plan) =>
      config.stripe.plans[0] && plan.name != config.stripe.plans[0].name,
  )
  .map((plan) => plan.name);
const planSchema = z.enum(planNames as [string, ...string[]]);
const billingUrl = getBaseUrl() + "/settings/billing";

export const stripeRouter = createTRPCRouter({
  cancelStripeSubscription: protectedProcedure
    .input(
      z.object({
        plan: planSchema,
        backUrl: z.string()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const subscriptionPlan = await getUserSubscriptionPlan(
          ctx.session.user.id,
        );

        const plan = config.stripe.plans.find(
          (plan) => plan.name === input.plan,
        )?.price.priceIds;

        if (
          subscriptionPlan.isSubscribed &&
          subscriptionPlan.user?.stripeCustomerId &&
          subscriptionPlan.stripeSubscriptionId &&
          plan
        ) {
          const stripeSession = await stripe.billingPortal.sessions.create({
            customer: subscriptionPlan.user.stripeCustomerId,
            flow_data: {
              type: "subscription_cancel",
              subscription_cancel: {
                subscription: subscriptionPlan.stripeSubscriptionId,
              },
            },

            return_url: input.backUrl,
          });

          if(!stripeSession.url) {
            throw new DoNotCatchTRPCError({
              code: "BAD_REQUEST",
              message: "Invalid Stripe URL",
            });
          }

          return {
            url: stripeSession.url,
          };
        } else {
          throw new DoNotCatchTRPCError({
            code: "BAD_REQUEST",
            message: "User is not subscribed to any plan",
          });
        }
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem trying to cancel your subscription.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  manageStripeSubscription: protectedProcedure    .input(
    z.object({
      backUrl: z.string()
    }),
  ).mutation(async ({ ctx, input }) => {
    try {
      const subscriptionPlan = await getUserSubscriptionPlan(
        ctx.session.user.id,
      );

      if (
        subscriptionPlan.isSubscribed &&
        subscriptionPlan.user?.stripeCustomerId
      ) {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: subscriptionPlan.user.stripeCustomerId,
          return_url: input.backUrl,
        });

        if(!stripeSession.url) {
          throw new DoNotCatchTRPCError({
            code: "BAD_REQUEST",
            message: "Invalid Stripe URL",
          });
        }

        return {
          url: stripeSession.url,
        };
      } else {
        throw new DoNotCatchTRPCError({
          code: "BAD_REQUEST",
          message: "User is not subscribed to any plan",
        });
      }
    } catch (error) {
      if (error instanceof DoNotCatchTRPCError) {
        throw error;
      }

      throw new TRPCError({
        message: "There was a problem trying to manage your subscription.",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),
  updateStripeSubscription: protectedProcedure
    .input(
      z.object({
        plan: planSchema,
        backUrl: z.string()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const subscriptionPlan = await getUserSubscriptionPlan(
          ctx.session.user.id,
        );
        const plan = config.stripe.plans.find(
          (plan) => plan.name === input.plan,
        )?.price.priceIds;

        if (
          subscriptionPlan.isSubscribed &&
          subscriptionPlan.user?.stripeCustomerId &&
          subscriptionPlan.stripeSubscriptionId &&
          plan
        ) {
          const planPriceId =
            env.NODE_ENV === "production" ? plan.production : plan.test;
          const subscriptions = await stripe.subscriptions.retrieve(
            subscriptionPlan.stripeSubscriptionId,
          );
          const id = subscriptions.items.data[0]?.id;

          if (!id) {
            throw new DoNotCatchTRPCError({
              code: "BAD_REQUEST",
              message:
                "Unable to retrieve subscription details. The subscription ID is invalid.",
            });
          }

          const stripeSession = await stripe.billingPortal.sessions.create({
            customer: subscriptionPlan.user.stripeCustomerId,
            flow_data: {
              type: "subscription_update_confirm",
              subscription_update_confirm: {
                items: [
                  {
                    id,
                    price: planPriceId,
                  },
                ],
                subscription: subscriptionPlan.stripeSubscriptionId,
              },
            },
            return_url: input.backUrl,
          });

          if(!stripeSession.url) {
            throw new DoNotCatchTRPCError({
              code: "BAD_REQUEST",
              message: "Invalid Stripe URL",
            });
          }

          return {
            url: stripeSession.url,
          };
        } else {
          throw new DoNotCatchTRPCError({
            code: "BAD_REQUEST",
            message: "User is not subscribed to any plan",
          });
        }
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem trying to update your subscription.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
  createStripeSession: protectedProcedure
    .input(
      z.object({
        plan: planSchema,
        backUrl: z.string()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const subscriptionPlan = await getUserSubscriptionPlan(
          ctx.session.user.id,
        );
        
        if (
          subscriptionPlan.isSubscribed &&
          subscriptionPlan.user?.stripeCustomerId
        ) {
          const stripeSession = await stripe.billingPortal.sessions.create({
            customer: subscriptionPlan.user.stripeCustomerId,
            return_url: input.backUrl,
          });

          return {
            url: stripeSession.url,
          };
        }

        const plan = config.stripe.plans.find(
          (plan) => plan.name === input.plan,
        )?.price.priceIds;
        if (!plan)
          throw new DoNotCatchTRPCError({
            code: "NOT_FOUND",
            message: "Plan not found",
          });

        const stripeSession = await stripe.checkout.sessions.create({
          success_url: billingUrl,
          cancel_url: input.backUrl,
          payment_method_types: ["card"],
          mode: "subscription",
          billing_address_collection: "auto",
          line_items: [
            {
              price:
                env.NODE_ENV === "production"
                  ? plan.production
                  : plan.test,
              quantity: 1,
            },
          ],
          metadata: {
            userId: ctx.session.user.id,
          },
        });

        if(!stripeSession.url) {
          throw new DoNotCatchTRPCError({
            code: "BAD_REQUEST",
            message: "Invalid Stripe URL",
          });
        }

        return {
          url: stripeSession.url,
        };
      } catch (error) {
        if (error instanceof DoNotCatchTRPCError) {
          throw error;
        }

        throw new TRPCError({
          message: "There was a problem trying to create your session.",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
