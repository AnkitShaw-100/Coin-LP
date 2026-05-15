import { Hero } from "@/components/expense/Hero";
import { FeaturesSection } from "@/components/expense/FeaturesSection";
import { EmpowerSection } from "@/components/expense/EmpowerSection";
import { StatsBar } from "@/components/expense/StatsBar";
import { CurrencySection } from "@/components/expense/CurrencySection";
import { PricingSection } from "@/components/expense/PricingSection";
import { StepsSection } from "@/components/expense/StepsSection";
import { NewsletterSection, SiteFooter } from "@/components/expense/NewsletterSection";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Hero />
      <FeaturesSection />
      <EmpowerSection />
      <StatsBar />
      <CurrencySection />
      <PricingSection />
      <StepsSection />
      <NewsletterSection />
      <SiteFooter />
    </div>
  );
}
