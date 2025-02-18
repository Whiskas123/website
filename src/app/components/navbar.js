"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getAllSections } from "../lib/sections";

export default function Navbar() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const sections = getAllSections();

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSectionClick = () => {
    setMenuVisible(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-left"></div>
      <div className="navbar-center">
        <Link href="/" className="logo-link">
          <Image src="/logo.svg" alt="Logo" width={120} height={100} />
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

      <div className={`menu-grid ${menuVisible ? "visible" : ""}`}>
        {" "}
        {sections.map((section) => (
          <Link
            key={section.url}
            href={`/seccao/${section.url}`}
            className="grid-cell"
            onClick={handleSectionClick}
          >
            {section.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
