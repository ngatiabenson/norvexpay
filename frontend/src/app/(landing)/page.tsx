import { HeroSection } from "./components/HeroSection";
import { InteractiveDemo } from "./components/InteractiveDemo";
import { PaymentOptions } from "./components/PaymentOptions";
import { Pricing } from "./components/Pricing";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InteractiveDemo />
      <PaymentOptions />
      <Pricing />
    </>
  );
}