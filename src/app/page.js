import { HeroSection } from "@/components/home/hero-section"
import { OverviewSection } from "@/components/home/overview-section"
import { KeyTopicsSection } from "@/components/home/key-topics-section"
import { CTASection } from "@/components/home/cta-section"
import { WildfiresSection } from "@/components/home/wildfires-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b border-border">
        <HeroSection />
      </div>
      <div className="border-b border-border">
        <OverviewSection />
      </div>
      <div className="border-b border-border">
        <WildfiresSection />
      </div>
      <div className="border-b border-border">
        <KeyTopicsSection />
      </div>
      <div className="border-b border-border">
        <CTASection />
      </div>
    </div>
  )
}





