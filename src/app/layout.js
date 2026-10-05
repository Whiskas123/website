import { Barlow, Noto_Serif } from "next/font/google";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./styles.scss";
import { SidebarProvider } from "./SidebarContext";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "./lib/site";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif",
});

const title = "Que Força É Essa - Revista sobre os Mundos do Trabalho";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description: SITE_DESCRIPTION,
  openGraph: {
    title,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "pt_PT",
    type: "website",
    images: "/og.png",
  },
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={`${barlow.variable} ${notoSerif.variable}`}>
      <body>
        <SidebarProvider>
          <Navbar />
          <div className="spacer"></div>
          {children}
          <Footer />
        </SidebarProvider>
        <Analytics />
      </body>
    </html>
  );
}
