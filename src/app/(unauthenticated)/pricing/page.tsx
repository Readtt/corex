import NavbarLayout from "@/app/_components/navbar/navbar-layout";
import PricingLayout from "@/app/_components/pricing/pricing-layout";
import { auth } from "@/server/auth";
import { getUserSubscriptionPlan } from "@/server/stripe/client";

export default async function Page() {
  const session = await auth();
  const subscription = await getUserSubscriptionPlan(session?.user.id);

  return (
    <NavbarLayout session={session}>
      <div className="container mx-6 py-32">
        <PricingLayout session={session} subscription={subscription} />
      </div>
    </NavbarLayout>
  );
}
