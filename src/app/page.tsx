import Navbar from "@/components/navbar/navbar";
import { auth } from "@/server/auth";

// https://github.com/shadcn-ui/ui/tree/main/apps/www/app/(app)/examples

export default async function Page() {
  const session = await auth();
  return (
    <div className="min-h-screen">
      <Navbar session={session} />
    </div>
  );
}
