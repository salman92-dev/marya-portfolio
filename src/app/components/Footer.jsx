"use client";

import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight, Mail, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "#", label: "Behance", icon: "Be", color: "hover:text-blue-400" },
    { href: "#", label: "Instagram", icon: Instagram, color: "hover:text-pink-400" },
    { href: "#", label: "LinkedIn", icon: Linkedin, color: "hover:text-blue-500" },
  ];

  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <footer className="relative mx-2 mt-2 rounded-[32px] bg-[#0f0f0f] px-6 py-20 text-white md:px-16 lg:px-24 overflow-hidden pb-32">

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-3"
      >
        {/* Left Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl uppercase tracking-widest text-white font-2 font-medium mb-4 flex items-center gap-2">
              Stay Connected
            </p>

            <motion.a
              href="mailto:tarangvishwakarma@gmail.com"
              className="font-2 group flex items-center gap-2 text-lg text-neutral-200 hover:text-white transition-colors w-fit"
              whileHover={{ x: 5 }}
            >
              <Mail size={20} className="" />
              tarangvishwakarma@gmail.com
              <ArrowUpRight
                size={16}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.a>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="font-2 max-w-sm text-base text-neutral-400 leading-relaxed"
          >
            Transforming ideas into reality with creativity and passion.
            <br />
            <span>{"Let's"} connect!</span>
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hover:bg-none border-2 hover:border-white group mt-6 rounded-full bg-gradient-to-r from-white to-neutral-200 px-8 py-3 text-sm font-semibold text-black transition-all flex items-center gap-2  hover:text-white"
          >
            Download Resume
            <Download
              size={16}
            />
          </motion.button>
        </motion.div>

        {/* Center Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-2 text-lg font-2"
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
              className="group relative w-fit py-2"
            >
              <motion.span
                className="relative z-10 inline-block"
                animate={{
                  x: hoveredLink === index ? 10 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {link.label.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    animate={{
                      y: hoveredLink === index ? [-2, 2, -2] : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.05,
                      repeat: hoveredLink === index ? Infinity : 0,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>

            
              {/* Arrow icon */}
              <ArrowUpRight
                size={16}
                className={`inline-block ml-1 transition-all duration-300 ${
                  hoveredLink === index
                    ? "opacity-100 translate-x-1 -translate-y-1"
                    : "opacity-0"
                }`}
              />
            </Link>
          ))}
        </motion.div>

        {/* Social Media */}
        <motion.div variants={itemVariants}>
          <p className="mb-6 text-xl font-2 flex items-center gap-2">
            Social Media
          </p>

          <div className="flex gap-6 text-neutral-400">
            {socialLinks.map((social, index) => {
              const Icon = typeof social.icon === "string" ? null : social.icon;

              return (
                <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }}>
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    className={`group relative block ${social.color} transition-colors`}
                  >
                    {Icon ? (
                      <Icon size={28} />
                    ) : (
                      <span className="text-2xl font-bold">{social.icon}</span>
                    )}

                    {/* Glow effect */}
                    <motion.span
                      className="absolute inset-0 rounded-full bg-current blur-xl opacity-0 group-hover:opacity-30"
                      whileHover={{ scale: 1.5 }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Decorative element */}
          <motion.div
            className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-sm text-neutral-400 mb-2">Open for opportunities</p>
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-green-400 text-sm font-medium">Available for work</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Big Name with Letter Animation */}
      <div className="relative z-10 mt-24 text-center overflow-hidden">
        <motion.h2
          className="font-2 text-[clamp(3rem,10vw,8rem)] font-bold tracking-widest"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {"Marya".split("").map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              className="font-2 inline-block bg-gradient-to-br from-neutral-300 via-white to-neutral-300 bg-clip-text text-transparent hover:from-purple-400 hover:via-pink-400 hover:to-blue-400 transition-all duration-500 cursor-default"
              whileHover={{
                scale: 1.1,
                rotate: [-5, 5, -5],
                transition: { duration: 0.3 },
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-2 mt-4 text-white text-lg tracking-widest"
        >
          CREATIVE DEVELOPER & DESIGNER
        </motion.p>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="font-2 relative z-10 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white"
      >
        <p>© 2026 Marya. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </motion.div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </footer>
  );
}