"use client";

import React from "react";
import OptimizedImage from "./OptimizedImage";

export default function Grid({ gridSize = "big-grid", slides }) {
  return (
    <div className={`grids ${gridSize}`}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`div${index + 1}`}
          onClick={() => (window.location.href = `/posts/${slide.id}`)}
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
              loading={index < 4 ? "eager" : "lazy"}
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fallbackSrc={slide.imageUrl}
              credit={slide.credit}
            />
          )}
          <div className="article-info">
            <div className="article-sections">
              <span className="article-section">
                {" "}
                {slide.section && (
                  <div className="article-section">{slide.section}</div>
                )}
              </span>
            </div>
            <div className="article-title">{slide.title}</div>
            {/*slide.subtitle && (
              <div className="article-subtitle">{slide.subtitle}</div>
            )*/}
            {slide.author && (
              <div className="article-author">{slide.author}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
