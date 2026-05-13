"use client";

import React from "react";
import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

export default function Grid({ gridSize = "big-grid", slides }) {
  return (
    <div className={`grids ${gridSize}`}>
      {slides.map((slide, index) => (
        <Link
          key={index}
          href={`/posts/${slide.id}`}
          className={`div${index + 1} grid-element`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {slide.imageUrl && (
            <OptimizedImage
              src={slide.imageUrl}
              alt={slide.title}
              width={800}
              height={600}
              style={{
                width: "100%",
                height: "70%",
                objectFit: "cover",
                objectPosition: "center",
                marginBottom: "10px",
              }}
              loading={index < 3 ? "eager" : "lazy"}
              priority={index < 2 && gridSize === "big-grid"}
              sizes={
                gridSize === "big-grid"
                  ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              }
              fallbackSrc={slide.imageUrl}
              credit={slide.credit}
            />
          )}
          <div className="article-info">
            <div className="article-sections">
              <span className="article-section">
                {slide.section && (
                  <div className="article-section">{slide.section}</div>
                )}
              </span>
            </div>
            <div className="article-title">{slide.title}</div>
            {slide.author && (
              <div className="article-author">{slide.author}</div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
