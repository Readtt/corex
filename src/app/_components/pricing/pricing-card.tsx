"use client";

import StripeButton from "@/app/_components/stripe/stripe-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Feature, type StripePlan } from "@/config";
import { cn } from "@/lib/utils";
import { type getUserSubscriptionPlan } from "@/server/stripe/client";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";

function FeatureItem({ feature }: { feature: Feature }) {
  return (
    <li
      className={cn("flex items-center gap-2", {
        "font-medium text-primary": !feature.negative,
      })}
    >
      {feature.negative ? (
        <Minus className="size-4" />
      ) : (
        <Check className="size-4" />
      )}
      <span>{feature.text}</span>
      {feature.footnote && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="size-4" />
            </TooltipTrigger>
            <TooltipContent>{feature.footnote}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </li>
  );
}

function PricingCardButton({
  plan,
  session,
  subscription,
}: {
  plan: StripePlan;
  session: Session | null;
  subscription: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}) {
  const router = useRouter();
  const isCurrentPlan = plan.name == subscription.plan?.name && !plan.isFree;

  if (!session) {
    return (
      <Button
        onClick={() => {
          router.push("/auth/signin");
        }}
      >
        Sign up <ArrowRight className="ml-1.5 h-5 w-5" />
      </Button>
    );
  }

  if (!isCurrentPlan && !plan.isFree) {
    return (
      <StripeButton
        subscription={subscription}
        action="new"
        planName={plan.name}
        Icon={ArrowRight}
      >
        Upgrade now
      </StripeButton>
    );
  }

  if (!subscription.isCanceled && isCurrentPlan) {
    return (
      <StripeButton
        subscription={subscription}
        action="cancel"
        variant={"outline"}
        planName={plan.name}
      >
        Cancel
      </StripeButton>
    );
  }

  if (subscription.isCanceled && isCurrentPlan) {
    return (
      <StripeButton
        subscription={subscription}
        action="manage"
        variant={"outline"}
        planName={plan.name}
      >
        Renew
      </StripeButton>
    );
  }
}

export default function PricingCard({
  plan,
  session,
  subscription,
}: {
  plan: StripePlan;
  session: Session | null;
  subscription: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}) {
  return (
    <div className="flex w-full flex-col rounded-lg border p-6 text-left">
      <Badge className="mb-8 block w-fit">{plan.name.toUpperCase()}</Badge>
      <span className="text-4xl font-medium">
        ${plan.price.amount.toLocaleString()}
      </span>
      <p className={cn("text-muted-foreground")}>{plan.price.frequency}</p>
      <Separator className="my-6" />
      <div className="flex flex-col justify-between gap-20">
        <ul className="space-y-4 text-muted-foreground">
          {plan.features.map((feature, i) => (
            <FeatureItem key={i} feature={feature} />
          ))}
        </ul>
        <PricingCardButton
          plan={plan}
          session={session}
          subscription={subscription}
        />
      </div>
    </div>
  );
}
