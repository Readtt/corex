"use client";

import config from "@/config";
import { type getUserSubscriptionPlan } from "@/server/stripe";
import { type Session } from "next-auth";
import PricingCard from "./pricing-card";

export default function PricingCards({
  session,
  subscription,
}: {
  session: Session | null;
  subscription: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}) {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-stretch gap-6 lg:flex-row">
        {config.stripe.plans.length > 0 &&
          config.stripe.plans.map((plan, i) => {
            return (
              <PricingCard
                key={i}
                plan={plan}
                session={session}
                subscription={subscription}
              />
            );
          })}
      </div>
    </div>
  );
}
