import Image from "next/image";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import FeaturesSection from "./component/FeaturesSection/features";

export default function Home() {
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <FeaturesSection/>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
