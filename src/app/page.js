import Navbar from "./components/navbar";
import Carousel from "./components/carousel";
import Footer from "./components/footer";
import Link from "next/link";
import CentralMenu from "./components/centralMenu";
import { getSortedPostsData } from "./lib/posts";

export default function Home() {
  const allPostsData = getSortedPostsData();
  return (
    <div>
      <Carousel></Carousel>
      <CentralMenu></CentralMenu>
      <ul>
        {allPostsData.map(({ id, date, title, subtitle, author }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            {id}
            <br />
            {date}
            <br />
            {Array.isArray(author)
              ? author.map((name, index) => (
                  <span key={index}>
                    {index === 1 ? <strong>{name}</strong> : name}
                    {index < author.length - 1 && ", "}
                  </span>
                ))
              : author}
          </li>
        ))}
      </ul>
    </div>
  );
}
