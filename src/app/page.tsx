import Hero from "@/src/components/hero/Hero";
import About from "@/src/components/sections/About";
import Skills from "@/src/components/sections/Skills";
import Projects from "@/src/components/sections/Projects";
import Timeline from "@/src/components/sections/Timeline";
import Contact from "./contato/Contact";



export default function Home() {
  return (
    <main>
      <Hero />

      <About />

      <Skills />

      <Projects />

      <Timeline />

      <Contact />
    </main>
  );
}