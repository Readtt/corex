"use client"

import { type getUserSubscriptionPlan } from "@/server/stripe";
import { type Session } from "next-auth";
import PricingCards from "./pricing-cards";

export default function PricingLayout({
  session,
  subscription,
}: {
  session: Session | null;
  subscription: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}) {
  return (
    <div className="container mx-auto flex max-w-screen-xl flex-col gap-6">
      <h2 className="text-pretty text-4xl font-bold lg:text-6xl">Pricing</h2>

      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <p className="max-w-screen-md text-muted-foreground lg:text-xl">
          At CoreX, we believe in providing straightforward pricing that works
          for businesses of all sizes. Whether you’re a startup or an
          enterprise, we offer flexible plans to scale with your needs. Choose
          the plan that suits your requirements, and let’s grow together.
        </p>
      </div>
      <PricingCards session={session} subscription={subscription} />
    </div>
  );
}
