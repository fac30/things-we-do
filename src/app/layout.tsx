import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Navbar from "@/ui/layout/Navbar/Navbar";
import { DatabaseProvider } from "@/context/DatabaseContext";
import { Roboto } from "next/font/google";

const APP_NAME = "Things We Do";
const APP_DEFAULT_TITLE = "Things We Do";
const APP_TITLE_TEMPLATE = "%s - Things We Do";
const APP_DESCRIPTION = "Your app for tracking things you do.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#1B192E",
};

const poppins = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head />
      <body className={`${poppins.className}`}>
        <div className="hidden md:absolute md:block top-1/2 left-1/2 h-5/6 w-11/12 overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-twd-primary-purple z-[9999]">
          <p className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl">
            fuck off
          </p>
        </div>
        <DatabaseProvider>
          <main className="pb-24 z-[60]">{children}</main>
        </DatabaseProvider>
        <Navbar />
      </body>
    </html>
  );
}
