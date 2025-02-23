"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <p>
          Que Força É Essa – Associação de Estudos sobre os Mundos do Trabalho
        </p>
        <button
          className="contact-button"
          onClick={() =>
            (window.location.href =
              "mailto:mundosdotrabalho.associacao@gmail.com")
          }
        >
          Contacta-nos
        </button>
      </div>
      <div className="footer-right">
        <p>Apoiado por:</p>
        <Image
          src="/rosa_lux.png"
          alt="Rosa Lux"
          width={150} // Reduced from 200
          height={225} // Reduced from 300 (maintaining aspect ratio)
          layout="intrinsic"
        />
      </div>
    </footer>
  );
}
