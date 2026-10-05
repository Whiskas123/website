"use client";

import dynamic from "next/dynamic";
import { useSidebar } from "../SidebarContext";

import Grid from "./grid";
import SidebarMenu from "./sidebarMenu";

// Lazy-load below-the-fold content
const Newsletter = dynamic(() => import("./newsletter"), {
  loading: () => <div style={{ height: "200px" }} />,
});

export default function HomeClient({ slides, otherSlides, imageCount = 12 }) {
  const { sideBarVisible } = useSidebar();

  return (
    <>
      <h1 className="sr-only">
        Que Força É Essa? Revista sobre os Mundos do Trabalho
      </h1>
      <div style={{ display: "flex" }}>
        <div
          className={`left-column side-bar-wrapper ${
            sideBarVisible ? "visible" : ""
          }`}
        >
          <SidebarMenu />
        </div>
        <div className="main-column">
          {slides && <Grid gridSize="big-grid" slides={slides} />}
        </div>
      </div>
      <Newsletter />
      {otherSlides && otherSlides.length > 0 && (
        <>
          <Grid
            gridSize="medium-grid"
            slides={otherSlides.slice(0, imageCount)}
          />
          {otherSlides.length > imageCount && (
            <Grid
              gridSize="small-grid"
              slides={otherSlides.slice(imageCount).map(({ imageUrl, ...rest }) => rest)}
            />
          )}
        </>
      )}
    </>
  );
}
