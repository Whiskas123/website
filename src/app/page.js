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
      title: "O Movimento Sindical na Construção da Democracia",
      section: "50 anos do 25 de abril",
      author: "Manuel Carvalho da Silva",
      imageUrl: "/images/6_PM.jpg",
      id: "2",
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
      title:
        "Entrevista com Alain Supiot: O trabalho uberizado traz de volta a estrutura da servidão",
      author: "António Monteiro Fernandes",
      section: "Internacional",
      id: "18",
      imageUrl: "/images/alain_supiot.png",
    },
  ];

  const slidesMedium = [
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
        "Política salarial e negociação coletiva em três setores: têxteis, energia e nos médicos",
      author: "Maria da Paz Campos Lima",
      id: "7",
      section: "Salários ontem e hoje",
      imageUrl: "/images/19_PM.jpg",
    },
    {
      title:
        "Novo art. 12.º-A do CT e a Diretiva Europeia relativa à melhoria das condições de trabalho nas plataformas digitais",
      author: "João Leal Amado | Teresa Coelho Moreira",
      section: "Plataformas Digitais",
      id: "9",
      imageUrl: "/images/estafetas.jpeg",
    },
    {
      title:
        "As lutas que se estão a (re)fazer e os novos perfis de ação em Portugal",
      author: "Isabel Roque",
      section: "50 anos do 25 de Abril",
      id: "5",
      imageUrl: "/images/2_PM.jpg",
    },
  ];

  const slidesSmall = [
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
      title:
        "A Agenda do Trabalho Digno e o regime de caducidade das convenções coletivas e de arbitragem",
      author:
        "Maria da Paz Campos Lima | João Reis | Fátima Messias | Soraia Duarte",
      section: "Mesa de Controvérsia",
      id: "14",
    },
    {
      title:
        "O DIREITO DOS SINDICATOS AO RELATÓRIO ÚNICO, COM DADOS RETRIBUTIVOS DE TRABALHADORES NÃO FILIADOS",
      author: "João Zenha Martins",
      section: "Consultório Jurídico",
      id: "13",
    },
    {
      title:
        "Notícias de jurisprudência laboral, a propósito de três acórdãos do primeiro semestre de 2024",
      author: "Viriato Reis",
      section: "Consultório Jurídico",
      id: "11",
    },
    {
      title: "Exploração",
      author: "Nuno Teles",
      section: "Abecedário Crítico",
      id: "16",
    },
    {
      title: "Outsourcing",
      author: "Milena Rouxinol",
      section: "Abecedário Crítico",
      id: "17",
    },
  ];

  useEffect(() => {
    console.log("sideBarVisible:", sideBarVisible);
  }, [sideBarVisible]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          className={`left-column side-bar-wrapper ${
            sideBarVisible ? "visible" : ""
          }`}
        >
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
            <div
              className="horizontal-separator"
              style={{ marginRight: "20px" }}
            ></div>
            <Link
              style={{ color: "black" }}
              href="/pdf/revista-compressed.pdf"
              className="link"
            >
              <li>REVISTA EM PDF</li>
            </Link>
            <Link
              style={{ color: "black" }}
              href="/posts/31"
              className="mobile-sobre-nos"
            >
              <li>SOBRE NÓS</li>
            </Link>
          </ul>
        </div>
        <div className="main-column">
          {slides && <Grid gridSize="big-grid" slides={slides}></Grid>}
        </div>
      </div>
      <Newsletter></Newsletter>
      {slidesMedium && (
        <Grid gridSize="medium-grid" slides={slidesMedium}></Grid>
      )}
      {slidesSmall && <Grid gridSize="small-grid" slides={slidesSmall}></Grid>}
    </>
  );
}
