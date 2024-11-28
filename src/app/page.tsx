import { auth } from "@/server/auth";
import NavLayout from "./_components/nav-layout";

import Landing from "./_components/landing";

// https://github.com/shadcn-ui/ui/tree/main/apps/www/app/(app)/examples
// https://awesome-shadcn-ui.vercel.app/
// TODO: terms and conditions
// TODO: privacy policy
// TODO: Billing and stripe
// TODO: Pricing component
// TODO: Add email support
// TODO: add error, and not found component
// TODO: Add SST help

export default async function Page() {
  const session = await auth();

  return (
    <NavLayout session={session}>
      <Landing session={session}/>
    </NavLayout>
  );
}
