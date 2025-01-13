import styles from "./styles.scss";
import Navbar from "./components/navbar";
import Carousel from "./components/carousel";
import Footer from "./components/footer";
import CentralMenu from "./components/centralMenu";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Carousel></Carousel>
      <CentralMenu></CentralMenu>
      <Footer></Footer>
    </div>
  );
}
