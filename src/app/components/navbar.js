"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import { useSidebar } from "../SidebarContext";
import { getAllSections } from "../lib/sections";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { sideBarVisible, setSideBarVisible } = useSidebar();
  const sections = getAllSections();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const router = useRouter();

  function handleSearch() {
    if (!searchTerm.trim()) return; // Don't search if term is empty
    const trimmedSearch = searchTerm.trim();
    handleSidebarClick();
    router.push(`/search?q=${encodeURIComponent(trimmedSearch)}`);
    setSearchTerm(""); // Move this after router.push
  }

  useEffect(() => {
    if (sideBarVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [sideBarVisible]);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSidebarClick = () => {
    setSideBarVisible(false);
  };

  return (
    <>
      <div className="navbar">
        <div className={`navbar-left ${isHomePage ? "desktop-hide" : ""}`}>
          <Hamburger toggled={sideBarVisible} toggle={setSideBarVisible} />
        </div>
        <div className="navbar-center">
          <Link
            href="/"
            className="logo-link"
            onClick={() => {
              handleSidebarClick();
              setSearchVisible(false);
            }}
          >
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
          <Link
            href="/pdf/revista.pdf"
            className="link"
            onClick={handleSidebarClick}
          >
            REVISTA EM PDF
          </Link>
          <Link href="/posts/31" className="link" onClick={handleSidebarClick}>
            SOBRE NÓS
          </Link>
          <div className="search">
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              className={searchVisible ? "visible" : ""}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <Image
              src="/magnifying-glass.svg"
              alt="Search"
              width={20}
              height={20}
              onClick={() => {
                if (!searchVisible) {
                  toggleSearch(); // Open input if closed
                } else if (searchTerm.trim()) {
                  handleSearch(); // Handle search if input has terms
                } else {
                  toggleSearch(); // Close input if open and empty
                }
                handleSidebarClick();
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <div
        className={`side-bar-fade ${sideBarVisible ? "visible" : ""}`}
        onClick={handleSidebarClick}
      >
        <div
          className={`side-bar-wrapper left-column-navbar ${
            sideBarVisible ? "visible" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul>
            <li className="temas-centrais">
              <div>Temas Centrais</div>
              <ul>
                {sections.slice(0, 3).map((section, index) => (
                  <Link
                    key={index}
                    href={`/seccao/${section.url}`}
                    className="no-decoration"
                    onClick={handleSidebarClick}
                  >
                    <li>{section.title}</li>
                  </Link>
                ))}
              </ul>
            </li>
            {sections.slice(3).map((section, index) => (
              <Link
                key={index + 3}
                href={`/seccao/${section.url}`}
                className="no-decoration"
                onClick={handleSidebarClick}
              >
                <li>{section.title}</li>
              </Link>
            ))}
          </ul>
          <div className="mobile-sidebar-bottom">
            <div className="horizontal-separator"></div>
            <Link
              href="/posts/31"
              className="mobile-sobre-nos"
              onClick={handleSidebarClick}
            >
              SOBRE NÓS
            </Link>
            <Link
              href="/pdf/revista.pdf"
              className="mobile-sobre-nos"
              onClick={handleSidebarClick}
            >
              REVISTA EM PDF
            </Link>
            <div className="mobile-search">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                className={searchVisible ? "visible" : ""}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Image
                src="/magnifying-glass.svg"
                alt="Search"
                width={20}
                height={20}
                onClick={() => {
                  if (!searchVisible) {
                    toggleSearch(); // Open input if closed
                  } else if (searchTerm.trim()) {
                    handleSearch(); // Handle search if input has terms
                  } else {
                    toggleSearch(); // Close input if open and empty
                  }
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
