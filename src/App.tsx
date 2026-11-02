import { useCallback, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Welcome } from "@/components/Welcome";
import { Destinations } from "@/components/Destinations";
import { DestinationModal } from "@/components/DestinationModal";
import { Experience } from "@/components/Experience";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TripPlanner, type PlanPreset } from "@/components/TripPlanner";
import { FeaturedJourneys } from "@/components/FeaturedJourneys";
import { Emotional } from "@/components/Emotional";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { DESTINATIONS, type Destination, type RegionFilter } from "@/data/site";

interface PlanPayload {
  destination?: string;
  message?: string;
}

export default function App() {
  const [preset, setPreset] = useState<PlanPreset>({ key: 0 });
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  const [region, setRegion] = useState<RegionFilter>("All");

  /** Scrolls to the planner and optionally pre-fills destination / message. */
  const handlePlan = useCallback((payload?: PlanPayload) => {
    setActiveDestination(null);
    setPreset((p) => ({ destination: payload?.destination, message: payload?.message, key: p.key + 1 }));
    window.setTimeout(() => {
      document.getElementById("plan")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }, []);

  /** Filters the destinations grid to a region and scrolls to it. */
  const handleRegion = useCallback((next: RegionFilter) => {
    setRegion(next);
    window.setTimeout(() => {
      document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }, []);

  const handleExplore = useCallback((id: string) => {
    setActiveDestination(DESTINATIONS.find((d) => d.id === id) ?? null);
  }, []);

  const closeModal = useCallback(() => setActiveDestination(null), []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar onPlan={() => handlePlan()} />

      <main id="main">
        <Hero onPlan={() => handlePlan()} onRegion={handleRegion} />
        <Welcome onPlan={() => handlePlan()} />
        <Destinations
          filter={region}
          onFilterChange={setRegion}
          onExplore={handleExplore}
          onPlan={(destination) => handlePlan({ destination })}
        />
        <Experience onPlan={() => handlePlan()} />
        <WhyChooseUs />
        <TripPlanner preset={preset} />
        <FeaturedJourneys onPlan={handlePlan} />
        <Emotional onPlan={() => handlePlan()} />
        <Contact />
      </main>

      <Footer onExplore={handleExplore} onPlan={() => handlePlan()} />

      <WhatsAppButton />

      <DestinationModal
        destination={activeDestination}
        onClose={closeModal}
        onPlan={(destination) => handlePlan({ destination })}
      />
    </>
  );
}
