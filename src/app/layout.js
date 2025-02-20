"use client";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import styles from "./styles.scss";
import { SidebarProvider } from "./SidebarContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <Navbar />
          <div style={{ height: "150px" }}></div>
          {children}
          <Footer />
        </SidebarProvider>
      </body>
    </html>
  );
}
