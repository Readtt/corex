"use client";

import { Loader2, type LucideIcon } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { type getUserSubscriptionPlan } from "@/server/stripe";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function StripeButton({
  children,
  action,
  subscription,
  planName,
  Icon,
  ...buttonProps
}: Readonly<
  {
    children: React.ReactNode;
    action: "new" | "manage" | "cancel";
    subscription: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
    planName: string;
    Icon?: LucideIcon;
  } & ButtonProps
>) {
  const { mutate: createStripeSession, isPending } =
    api.stripe.createStripeSession.useMutation({
      onError: (error) => {
        toast.error("There was a problem", {
          description: error.message,
        });
      },
      onSuccess: ({ url }) => {
        window.location.href = url;
      },
    });

  const { mutate: updateStripeSubscription, isPending: updatePending } =
    api.stripe.updateStripeSubscription.useMutation({
      onError: (error) => {
        toast.error("There was a problem", {
          description: error.message,
        });
      },
      onSuccess: ({ url }) => {
        window.location.href = url;
      },
    });

  const { mutate: manageStripeSubscription, isPending: managePending } =
    api.stripe.manageStripeSubscription.useMutation({
      onError: (error) => {
        toast.error("There was a problem", {
          description: error.message,
        });
      },
      onSuccess: ({ url }) => {
        window.location.href = url;
      },
    });

  const { mutate: cancelStripeSubscription, isPending: cancelPending } =
    api.stripe.cancelStripeSubscription.useMutation({
      onError: (error) => {
        toast.error("There was a problem", {
          description: error.message,
        });
      },
      onSuccess: ({ url }) => {
        window.location.href = url;
      },
    });

  return (
    <Button
      {...buttonProps}
      disabled={
        cancelPending ||
        managePending ||
        updatePending ||
        isPending ||
        buttonProps.disabled
      }
      onClick={() => {
        if (action == "cancel") {
          cancelStripeSubscription({
            plan: planName,
            backUrl: window.location.href,
          });
        } else if (action == "manage") {
          manageStripeSubscription({ backUrl: window.location.href });
        } else if (action == "new") {
          if (subscription.isSubscribed) {
            updateStripeSubscription({
              plan: planName,
              backUrl: window.location.href,
            });
          } else {
            createStripeSession({
              plan: planName,
              backUrl: window.location.href,
            });
          }
        }
      }}
    >
      {children}
      {cancelPending || managePending || updatePending || isPending ? (
        <Loader2 className="ml-0.5 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="ml-1.5 h-5 w-5" />
      )}
    </Button>
  );
}
