import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { DisclaimerBar, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { themeScript } from "@/components/ThemeToggle";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const serif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"] });

const description =
  "Type an address. Proofline shows the housing rules that apply, proves each one with the law's own words, and tells you what to check when it is not sure. Not legal advice.";

export const metadata: Metadata = {
  metadataBase: new URL("https://proofline-opal.vercel.app"),
  title: "Proofline: which housing laws protect this home?",
  description,
  applicationName: "Proofline",
  openGraph: { type: "website", siteName: "Proofline", title: "Proofline: which housing laws protect this home?", description, url: "/" },
  twitter: { card: "summary_large_image", title: "Proofline: which housing laws protect this home?", description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1016" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-bg font-sans text-text">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-bg focus:p-2">
          Skip to content
        </a>
        <DisclaimerBar />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
