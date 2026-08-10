import React, { useEffect, useState } from "react";
import { LanguageProvider } from "@/lib/translations";
import { useLenis } from "@/lib/motion";
import { AgeGate, getAgeConfirmed } from "@/components/AgeGate";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Positioning } from "@/components/Positioning";
import { About } from "@/components/About";
import { Travel } from "@/components/Travel";
import { Philosophy } from "@/components/Philosophy";
import { IdealProfile } from "@/components/IdealProfile";
import { Compatibility } from "@/components/Compatibility";
import { Expectations } from "@/components/Expectations";
import { EditorialBreak } from "@/components/EditorialBreak";
import { Gallery } from "@/components/Gallery";
import { ExclusiveContent } from "@/components/ExclusiveContent";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { FinalStatement } from "@/components/FinalStatement";
import { Footer } from "@/components/Footer";

const Site = () => {
  useLenis();
  const [ageConfirmed, setAgeConfirmed] = useState(true);

  useEffect(() => {
    setAgeConfirmed(getAgeConfirmed());
  }, []);

  return (
    <div className="grain">
      <AgeGate confirmed={ageConfirmed} onConfirm={() => setAgeConfirmed(true)} />
      <Header />
      <main>
        <Hero />
        <Positioning />
        <About />
        <Travel />
        <Philosophy />
        <IdealProfile />
        <Compatibility />
        <Expectations />
        <EditorialBreak />
        <Gallery />
        <ExclusiveContent />
        <FAQ />
        <Contact />
        <FinalStatement />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  );
}

export default App;
