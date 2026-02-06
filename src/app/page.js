import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/Abut";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutSection />
    </div>
  );
}
