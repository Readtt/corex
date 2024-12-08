import { auth } from "@/server/auth";
import NavbarLayout from "./_components/navbar/navbar-layout";

import { getUserSubscriptionPlan } from "@/server/stripe";
import FAQLayout from "./_components/faq/faq-layout";
import FeaturesLayout from "./_components/features/features-layout";
import HeroLayout from "./_components/hero/hero-layout";
import PricingLayout from "./_components/pricing/pricing-layout";
import StatsLayout from "./_components/stats/stats-layout";
import WaitlistLayout from "./_components/waitlist/waitlist-layout";
import { isUserAdminById } from "@/server/db/queries";

// https://github.com/shadcn-ui/ui/tree/main/apps/www/app/(app)/examples
// https://github.com/vercel/ai-chatbot
// https://awesome-shadcn-ui.vercel.app/
// https://www.youtube.com/watch?v=_KhrGFV_Npw
// https://github.com/opennextjs/opennextjs-aws/issues/385
// https://www.youtube.com/watch?v=1OqMQPx8Jno
// TODO: Add email support later
// TODO: add rate limiting
// TODO: add documentation
// TODO: add custom domains

export default async function Page() {
  const session = await auth();
  const subscription = await getUserSubscriptionPlan(session?.user.id);
  const isAdmin = session?.user.id ? (await isUserAdminById(session.user.id)) : false;

  return (
    <NavbarLayout session={session} isAdmin={isAdmin}>
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
