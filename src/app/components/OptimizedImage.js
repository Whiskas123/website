"use client";

import { useState } from "react";
import Image from "next/image";

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  loading = "lazy",
  sizes,
  style,
  fallbackSrc,
  credit,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // For now, use the original image source since WebP versions don't exist yet
  // TODO: Once you run the optimization script, this can be updated to try WebP first
  const finalSrc = hasError ? fallbackSrc || src : src;

  return (
    <div
      className={`optimized-image-container ${className || ""}`}
      style={style}
    >
      {isLoading && (
        <div
          className="image-skeleton"
          style={{
            width: width || "100%",
            height: height || "200px",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      )}

      <Image
        src={finalSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={loading}
        sizes={sizes}
        className={`optimized-image ${isLoading ? "loading" : "loaded"}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setIsLoading(false);
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
        {...props}
      />

      {credit && <div className="image-credit">{credit}</div>}

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .optimized-image-container {
          position: relative;
          overflow: hidden;
          transition: filter 0.3s ease, transform 0.2s ease;
        }

        .optimized-image-container:hover {
          filter: brightness(0.8) sepia(1) hue-rotate(-50deg);
          transform: scale(1.02);
        }

        .image-skeleton {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }

        .optimized-image {
          position: relative;
          z-index: 2;
        }

        .optimized-image.loading {
          opacity: 0;
        }

        .optimized-image.loaded {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
