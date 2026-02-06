"use client";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { motion } from "framer-motion";
export default function AboutSection() {
  return (
    <section className="relative 2xl:container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-28 lg:py-32 flex flex-col items-center">
      
      {/* Heading */}
      <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{once:true}}
      className="text-black bilgie text-4xl md:text-6xl">
        I help brands cut through the noise with high-performance web experiences
        that are fast, intuitive, and built to convert.
      </motion.h2>

      {/* Marquee */}
      <div className="mt-16 w-full">
        <Marquee
          speed={80}
          gradient={true}
          gradientWidth={120}
        >
          {[
            "/images/about-1.jpeg",
            "/images/about-2.jpeg",
            "/images/about-3.jpeg",
            "/images/about-4.jpeg",
            "/images/about-5.jpeg",
            "/images/about-6.jpeg",
          ].map((src, index) => (
            <div
              key={index}
              className="mx-4 h-[25vh] md:h-[35vh] flex items-center justify-center transition"
            >
              <Image
                src={src}
                alt="Brand logo"
                width={400}
                height={400}
                className="rounded-2xl h-full transition duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="mt-12 w-full">
        <Marquee
          speed={80}
          gradient={true}
          direction="right"
          gradientWidth={120}
        >
          {[
            "/images/about-1.jpeg",
            "/images/about-2.jpeg",
            "/images/about-3.jpeg",
            "/images/about-4.jpeg",
            "/images/about-5.jpeg",
            "/images/about-6.jpeg",
          ].map((src, index) => (
            <div
              key={index}
              className="mx-4 h-[25vh] md:h-[35vh] flex items-center justify-center transition"
            >
              <Image
                src={src}
                alt="Brand logo"
                width={400}
                height={400}
                className="rounded-2xl h-full transition duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
