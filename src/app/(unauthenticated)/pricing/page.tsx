import NavbarLayout from "@/app/_components/navbar/navbar-layout";
import PricingLayout from "@/app/_components/pricing/pricing-layout";
import { auth } from "@/server/auth";
import { isUserAdminById } from "@/server/db/queries";
import { getUserSubscriptionPlan } from "@/server/stripe";

export default async function Page() {
  const session = await auth();
  const subscription = await getUserSubscriptionPlan(session?.user.id);
  const isAdmin = session?.user.id ? await isUserAdminById(session.user.id) : false;

  return (
    <NavbarLayout session={session} isAdmin={isAdmin}>
      <div className="container mx-6 py-32">
        <PricingLayout session={session} subscription={subscription} />
      </div>
    </NavbarLayout>
  );
}
