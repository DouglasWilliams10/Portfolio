import Hero from "../components/hero/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Timeline from "../components/sections/Timeline";

export default function Home() {
    return (
        <main>
           <Hero />

            <About />

            <Skills />

            <Projects />

            <Timeline />
        </main>
    )
}
