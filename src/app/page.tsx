import { NavBar } from "@/components/features/nav-bar/NavBar";
import { LanguageToggle } from "@/components/features/language-toggle/LanguageToggle";
import { HeroSection } from "@/components/features/hero/HeroSection";
import { AboutSection } from "@/components/features/about/AboutSection";
import { ProjectsSection } from "@/components/features/projects/ProjectsSection";
import { ExperienceSection } from "@/components/features/experience/ExperienceSection";
import { ContactSection } from "@/components/features/contact/ContactSection";
import { Footer } from "@/components/features/footer/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <LanguageToggle />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
