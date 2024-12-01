import "../styles/globals.css"
import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import Navbar from "@/ui/layout/Navbar/Navbar"

const APP_NAME = "Things We Do"
const APP_DEFAULT_TITLE = "Things We Do"
const APP_TITLE_TEMPLATE = "%s - Thing We Do"
const APP_DESCRIPTION = "Best PWA app in the world!"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
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
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head />
      <body>
        <main className="pb-24">{children}</main>
        <Navbar />
      </body>
    </html>
  )
}
