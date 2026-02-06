"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Palette } from "lucide-react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      return () => heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 20,
    delay: Math.random() * 5,
  }));

  // Floating cards data
  const floatingElements = [
    { icon: Code2, label: "Development", color: "from-blue-500 to-cyan-500" },
    { icon: Palette, label: "Design", color: "from-purple-500 to-pink-500" },
    { icon: Sparkles, label: "Innovation", color: "from-orange-500 to-yellow-500" },
  ];

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/50 backdrop-blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}


      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <Sparkles size={16} className="text-purple-400" />
          <span className="font-2 text-sm text-white font-medium">
            Welcome to the future of design
          </span>
        </motion.div>

        {/* Main heading with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-8xl mb-6 bilgie font-medium !leading-[130%]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
         <span className="inline-block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Marya  {" "}
          </span>
          <br />
          <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient animation-delay-1000">
            Creative Developer
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-2 text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting beautiful digital experiences with cutting-edge technology
          and pixel-perfect design
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-2 group px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-lg flex items-center gap-2 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-shadow"
          >
            View My Work
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-white font-semibold text-lg hover:bg-white/10 transition-colors"
          >
            Get in Touch
          </motion.button>
        </motion.div>

        {/* Floating interactive cards */}
        <div className="hidden lg:block">
          {floatingElements.map((element, index) => {
            const Icon = element.icon;
            const angle = (index * 120 * Math.PI) / 180;
            const radius = 300;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={index}
                className="absolute cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: [x, x + 20, x],
                  y: [y, y - 20, y],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: index * 2,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div
                  className={`p-6 rounded-2xl bg-gradient-to-br ${element.color} bg-opacity-10 backdrop-blur-lg border border-white/20 shadow-2xl`}
                >
                  <Icon size={32} className="text-white mb-2" />
                  <p className="text-white font-semibold text-sm">
                    {element.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add required CSS animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}