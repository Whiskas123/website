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
