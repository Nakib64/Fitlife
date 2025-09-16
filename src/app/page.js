import Image from "next/image";
import Footer from "./component/Footer";
import FeaturesSection from "./component/FeaturesSection/features";
import Navbar from "./component/Navbar/Navbar";

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
