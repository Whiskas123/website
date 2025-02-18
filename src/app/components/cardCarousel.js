"use client";

import React, { useState } from "react";

export default function CardCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Sabias que tens direito a uma indemnização?",
      imageUrl: "/slide1.jpg",
    },
    { title: "Slide Title 2", imageUrl: "/slide2.jpg" },
    { title: "Slide Title 3", imageUrl: "/slide3.jpg" },
    // Add more slides as needed
  ];

  const totalSlides = slides.length;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  return (
    <div className="card-carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            <div className="slide-content">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="slide-image"
              />
              <div className="slide-text">{slide.title}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-button left" onClick={handlePrev}>
        &lt;
      </button>
      <button className="carousel-button right" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}
