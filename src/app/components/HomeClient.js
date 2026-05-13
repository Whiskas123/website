"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useSidebar } from "../SidebarContext";

import Newsletter from "./newsletter";
import Grid from "./grid";
import MagazineDropdown from "./magazineDropdown";

export default function HomeClient({ sections, slides, otherSlides, imageCount = 12 }) {
  const { sideBarVisible } = useSidebar();

  useEffect(() => {
    console.log("sideBarVisible:", sideBarVisible);
  }, [sideBarVisible]);

  // Separate sections into categories
  const temasCentrais = sections.filter((section) => section.isTemaCentral);
  const otherSections = sections.filter((section) => !section.isTemaCentral);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          className={`left-column side-bar-wrapper ${
            sideBarVisible ? "visible" : ""
          }`}
        >
          <ul>
            <li className="temas-centrais">
              <div>Temas Centrais</div>
              <ul>
                {temasCentrais.map((section, index) => (
                  <Link
                    key={`tc-${index}`}
                    href={`/seccao/${section.url}`}
                    className="no-decoration"
                  >
                    <li>
                      {section.title}
                      {section.isNew && (
                        <span className="novo-indicator">Novo!</span>
                      )}
                    </li>
                  </Link>
                ))}
              </ul>
            </li>
            {otherSections.map((section, index) => (
              <Link
                key={`other-${index}`}
                href={`/seccao/${section.url}`}
                className="no-decoration"
              >
                <li>
                  {section.title}
                  {section.isNew && (
                    <span className="novo-indicator">Novo!</span>
                  )}
                </li>
              </Link>
            ))}
            <div
              className="horizontal-separator"
              style={{ marginRight: "20px" }}
            ></div>
            <li>
              <MagazineDropdown />
            </li>
            <Link
              style={{ color: "black" }}
              href="/posts/32"
              className="mobile-sobre-nos"
            >
              <li>REVISTA EM FORMATO FÍSICO</li>
            </Link>
            <Link
              style={{ color: "black" }}
              href="/posts/31"
              className="mobile-sobre-nos"
            >
              <li>SOBRE NÓS</li>
            </Link>
          </ul>
        </div>
        <div className="main-column">
          {slides && <Grid gridSize="big-grid" slides={slides}></Grid>}
        </div>
      </div>
      <Newsletter></Newsletter>
      {otherSlides && otherSlides.length > 0 && (
        <>
          <Grid
            gridSize="medium-grid"
            slides={otherSlides.slice(0, imageCount)}
          ></Grid>
          {otherSlides.length > imageCount && (
            <Grid
              gridSize="small-grid"
              slides={otherSlides.slice(imageCount).map(({ imageUrl, ...rest }) => rest)}
            ></Grid>
          )}
        </>
      )}
    </>
  );
}
