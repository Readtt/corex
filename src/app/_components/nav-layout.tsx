import { type Session } from "next-auth";
import Navbar from "@/components/navbar/navbar";

export default function NavLayout({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar session={session} />
      <div className={"flex h-[calc(100vh-56px)]"}>
        <div className="flex w-full justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
