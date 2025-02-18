"use client";

import React from "react";

export default function Grid({ gridSize = "big-grid", slides }) {
  return (
    <div className={`grids ${gridSize}`}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`div${index + 1}`}
          onClick={() => (window.location.href = `/posts/${slide.id}`)}
        >
          {slide.imageUrl && <img src={slide.imageUrl} alt={slide.title} />}
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
