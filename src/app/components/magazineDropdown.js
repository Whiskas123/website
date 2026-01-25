"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function MagazineDropdown({ onLinkClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen && isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, isMobile]);

  const handleLinkClick = () => {
    setIsOpen(false);
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="magazine-dropdown-container"
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
      onClick={() => isMobile && setIsOpen(!isOpen)}
    >
      <span className="magazine-dropdown-wrapper">
        <span className="magazine-dropdown-trigger">
          REVISTA EM PDF
        </span>
        {isOpen && (
          <div 
            className="magazine-dropdown-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href="/pdf/revista_compressed.pdf"
              className="magazine-dropdown-item"
              onClick={handleLinkClick}
            >
              Edição 1
            </Link>
            <Link
              href="/pdf/revista_2.pdf"
              className="magazine-dropdown-item"
              onClick={handleLinkClick}
            >
              Edição 2
            </Link>
          </div>
        )}
      </span>
    </div>
  );
}
