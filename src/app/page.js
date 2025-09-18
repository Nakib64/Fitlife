import Image from "next/image";
import Footer from "./component/Footer";
import Description from "./component/Description";
import FeaturesSection from "./component/FeaturesSection/features";
import Navbar from "./component/Navbar/Navbar";
import Hero from "./component/Hero/Hero";
import Reviews from "./component/ReviewSection/Reviews";
import BMICalculator from "./component/BMICalculator/BMICalculator";
import FAQSection from "./component/FAQSection/FAQSection";

export default function Home() {
  return (
    <div>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <Hero></Hero>
        <Description></Description>
        <BMICalculator></BMICalculator>
        <FeaturesSection></FeaturesSection>
        <div>
         <Reviews></Reviews>
        </div>
         <FAQSection></FAQSection>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
