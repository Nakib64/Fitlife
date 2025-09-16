import Image from "next/image";
import Footer from "./component/Footer";
import Description from "./component/Description";
import FeaturesSection from "./component/FeaturesSection/features";
import Navbar from "./component/Navbar/Navbar";
import Hero from "./component/Hero/Hero";
import Reviews from "./component/ReviewSection/Reviews";

export default function Home() {
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <Hero></Hero>
        <Description></Description>
        <FeaturesSection/>
        <div>
         <Reviews></Reviews>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
