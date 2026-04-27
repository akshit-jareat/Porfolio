import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Projects from "@/components/sections/Projects";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Achievements />
      <Projects />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
