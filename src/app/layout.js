"use client";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import styles from "./styles.scss";

import React, { useState, useEffect } from "react";

export default function RootLayout({ children }) {
  const [sideBarVisible, setSideBarVisible] = useState(false);

  useEffect(() => {
    console.log("sideBarVisible:", sideBarVisible);
  }, [sideBarVisible]);

  return (
    <html lang="en">
      <body>
        <Navbar
          sideBarVisible={sideBarVisible}
          setSideBarVisible={setSideBarVisible}
        />
        {React.cloneElement(children, { sideBarVisible, setSideBarVisible })}
        <Footer />
      </body>
    </html>
  );
}
