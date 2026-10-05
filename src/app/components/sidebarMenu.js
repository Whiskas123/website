"use client";
import Link from "next/link";
import { getAllSections } from "../lib/sections";
import MagazineDropdown from "./magazineDropdown";

function SectionItem({ section, onNavigate }) {
  return (
    <li>
      <Link
        href={`/seccao/${section.url}`}
        className="no-decoration"
        onClick={onNavigate}
      >
        {section.title}
        {section.isNew && <span className="novo-indicator">Novo!</span>}
      </Link>
    </li>
  );
}

// Section list shared by the homepage left column and the slide-in sidebar
export default function SidebarMenu({ onNavigate }) {
  const sections = getAllSections();
  const temasCentrais = sections.filter((section) => section.isTemaCentral);
  const otherSections = sections.filter((section) => !section.isTemaCentral);

  return (
    <ul>
      <li className="temas-centrais">
        <div>Temas Centrais</div>
        <ul>
          {temasCentrais.map((section) => (
            <SectionItem
              key={section.url}
              section={section}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </li>
      {otherSections.map((section) => (
        <SectionItem
          key={section.url}
          section={section}
          onNavigate={onNavigate}
        />
      ))}
      <div
        className="horizontal-separator"
        style={{ marginRight: "20px" }}
      ></div>
      <li>
        <MagazineDropdown onLinkClick={onNavigate} />
      </li>
      <li>
        <Link href="/posts/32" onClick={onNavigate}>
          REVISTA EM FORMATO FÍSICO
        </Link>
      </li>
      <li>
        <Link href="/posts/31" onClick={onNavigate}>
          SOBRE NÓS
        </Link>
      </li>
    </ul>
  );
}
