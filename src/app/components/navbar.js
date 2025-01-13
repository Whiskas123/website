"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Image src="/logo.svg" alt="Logo" width={120} height={100} />
      </div>
      <div className="navbar-center">
        <button onClick={toggleMenu} className={menuVisible ? "active" : ""}>
          Menu
        </button>
      </div>
      <div className="navbar-right">
        <div className="link">Sobre nós</div>
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
        <Link href="/mesas-controversia" className="grid-cell">
          Mesas de Controvérsia
        </Link>
        <Link href="/internacional" className="grid-cell">
          Internacional
        </Link>
        <Link href="/abecedario-critico" className="grid-cell">
          Abecedário crítico
        </Link>
        <Link href="/retratos" className="grid-cell">
          Retratos
        </Link>
        <Link href="/culturas-trabalho" className="grid-cell">
          Culturas do trabalho
        </Link>
        <Link href="/recensoes" className="grid-cell">
          Recensões
        </Link>
        <Link href="/outros-textos" className="grid-cell">
          Outros textos
        </Link>
        <Link href="/ler-e-ver" className="grid-cell">
          A ler e a ver
        </Link>
        <Link href="/consultorio" className="grid-cell">
          Consultório
        </Link>
        <Link href="/links" className="grid-cell">
          Links
        </Link>
      </div>
    </div>
  );
}
