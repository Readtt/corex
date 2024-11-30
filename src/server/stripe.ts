import config from "@/config";
import { env } from "@/env";
import Stripe from "stripe";
import { getUserById } from "./db/queries";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export async function getUserSubscriptionPlan(userId?: string) {
  const PLANS = config.stripe.plans;
  const freePlan = PLANS.find((p) => p.isFree);

  const defaultSubscriptionPlan = {
    user: null,
    plan: freePlan,
    isSubscribed: false,
    isCanceled: false,
    stripeCurrentPeriodEnd: null,
    stripeSubscriptionId: null,
  };

  if (!userId) {
    return defaultSubscriptionPlan;
  }

  const dbUser = await getUserById(userId);
  if (!dbUser) {
    return defaultSubscriptionPlan;
  }

  const isSubscribed = Boolean(
    dbUser.stripePriceId &&
      dbUser.stripeCurrentPeriodEnd instanceof Date &&
      dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now(),
  );

  const plan = isSubscribed
    ? PLANS.find(
        (plan) =>
          (process.env.NODE_ENV === "production"
            ? plan.price.priceIds.production
            : plan.price.priceIds.test) === dbUser.stripePriceId,
      )
    : freePlan;

  let isCanceled = false;
  if (isSubscribed && dbUser.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      dbUser.stripeSubscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    user: dbUser,
    plan,
    stripeSubscriptionId: dbUser.stripeSubscriptionId,
    stripeCurrentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
    stripeCustomerId: dbUser.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
}
