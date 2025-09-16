import Image from "next/image";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Description from "./component/Description";
import FeaturesSection from "./component/FeaturesSection/features";

export default function Home() {
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <Description></Description>
        <FeaturesSection/>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
