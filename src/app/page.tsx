import { AbcRoot } from "@/components/common/AbcRoot";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { Background } from "@/components/common/Background";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { Products } from "@/sections/Products";
import { Technology } from "@/sections/Technology";
import { Inquiry } from "@/sections/Inquiry";
import { Contact } from "@/sections/Contact";

/**
 * The Ganga Group single-page site. Order and dividers mirror the original:
 * hero → about → (accent rule) → services → apps → (violet rule) → tech →
 * inquiry → contact, all inside the themed root with the fixed scroll bar,
 * ambient background and navigation.
 */
export default function Home() {
  return (
    <AbcRoot>
      <ScrollProgress />
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SectionDivider color="accent" />
        <Services />
        <Products />
        <SectionDivider color="violet" />
        <Technology />
        <Inquiry />
        <Contact />
      </main>
      <Footer />
    </AbcRoot>
  );
}
