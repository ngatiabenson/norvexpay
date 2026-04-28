import { Footer } from "./(landing)/components/Footer";
import { HeroSection } from "./(landing)/components/HeroSection";
import { InteractiveDemo } from "./(landing)/components/InteractiveDemo";
import { Navbar } from "./(landing)/components/Navbar";
import { PaymentOptions } from "./(landing)/components/PaymentOptions";
import { Pricing } from "./(landing)/components/Pricing";

export default function LandingPage() {
  return (
    <div className="bg-[#F9FAFB] text-[#1E293B]">
      <HeroSection />
      <PaymentOptions />
      <InteractiveDemo />
      <Pricing />
    </div>
  );
}