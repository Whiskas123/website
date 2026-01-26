"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useSidebar } from "./SidebarContext";

import Newsletter from "./components/newsletter";
import Grid from "./components/grid";
import { getAllSections } from "./lib/sections";
import MagazineDropdown from "./components/magazineDropdown";

export default function Home() {
  const { sideBarVisible, setSideBarVisible } = useSidebar();
  const sections = getAllSections();
  const slides = [
    {title:"Trabalho e Imigração: algumas notas para interpretar e transformar o presente", subtitle: "", author: "José Soeiro", section: "Trabalho e Imigração", id: "201", imageUrl: "/images/201.jpg"},
    {
      title: "Contradições à portuguesa?", 
      subtitle: "Entre envelhecimento, escassez de trabalhadores e constrangimentos à entrada e permanência de mão-de-obra estrangeira",
      author: "Catarina Reis de Oliveira", section: "Trabalho e Imigração", 
      id: "202", 
      imageUrl: "/images/202.jpg"},

    {title:"Greve Geral, Precariedade e Trabalho Escravo", subtitle: "", author: "Alberto Matos", section: "Trabalho e Imigração", id: "203", imageUrl: "/images/203-1.jpg"},
  {title:"Condições de trabalho e controle público: imigrantes e trabalho informal", subtitle: "", author: "João Fraga de Oliveira", section: "Trabalho e Imigração", id: "204", imageUrl: "/images/204.jpg"},
  {title:"Migrações, trabalho e (re)existências", subtitle: "", author: "Joana Guimarães, Joana S. Marques, Ana Luísa Martinho, Joana Topa", section: "Trabalho e Imigração", id: "205", imageUrl: "/images/205.jpg"},
       
];




  const slidesMediumContraReforma = [
     {title:"Trabalho em plataformas digitais na atualidade e a Associação de Imigrantes e Trabalhadores por Aplicação", subtitle: "", author: "Marcel Borges, Hans Donner", section: "Trabalho e Imigração", id: "206", imageUrl: "/images/206.jpg"},
  {title:"Capitalismo (Racial) de Plataformas e a realidade dos estafetas em Portugal", subtitle: "", author: "João Pedro Carraça", section: "Trabalho e Imigração", id: "207", imageUrl: "/images/207.jpg"},
  {title:"Trabalho XXI - Anteprojeto de Lei da Reforma da Legislação Laboral", subtitle: "A agenda anti laboral e antissindical que é imperioso travar", author: "Maria da Paz Campos Lima", section: "Contra-reforma laboral", id: "209", imageUrl: "/images/209.jpg"},
  {title:"Trabalho XXI - Anteprojeto de Lei da Reforma da Legislação Laboral", subtitle: "Da liberdade para oprimir", author: "João Leal Amado", section: "Contra-reforma laboral", id: "210", imageUrl: "/images/210.jpg"},
      {
      title: "O Anteprojeto XXI, a contratação coletiva e a Constituição", 
      subtitle: "", 
      author: "João Carlos Simões Reis", 
      ection: "Contra-reforma laboral",
      id: "211", imageUrl: "/images/211.jpg"},
  {title:"Os trabalhadores e a sociedade civil em ação pró-Palestina!", subtitle: "", author: "Leopoldo Tartaglia", section: "Internacional", id: "212", imageUrl: "/images/212.jpg"},
  {title:"A transição tecnológica na indústria automóvel e a posição dos trabalhadores", subtitle: "", author: "António Brandão Moniz", section: "Automóvel", id: "213", imageUrl: "/images/213.jpg"},
  {title:"Algumas propostas de alteração do regime jurídico dos despedimentos por motivos económicos", subtitle: "", author: "Catarina Gomes Santos", section: "Contra-reforma laboral", id: "214", imageUrl: "/images/214.jpg"},
  {title:"Uma luta exemplar de trabalhadores em outsourcing", subtitle: "o caso dos bares da Comboios de Portugal", author: "Daniel Borges", section: "Contra-reforma laboral", id: "215", imageUrl: "/images/215.jpg"},
  {title:"A democracia não pode ficar à porta das empresas", subtitle:"A propósito de uma conferência internacional sobre democracia económica", author: "Henrique Sousa", section: "Internacional", id: "216", imageUrl: "/images/216.jpg"},
  {title:"Fechado, fechado, fechado. Tempo de viver.", subtitle:"A iniciativa Legislativa Cidadã com vista ao encerramento do comércio ao domingo", author: "Joana Neto", section: "Consultório Jurídico", id: "217", imageUrl: "/images/217.jpg"},
  {title:"Artigo 498.º-A 'Terceirização de serviços' -- breves considerações", subtitle:"", author: "Ana Teresa Ribeiro", section: "Consultório Jurídico", id: "218", imageUrl: "/images/218.jpg"},
  {title:"Sindicatos", subtitle:"", author: "Hermes Augusto Costa", section: "Abecedário Crítico", id: "219", imageUrl: "/images/219.jpg"},
  {title:"Cromos da Caderneta de Trabalho", subtitle:"", author: "Jorge Louraço Figueira", section: "Abecedário Crítico", id: "220", imageUrl: "/images/220-0.jpg"},
  {title:"Concise Introduction to Employment Relations", subtitle:"", author: "Maria da Paz Campos Lima", section: "Recensões", id: "221", imageUrl: "/images/221.jpg"},
  
        {
      title: "Sindicatos condenam agressão militar contra Venezuela",
      author: "",
      section: "Internacional",
      id: "73",
      imageUrl: "/images/73.jpg",
    },
    {
      title:
        "À socapa, Governo abre a porta à fraude e promove trabalho não declarado",
      author: "José Soeiro",
      section: "Contra-reforma laboral",
      id: "71",
      imageUrl: "/images/jsoeiro.jpeg",
    },
    {
      title: "Contra o cinismo, a esperança",
      author: "Manuel Carvalho da Silva",
      section: "Greve Geral",
      id: "70",
      imageUrl: "/images/greve70.jpeg",
    },
    {
      title: "TRÊS DESENHOS PELA GREVE",
      author: "Regina Guimarães",
      section: "Greve Geral",
      id: "67",
      imageUrl: "/images/regina1.jpeg",
    },
    {
      title: "Trabalho e contrarreforma com velho pacote laboral",
      author: "Manuel Carlos Silva",
      section: "Contra-reforma laboral",
      id: "72",
      imageUrl: "/images/72.jpg",
    },
        {
      title: "Uma greve geral pela dignidade",
      author: "Manuel Loff",
      section: "Greve Geral",
      id: "69",
      imageUrl: "/images/loff.jpeg",
    },

    {
      title: "Que venha a rua!",
      author: "Margarida Chagas Lopes",
      section: "Greve Geral",
      id: "68",
      imageUrl: "/images/regina2.jpeg",
    },
    {
      title: "É uma greve pela democracia",
      author: "Manuel Carvalho da Silva",
      section: "Greve Geral",
      id: "66",
      imageUrl: "/images/grevegeralpedra.jpg",
    },
    {
      title: "As greves e as estatísticas: um casamento pouco virtuoso",
      author: "Henrique Sousa",
      section: "Greve Geral",
      id: "64",
      imageUrl: "/images/grevegeralgrafitti.png",
    },
    {
      title: "A negociação colectiva como política de desenvolvimento",
      author: "Ricardo Paes Mamede",
      section: "Contra-reforma laboral",
      id: "65",
      imageUrl: "/images/image004.png",
    },
    {
      title: "Greve geral, o “Trabalho XXI”, precariedade e Bertolt Brecht",
      author: "João Fraga de Oliveira",
      section: "Greve Geral",
      id: "63",
      imageUrl: "/images/63.jpeg",
    },
    {
      title:
        "Pacote laboral: o governo recuou, mas a proposta tem de cair. 5 razões",
      author: "Gonçalo Pessa",
      section: "Contra-reforma laboral",
      id: "62",
      imageUrl: "/images/goncalopessa.jpg",
    },
    {
      title:
        "Plataformas digitais: uma despresunção de laboralidade que é um 31…",
      author: "João Leal Amado",
      section: "Plataformas Digitais",
      id: "58",
      imageUrl: "/images/58.jpeg",
    },
    {
      title: "A nova proposta do Governo à UGT: gozar com quem trabalha!",
      author: "Henrique Sousa",
      section: "Contra-reforma laboral",
      id: "60",
      imageUrl: "/images/henriquesousa.jpg",
    },
    {
      title: "O impúdico retorno do despedir-para-terceirizar",
      author: "João Leal Amado",
      section: "Plataformas Digitais",
      id: "59",
      imageUrl: "/images/59.jpeg",
    },
    {
      title:
        "A proteção da parentalidade na Agenda do Trabalho XXI: um passo em frente ou dois passos atrás?",
      author:
        "Catarina de Oliveira Carvalho | Joana Nunes Vicente | Luísa Andias Gonçalves",
      section: "Contra-reforma laboral",
      id: "57",
      imageUrl: "/images/57.jpeg",
      credit: "© LUSA",
    },
    {
      title:
        "Os salários são baixos por causa da 'rigidez' do mercado de trabalho?",
      author: "Vicente Ferreira",
      section: "Contra-reforma laboral",
      id: "54",
      imageUrl: "/images/54.png",
    },
    {
      title: "Relações laborais e negociação coletiva: dinamizar ou implodir?",
      author: "Maria da Paz Campos Lima",
      section: "Contra-reforma laboral",
      id: "56",
      imageUrl: "/images/56.jpeg",
    },
    {
      title: "Mexer num detalhe para fazer ruir o combate à precariedade",
      author: "José Soeiro",
      section: "Contra-reforma laboral",
      id: "55",
      imageUrl: "/images/55.jpg",
    },
    {
      title:
        "Carta Aberta: Portugueses e imigrantes, juntos por um país justo, livre e fraterno",
      author: "",
      section: "",
      id: "52",
      imageUrl: "/images/52.jpeg",
    },
    {
      title: "Apelo às centrais sindicais e aos trabalhadores",
      author: "",
      section: "Contra-reforma laboral",
      id: "45",
      imageUrl: "/images/cravo.jpg",
    },
    {
      title: "O direito à greve e os serviços mínimos",
      author: "João Leal Amado",
      section: "Contra-reforma laboral",
      id: "46",
      imageUrl: "/images/grevegeral.jpg",
    },
    {
      title:
        "O “Anteprojeto” de Lei da reforma da legislação laboral” – Trabalho XXI ou a liquidação dos direitos laborais",
      author: "António Garcia Pereira",
      section: "Contra-reforma laboral",
      id: "51",
      imageUrl: "/images/51.jpg",
    },
    {
      title: "Trabalho XXI: a precariedade por tempo indeterminado",
      author: "José Pedro Pinto",
      section: "Contra-reforma laboral",
      id: "43",
      imageUrl: "/images/pedropinto.jpeg",
    },
    {
      title: "Uma agenda para a negação do trabalho digno?",
      author: "Hermes Augusto Costa",
      section: "Contra-reforma laboral",
      id: "44",
      imageUrl: "/images/hermes.jpeg",
    },
    {
      title: "392: licença para expulsar!",
      author: "João Leal Amado",
      section: "Contra-reforma laboral",
      imageUrl: "/images/amado.jpeg",
      id: "36",
    },
    {
      title:
        "Trabalho XXI: uma receita do passado que agrava a exclusão de grupos vulneráveis",
      section: "Contra-reforma laboral",
      author: "Joana Neto",
      imageUrl: "/images/joana_neto.jpg",
      id: "34",
    },
    {
      title: "“Trabalho XXI”: roteiro para um precário abdicante",
      author: "João Leal Amado",
      section: "Contra-reforma laboral",
      id: "37",
      imageUrl: "/images/35.jpeg",
    },
    {
      title:
        "Trabalhadores sem formação: é este o plano 'modernizador' do Governo?",
      author: "Ulisses Garrido",
      section: "Contra-reforma laboral",
      id: "35",
      imageUrl: "/images/formacao.jpg",
    },

    {
      title:
        "Mais um ou dois dias de “férias” e as coisas que realmente importam",
      author: "Milena Rouxinol",
      section: "Contra-reforma laboral",
      id: "42",
      imageUrl: "/images/milena.jpg",
    },

    {
      title: "O anteprojeto e a contratação coletiva",
      author: "João Leal Amado",
      id: "33",
      section: "Contra-reforma laboral",
      imageUrl: "/images/33.jpeg",
    },

    {
      title: "Pseudopresunção de laboralidade nas plataformas digitais",
      author: "Teresa Coelho Moreira | Guilherme Dray",
      section: "Contra-reforma laboral",
      id: "39",
      imageUrl: "/images/37.jpeg",
    },

    {
      title: "Contrarreforma laboral: a precariedade nunca existiu",
      author: "Paulo Pedroso",
      section: "Contra-reforma laboral",
      id: "38",
      imageUrl: "/images/38.jpeg",
    },

    {
      title: "Mais gato por lebre",
      author: "Manuel Carvalho da Silva",
      section: "Contra-reforma laboral",
      id: "40",
      imageUrl: "/images/carvalho_silva.jpg",
    },

    {
      title: "O Luís contra quem trabalha",
      author: "José Soeiro",
      section: "Contra-reforma laboral",
      id: "41",
      imageUrl: "/images/34.jpeg",
    },
    {
      title:
        "Divididos Perdemos, Unidos Vencemos: Hora de ação sindical unida!",
      author: "",
      section: "Contra-reforma laboral",
      id: "47",
      imageUrl: "/images/imagem_manif.jpg",
    },

    {
      title: "O trabalho que o século XXI dispensa",
      author:
        "Henrique Sousa | Joana Neto | João Leal Amado | José Soeiro | Maria da Paz Campos Lima",
      section: "Contra-reforma laboral",
      id: "48",
      imageUrl: "/images/48.jpeg",
      credit: "© LUSA",
    },
    {
      title:
        "Reforma laboral de Montenegro: injustificada, injusta e indesejável",
      author: "Ricardo Paes Mamede",
      section: "Contra-reforma laboral",
      id: "49",
      imageUrl: "/images/49.jpg",
      credit: "© LUSA",
    },
    {
      title: "Trabalho XXI: rerum novarum?",
      author: "João Fraga de Oliveira",
      section: "Contra-reforma laboral",
      id: "50",
      imageUrl: "/images/rerum.jpg",
    },

    {
      title: "Leis laborais: uma contrarreforma e uma necessária “errata”",
      author: "Miguel Cabrita",
      section: "Contra-reforma laboral",
      id: "53",
      imageUrl: "/images/cabrita.jpg",
    },
  ];

  const slidesMedium = [
    {
      title:
        "Política salarial e negociação coletiva em três setores: têxteis, energia e nos médicos",
      author: "Maria da Paz Campos Lima",
      id: "7",
      section: "Salários ontem e hoje",
      imageUrl: "/images/19_PM.jpg",
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
        "Novo art. 12.º-A do CT e a Diretiva Europeia relativa à melhoria das condições de trabalho nas plataformas digitais",
      author: "João Leal Amado | Teresa Coelho Moreira",
      section: "Plataformas Digitais",
      id: "9",
      imageUrl: "/images/estafetas.jpeg",
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
    {
      title:
        "Como tem evoluído a fatia do bolo que é recebida pelos trabalhadores em Portugal?",
      author: "Vicente Ferreira",
      section: "Salários ontem e hoje",
      imageUrl: "/images/1_AM.jpg",
      id: "6",
    },
    {
      title: "Democracia, Trabalho e Sindicalismo",
      author: "Fernando Rosas",
      section: "50 anos do 25 de Abril",
      imageUrl: "/images/22_PM.jpg",
      id: "1",
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

  // Separate sections into categories
  const temasCentrais = sections.filter((section) => section.isTemaCentral);
  const otherSections = sections.filter((section) => !section.isTemaCentral);

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
                {temasCentrais.map((section, index) => (
                  <Link
                    key={`tc-${index}`}
                    href={`/seccao/${section.url}`}
                    className="no-decoration"
                  >
                    <li>
                      {section.title}
                      {section.isNew && (
                        <span className="novo-indicator">Novo!</span>
                      )}
                    </li>
                  </Link>
                ))}
              </ul>
            </li>
            {otherSections.map((section, index) => (
              <Link
                key={`other-${index}`}
                href={`/seccao/${section.url}`}
                className="no-decoration"
              >
                <li>
                  {section.title}
                  {section.isNew && (
                    <span className="novo-indicator">Novo!</span>
                  )}
                </li>
              </Link>
            ))}
            <div
              className="horizontal-separator"
              style={{ marginRight: "20px" }}
            ></div>
            <li>
              <MagazineDropdown />
            </li>
            <Link
              style={{ color: "black" }}
              href="/posts/32"
              className="mobile-sobre-nos"
            >
              <li>REVISTA EM FORMATO FÍSICO</li>
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
      {slidesMediumContraReforma && (
        <Grid
          gridSize="medium-grid"
          slides={[...slidesMediumContraReforma]}
        ></Grid>
      )}
      {slidesMedium && (
        <Grid gridSize="medium-grid" slides={slidesMedium.slice(0, 8)}></Grid>
      )}

      {slidesSmall && <Grid gridSize="small-grid" slides={slidesSmall}></Grid>}
    </>
  );
}
