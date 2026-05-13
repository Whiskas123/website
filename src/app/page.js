import { getAllSections } from "./lib/sections";
import { resolveSlides } from "./lib/posts";
import HomeClient from "./components/HomeClient";

// Number of "other" slides that will display with an image
const IMAGE_COUNT = 12;

// Big highlight slides (shown at the top)
const bigSlideConfigs = [
  { id: "225" },
  { id: "200" },
  { id: "226" },
  { id: "223" },
  { id: "224" },
];

// All other slides (fused into a single list)
const otherSlideConfigs = [
  { id: "211" },
  { id: "209" },
  { id: "210" },
  { id: "222" },
  { id: "203", imageUrl: "/images/203-1.jpg" },
  { id: "205" },
  { id: "206" },
  { id: "207" },
  { id: "202" },
  { id: "204" },
  { id: "201" },
  { id: "212" },
  { id: "213" },
  { id: "214" },
  { id: "215" },
  { id: "216" },
  { id: "217" },
  { id: "218" },
  { id: "219" },
  { id: "220", imageUrl: "/images/220-0.jpg" },
  { id: "221" },
  { id: "73" },
  { id: "71", imageUrl: "/images/jsoeiro.jpeg" },
  { id: "70", imageUrl: "/images/greve70.jpeg" },
  { id: "67", imageUrl: "/images/regina1.jpeg" },
  { id: "72" },
  { id: "69", imageUrl: "/images/loff.jpeg" },
  { id: "68", imageUrl: "/images/regina2.jpeg" },
  { id: "66", imageUrl: "/images/grevegeralpedra.jpg" },
  { id: "64", imageUrl: "/images/grevegeralgrafitti.png" },
  { id: "65", imageUrl: "/images/image004.png" },
  { id: "63" },
  { id: "62", imageUrl: "/images/goncalopessa.jpg" },
  { id: "58" },
  { id: "60", imageUrl: "/images/henriquesousa.jpg" },
  { id: "59" },
  { id: "57", credit: "© LUSA" },
  { id: "54" },
  { id: "56" },
  { id: "55" },
  { id: "52" },
  { id: "45", imageUrl: "/images/cravo.jpg" },
  { id: "46", imageUrl: "/images/grevegeral.jpg" },
  { id: "51" },
  { id: "43", imageUrl: "/images/pedropinto.jpeg" },
  { id: "44", imageUrl: "/images/hermes.jpeg" },
  { id: "36", imageUrl: "/images/amado.jpeg" },
  { id: "34", imageUrl: "/images/joana_neto.jpg" },
  { id: "37", imageUrl: "/images/35.jpeg" },
  { id: "35", imageUrl: "/images/formacao.jpg" },
  { id: "42", imageUrl: "/images/milena.jpg" },
  { id: "33" },
  { id: "39", imageUrl: "/images/37.jpeg" },
  { id: "38" },
  { id: "40", imageUrl: "/images/carvalho_silva.jpg" },
  { id: "41", imageUrl: "/images/34.jpeg" },
  { id: "47", imageUrl: "/images/imagem_manif.jpg" },
  { id: "48", credit: "© LUSA" },
  { id: "49", credit: "© LUSA" },
  { id: "50", imageUrl: "/images/rerum.jpg" },
  { id: "53", imageUrl: "/images/cabrita.jpg" },
  { id: "7" },
  { id: "2", imageUrl: "/images/6_PM.jpg" },
  { id: "9", imageUrl: "/images/estafetas.jpeg" },
  { id: "3", imageUrl: "/images/domestico.png" },
  { id: "18", imageUrl: "/images/alain_supiot.png" },
  { id: "6", imageUrl: "/images/1_AM.jpg" },
  { id: "1", imageUrl: "/images/22_PM.jpg" },
  { id: "10", imageUrl: "/images/chaibi_1.jpeg" },
  { id: "5", imageUrl: "/images/2_PM.jpg" },
  { id: "21" },
  { id: "25" },
  { id: "23" },
  { id: "14" },
  { id: "13" },
  { id: "11" },
  { id: "16" },
  { id: "17" },
];

export default function Home() {
  const sections = getAllSections();
  const slides = resolveSlides(bigSlideConfigs);
  const otherSlides = resolveSlides(otherSlideConfigs);

  return (
    <HomeClient
      sections={sections}
      slides={slides}
      otherSlides={otherSlides}
      imageCount={IMAGE_COUNT}
    />
  );
}
