"use client";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import styles from "./styles.scss";
import { SidebarProvider } from "./SidebarContext";

export const metadata = {
  title: "Que Força É Essa - Revista dos Mundos do Trabalho",
  openGraph: {
    images: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <Navbar />
          <div className="spacer"></div>
          {children}
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}
