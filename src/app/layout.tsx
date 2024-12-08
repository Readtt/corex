import { Toaster } from "@/components/ui/sonner";
import config from "@/config";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: {
    default: config.site.name,
    template: "%s - " + config.site.name,
  },
  description: config.site.tagline,
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  openGraph: {
    images: [{ url: "/opengraph-image.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
