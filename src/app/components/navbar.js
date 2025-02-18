"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Hamburger from "hamburger-react";

export default function Navbar({ sideBarVisible, setSideBarVisible }) {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Hamburger toggled={sideBarVisible} toggle={setSideBarVisible} />
      </div>
      <div className="navbar-center">
        <Link href="/" className="logo-link">
          <Image
            className="logo-img"
            src="/logo.svg"
            alt="Logo"
            width={198}
            height={165}
          />
        </Link>
      </div>
      <div className="navbar-right">
        <Link href="/posts/31" className="link">
          SOBRE NÓS
        </Link>
        <div className="search">
          {searchVisible && <input type="text" placeholder="Search..." />}
          <Image
            src="/magnifying-glass.svg"
            alt="Search"
            width={20}
            height={20}
            onClick={toggleSearch}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}
