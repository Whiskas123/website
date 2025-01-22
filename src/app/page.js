import Navbar from "./components/navbar";
import Carousel from "./components/carousel";
import Footer from "./components/footer";
import Link from "next/link";
import CentralMenu from "./components/centralMenu";
import { getSortedPostsData } from "./lib/posts";
import Newsletter from "./components/newsletter";

export default function Home() {
  const allPostsData = getSortedPostsData();
  return (
    <div>
      <Carousel></Carousel>
      <CentralMenu></CentralMenu>
      <Newsletter></Newsletter>
    </div>
  );
}
