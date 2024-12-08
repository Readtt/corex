import { Toaster } from "@/components/ui/sonner";
import config from "@/config";
import { getBaseUrl } from "@/lib/utils";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: config.site.name,
    template: "%s - " + config.site.name,
  },
  description: config.site.tagline,
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  openGraph: {
    title: config.site.name,
    description: config.site.tagline,
    images: [{ url: "/opengraph-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.name,
    description: config.site.tagline,
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
