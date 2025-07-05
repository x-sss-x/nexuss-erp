import type { Metadata, Viewport } from "next";
import {
  Geist_Mono,
  Inter,
  Nunito_Sans,
  Outfit,
  Public_Sans,
  Roboto,
  Roboto_Mono,
  Urbanist,
} from "next/font/google";

import { cn } from "@nxss/ui";
import { ThemeProvider, ThemeToggle } from "@nxss/ui/theme";
import { Toaster } from "@nxss/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Nexuss ERP",
  description:
    "ERP solution for educational institutions to avoid manual way of handling the academic informations.",
  openGraph: {
    title: "Nexuss ERP",
    description:
      "ERP solution for educational institutions to avoid manual way of handling the academic informations.",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Nexuss ERP",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased [&_svg]:stroke-[1.5]",
          nunitoSans.variable,
          robotoMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
          <Toaster richColors position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
