import { HeroSection } from "./(landing)/components/HeroSection";
import { InteractiveDemo } from "./(landing)/components/InteractiveDemo";
import { PaymentOptions } from "./(landing)/components/PaymentOptions";
import { Pricing } from "./(landing)/components/Pricing";

export default function LandingPage() {
  return (
    <div className="text-[#1E293B]">
      <HeroSection />
     
      <InteractiveDemo />
      <Pricing />
    </div>
  );
}