import Navbar from "./components/navbar";
import Footer from "./components/footer";
import styles from "./styles.scss";
import { SidebarProvider } from "./SidebarContext";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Que Força É Essa - Revista sobre os Mundos do Trabalho",
  openGraph: {
    images: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
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
