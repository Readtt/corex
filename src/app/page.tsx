import { auth } from "@/server/auth";
import NavbarLayout from "./_components/navbar/navbar-layout";

import { getUserSubscriptionPlan } from "@/server/stripe";
import FAQLayout from "./_components/faq/faq-layout";
import FeaturesLayout from "./_components/features/features-layout";
import HeroLayout from "./_components/hero/hero-layout";
import PricingLayout from "./_components/pricing/pricing-layout";
import StatsLayout from "./_components/stats/stats-layout";
import WaitlistLayout from "./_components/waitlist/waitlist-layout";

// https://github.com/shadcn-ui/ui/tree/main/apps/www/app/(app)/examples
// https://awesome-shadcn-ui.vercel.app/
// TODO: Add ticket
// TODO: Add email support
// TODO: add error component
// TODO: Add SST help

export default async function Page() {
  const session = await auth();
  const subscription = await getUserSubscriptionPlan(session?.user.id);

  return (
    <NavbarLayout session={session}>
      <div className="container mx-6 space-y-64 py-32">
        <section>
          <HeroLayout session={session} />
        </section>
        <section>
          <StatsLayout />
        </section>
        <section>
          <FeaturesLayout />
        </section>
        <section>
          <PricingLayout session={session} subscription={subscription} />
        </section>
        <section>
          <WaitlistLayout />
        </section>
        <section>
          <FAQLayout />
        </section>
      </div>
    </NavbarLayout>
  );
}
