import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TRPCReactProvider } from "@/trpc/react";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TRPCReactProvider>
        <TooltipProvider delayDuration={0}>
          {children}
        </TooltipProvider>
      </TRPCReactProvider>
    </ThemeProvider>
  );
}
