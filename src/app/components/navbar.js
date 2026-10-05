"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import { useSidebar } from "../SidebarContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import SidebarMenu from "./sidebarMenu";

export default function Navbar() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { sideBarVisible, setSideBarVisible } = useSidebar();
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

  const handleSearchButton = () => {
    if (!searchVisible) {
      toggleSearch(); // Open input if closed
    } else if (searchTerm.trim()) {
      handleSearch(); // Handle search if input has terms
    } else {
      toggleSearch(); // Close input if open and empty
    }
  };

  const searchInput = (
    <input
      type="text"
      placeholder="Pesquisar..."
      aria-label="Pesquisar"
      value={searchTerm}
      className={searchVisible ? "visible" : ""}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    />
  );

  const searchIcon = (
    <Image src="/magnifying-glass.svg" alt="" width={20} height={20} />
  );

  return (
    <>
      <div className="navbar">
        <div className={`navbar-left ${isHomePage ? "desktop-hide" : ""}`}>
          <Hamburger
            toggled={sideBarVisible}
            toggle={setSideBarVisible}
            label="Menu"
          />
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
              className="logo-img homepage-logo"
              src="/logo_horizontal.svg"
              alt="Que Força É Essa?"
              width={1226.91}
              height={198.43}
            />
            <Image
              className="logo-img logo-mobile"
              src="/logo.svg"
              alt="Que Força É Essa?"
              width={198}
              height={165}
            />
          </Link>
          <span className="navbar-tagline">
            REVISTA SOBRE OS MUNDOS DO TRABALHO
          </span>
        </div>
        <div className="navbar-right">
          <div className="search">
            {searchInput}
            <button
              type="button"
              className="search-button"
              aria-label="Pesquisar"
              onClick={() => {
                handleSearchButton();
                handleSidebarClick();
              }}
            >
              {searchIcon}
            </button>
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
          <SidebarMenu onNavigate={handleSidebarClick} />

          <div className="mobile-sidebar-bottom">
            <div className="mobile-search">
              {searchInput}
              <button
                type="button"
                className="search-button"
                aria-label="Pesquisar"
                onClick={handleSearchButton}
              >
                {searchIcon}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
