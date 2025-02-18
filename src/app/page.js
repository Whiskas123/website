"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useSidebar } from "./SidebarContext";

import Newsletter from "./components/newsletter";
import Grid from "./components/grid";
import { getAllSections } from "./lib/sections";

export default function Home() {
  const { sideBarVisible, setSideBarVisible } = useSidebar();
  const sections = getAllSections();
  const slides = [
    {
      title: "Democracia, Trabalho e Sindicalismo",
      author: "Fernando Rosas",
      section: "50 anos do 25 de Abril",
      imageUrl: "/images/22_PM.jpg",
      id: "1",
    },
    {
      title:
        "Como tem evoluído a fatia do bolo que é recebida pelos trabalhadores em Portugal?",
      author: "Vicente Ferreira",
      section: "Salários ontem e hoje",
      imageUrl: "/images/1_AM.jpg",
      id: "6",
    },
    {
      title:
        "Entrevista com Leïla Chaibi sobre a diretiva europeia do trabalho em plataformas",
      author: "Entrevista por José Soeiro",
      section: "Plataformas Digitais",
      imageUrl: "/images/chaibi_1.jpeg",
      id: "10",
    },
    {
      title:
        "Em luta: mulheres no serviço doméstico por um sindicalismo revolucionário",
      author: "Mafalda Araújo | Maria Manuel Rola",
      section: "50 anos do 25 de abril",
      imageUrl: "/images/domestico.png",
      id: "3",
    },
    {
      title: "O Movimento Sindical na Construção da Democracia",
      section: "50 anos do 25 de abril",
      author: "Manuel Carvalho da Silva",
      id: "2",
    },
    {
      title:
        "Política salarial e negociação coletiva em três setores: têxteis, energia e nos médicos",
      author: "Maria da Paz Campos Lima",
      id: "7",
      section: "Salários ontem e hoje",
    },
  ];

  const slidesSmall = [
    {
      title:
        "Entrevista com Alain Supiot: O trabalho uberizado traz de volta a estrutura da servidão",
      author: "António Monteiro Fernandes",
      section: "Internacional",
      id: "18",
    },
    {
      title:
        "Como a luta contra as alterações climáticas se articula com as lutas sindicais",
      author: "Daniel Borges",
      section: "Recensões",
      id: "21",
    },
    {
      title:
        '"Despedir para terceirizar é legítimo?" Impedir uma empresa de despedir para fazer um outsourcing é inconstitucional?',
      author: "José Soeiro",
      section: "Recensões",
      id: "25",
    },
    {
      title:
        "Inteligência Artificial: Formação para o diálogo social e a contratação coletiva",
      author: "Nuno Boavida",
      section: "Recensões",
      id: "23",
    },
    {
      title: "Duques do Precariado, os nobres da precariedade",
      author: "Maria Eduarda Pereira",
      section: "Culturas do Trabalho",
      id: "26",
    },
  ];

  useEffect(() => {
    console.log("sideBarVisible:", sideBarVisible);
  }, [sideBarVisible]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className={`left-column ${sideBarVisible ? "visible" : ""}`}>
          <ul>
            <li className="temas-centrais">
              <div>Temas Centrais</div>
              <ul>
                {sections.slice(0, 3).map((section, index) => (
                  <Link
                    key={index}
                    href={`/seccao/${section.url}`}
                    className="no-decoration"
                  >
                    <li>{section.title}</li>
                  </Link>
                ))}
              </ul>
            </li>
            {sections.slice(3).map((section, index) => (
              <Link
                key={index + 3}
                href={`/seccao/${section.url}`}
                className="no-decoration"
              >
                <li>{section.title}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="main-column">
          {slides && <Grid gridSize="big-grid" slides={slides}></Grid>}
        </div>
      </div>
      <Newsletter></Newsletter>
      {slidesSmall && <Grid gridSize="small-grid" slides={slidesSmall}></Grid>}
    </>
  );
}
