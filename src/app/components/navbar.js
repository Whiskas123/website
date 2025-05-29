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
  const [isMobile, setIsMobile] = useState(false);

  const { sideBarVisible, setSideBarVisible } = useSidebar();
  const sections = getAllSections();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              className={`logo-img ${!isMobile ? "homepage-logo" : ""}`}
              src={!isMobile ? "/logo_horizontal.svg" : "/logo.svg"}
              alt="Logo"
              width={!isMobile ? 1226.91 : 198}
              height={!isMobile ? 198.43 : 165}
            />
          </Link>
          {isMobile ? "" : "REVISTA SOBRE OS MUNDOS DO TRABALHO"}
        </div>
        <div className="navbar-right">
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
            <div
              className="horizontal-separator"
              style={{ marginRight: "20px" }}
            ></div>
            <Link
              style={{ color: "black" }}
              href="/pdf/revista_compressed.pdf"
              className="link"
            >
              <li>REVISTA EM PDF</li>
            </Link>
            <Link
              style={{ color: "black" }}
              href="/posts/32"
              className="mobile-sobre-nos"
              onClick={handleSidebarClick}
            >
              <li>REVISTA EM FORMATO FÍSICO</li>
            </Link>
            <Link
              style={{ color: "black" }}
              href="/posts/31"
              className="mobile-sobre-nos"
              onClick={handleSidebarClick}
            >
              <li>SOBRE NÓS</li>
            </Link>
          </ul>

          <div className="mobile-sidebar-bottom">
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
