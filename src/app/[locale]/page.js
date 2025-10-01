import BMICalculator from "./component/BMICalculator/BMICalculator";
import Description from "./component/Description/Description";
import FAQSection from "./component/FAQSection/FAQSection";
import FeaturesSection from "./component/FeaturesSection/features";
import GoodLife from "./component/GoodLife/GoodLife";
import Hero from "./component/Hero/Hero";
import { Reviews } from "./component/ReviewSection/Reviews";



export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Description></Description>
      <BMICalculator></BMICalculator>
      <FeaturesSection></FeaturesSection>
      <GoodLife></GoodLife>
      <div>
        <Reviews></Reviews>
      </div>
      <FAQSection></FAQSection>
    </div>
  );
}
