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
        <p>mundosdotrabalho.associacao@gmail.com</p>
      </div>
      <div className="footer-right">
        <p>Apoiado por:</p>
        <Image
          src="/rosa_lux.png"
          alt="Rosa Lux"
          width={200}
          height={300}
          layout="intrinsic"
        />
      </div>
    </footer>
  );
}
