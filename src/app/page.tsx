
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      Home
    </div>
  );
}
