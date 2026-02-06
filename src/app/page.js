import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/Abut";
import Footer from "./components/Footer";
import Contact from "./components/ContactForm";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutSection />
      <Contact />
      <Footer/>
      <div className="py-4">

      </div>
    </div>
  );
}
