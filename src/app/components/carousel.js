"use client";

import React, { useState } from "react";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Sabias que tens direito a uma indemnização?",
      imageUrl: "slide1.jpg",
    },
    { title: "Slide Title 2", imageUrl: "slide2.jpg" },
    { title: "Slide Title 3", imageUrl: "slide3.jpg" },
    // Add more slides as needed
  ];

  const totalSlides = slides.length;

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="carousel">
      <div className="carousel-arrow left-arrow" onClick={handlePrevClick}>
        {"<"}
      </div>
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            className="carousel-slide"
            key={index}
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <h2>{slide.title}</h2>
          </div>
        ))}
      </div>
      <div className="carousel-arrow right-arrow" onClick={handleNextClick}>
        {">"}
      </div>
      <div className="carousel-indicators">
        <span>
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>
    </div>
  );
}
