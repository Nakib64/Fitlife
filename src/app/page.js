import Image from "next/image";
import Description from "./component/Description";
import FeaturesSection from "./component/FeaturesSection/features";
import Navbar from "./component/Navbar/Navbar";
import Hero from "./component/Hero/Hero";
import Reviews from "./component/ReviewSection/Reviews";
import BMICalculator from "./component/BMICalculator/BMICalculator";
import FAQSection from "./component/FAQSection/FAQSection";
import Footer from "./component/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Description></Description>
      <BMICalculator></BMICalculator>
      <FeaturesSection></FeaturesSection>
      <div>
        <Reviews></Reviews>
      </div>
      <FAQSection></FAQSection>
    </div>
  );
}
