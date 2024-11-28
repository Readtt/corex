import { type Session } from "next-auth";
import Navbar from "@/components/navbar/navbar";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer/footer";

export default function NavLayout({
  session,
  children,
  className,
  disableFooter,
}: {
  session: Session | null;
  children: React.ReactNode;
  className?: string;
  disableFooter?: boolean;
}) {
  return (
    <div className={cn("min-h-screen", className)}>
      <Navbar session={session} />
      <div className={"flex h-[calc(100vh-56px)] flex-col overflow-x-hidden"}>
        <div className="flex w-full justify-center">{children}</div>
        {!disableFooter && <Footer />}
      </div>
    </div>
  );
}
