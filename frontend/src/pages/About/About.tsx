import AboutSection from "../../components/AboutSection/AboutSection";
import Footer from "../../features/layout/Footer/Footer";
import "./about.css";
import ValueSection from "../../components/ValuesSection/ValueSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import LogoFull from "../../features/layout/Logo/LogoFull";

export default function About() {
  return (
    <main className="about-page">
      <LogoFull />
      <AboutSection />
      <ValueSection />
      <ContactSection />
      <Footer showTextBamboo={false} />
    </main>
  );
}
