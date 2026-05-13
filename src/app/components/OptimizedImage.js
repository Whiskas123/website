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
  const [hasError, setHasError] = useState(false);

  const finalSrc = hasError ? fallbackSrc || src : src;

  return (
    <div
      className={`optimized-image-container ${className || ""}`}
      style={style}
    >
      <Image
        src={finalSrc}
        alt={alt || ""}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : loading}
        sizes={sizes}
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
        {...props}
      />

      {credit && <div className="image-credit">{credit}</div>}
    </div>
  );
}
