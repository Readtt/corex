"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import config from "@/config";
import { type getUserSubscriptionPlan } from "@/server/stripe";
import StripeButton from "../stripe/stripe-button";

const plans = config.stripe.plans;

export default function BillingCard({
  subscription,
}: {
  subscription: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}) {
  const nextSubscription =
    plans[plans.findIndex((e) => e.name == subscription.plan?.name) + 1];

  const nextPlan =
    nextSubscription == undefined
      ? subscription.plan?.name
      : nextSubscription?.name;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Subscription Details
        </CardTitle>
        <CardDescription>
          You are on the{" "}
          <span className="font-semibold text-card-foreground">
            {subscription.plan?.name}
          </span>{" "}
          plan
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-end space-y-2">
        <div className="flex justify-end space-x-2">
          {subscription.isSubscribed && (
            <StripeButton
              variant={"outline"}
              action="manage"
              subscription={subscription}
              planName={""}
            >
              Manage subscription
            </StripeButton>
          )}
          {nextSubscription && nextPlan && (
            <StripeButton
              action="new"
              subscription={subscription}
              planName={nextPlan}
            >
              Upgrade to {nextSubscription.name}
            </StripeButton>
          )}
        </div>
        <div>
          {subscription.isSubscribed && (
            <p className="text-xs text-muted-foreground">
              {subscription.isCanceled
                ? "Your plan ends on "
                : "Your plan renews on "}
              {subscription.stripeCurrentPeriodEnd
                ? new Date(
                    subscription.stripeCurrentPeriodEnd,
                  ).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
              .
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
