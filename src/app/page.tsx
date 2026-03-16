import { NavBar } from "@/components/features/nav-bar/NavBar";
import { HeroSection } from "@/components/features/hero/HeroSection";
import { AboutSection } from "@/components/features/about/AboutSection";
import { ProjectsSection } from "@/components/features/projects/ProjectsSection";
import { ContactSection } from "@/components/features/contact/ContactSection";
import { Footer } from "@/components/features/footer/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="pt-0">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
