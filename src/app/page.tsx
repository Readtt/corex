import { auth } from "@/server/auth";
import NavLayout from "./_components/nav-layout";

import Landing from "./_components/landing";

// https://github.com/shadcn-ui/ui/tree/main/apps/www/app/(app)/examples
// https://awesome-shadcn-ui.vercel.app/

export default async function Page() {
  const session = await auth();

  return (
    <NavLayout session={session}>
      <Landing session={session}/>
    </NavLayout>
  );
}
