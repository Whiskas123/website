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
    setSearchVisible(false);
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
        <div className="navbar-left">
          {!isHomePage && (
            <Hamburger toggled={sideBarVisible} toggle={setSideBarVisible} />
          )}
        </div>
        <div className="navbar-center">
          <Link href="/" className="logo-link" onClick={handleSidebarClick}>
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
          <Link href="/posts/31" className="link" onClick={handleSidebarClick}>
            SOBRE NÓS
          </Link>
          <div className="search">
            <input
              type="text"
              placeholder="Pesquisar..."
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
                toggleSearch();
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
        </div>
      </div>
    </>
  );
}
