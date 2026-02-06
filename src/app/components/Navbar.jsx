"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/pixelzone", label: "Pixelzone" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[95%] max-w-5xl -translate-x-1/2">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative rounded-[28px] bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-neutral-900/95 backdrop-blur-xl shadow-2xl border border-white/10"
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

        <div className="relative px-6 py-4">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            {/* Profile/Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative purl text-3xl md:text-4xl font-bold bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                  Maria
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`purl relative px-6 py-2.5 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 rounded-2xl group ${
                    activeLink === link.href
                      ? "text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {activeLink === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/10 rounded-2xl border border-white/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </nav>

            {/* Desktop Contact Button */}
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 purl text-sm font-semibold uppercase tracking-wider rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 group"
            >
              <span>Contact</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen((p) => !p)}
              className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="lg:hidden overflow-hidden"
              >
                <div className="pt-6 pb-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
                  
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.href}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          href={link.href}
                          onClick={() => {
                            setOpen(false);
                            setActiveLink(link.href);
                          }}
                          className={`purl flex items-center justify-between px-5 py-4 text-base uppercase tracking-[0.15em] font-medium rounded-2xl transition-all duration-300 group ${
                            activeLink === link.href
                              ? "bg-white/10 text-white border border-white/20"
                              : "text-neutral-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight
                            size={18}
                            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                          />
                        </Link>
                      </motion.div>
                    ))}

                    <motion.div
                      custom={navLinks.length}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="mt-4"
                    >
                      <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="purl flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4 text-base uppercase tracking-wider font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 active:scale-95"
                      >
                        <span>Contact</span>
                        <ArrowUpRight size={18} />
                      </Link>
                    </motion.div>
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}