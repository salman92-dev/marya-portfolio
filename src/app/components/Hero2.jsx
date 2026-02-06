'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedHero() {
  // Track mouse position with motion values for smooth cursor interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create smooth spring animations for cursor following
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  // Detect if device supports hover (desktop vs mobile)
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch device on mount
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Update mouse position on mouse move
    const handleMouseMove = (e) => {
      if (!isTouchDevice) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isTouchDevice]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated gradient orb that follows cursor */}
      {!isTouchDevice && (
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(148, 163, 184, 0.08) 0%, transparent 70%)',
            x: useTransform(smoothMouseX, (x) => x - 250),
            y: useTransform(smoothMouseY, (y) => y - 250),
            filter: 'blur(60px)',
          }}
        />
      )}

      {/* Floating background orbs with parallax effect */}
      <FloatingOrb
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        size={400}
        color="rgba(100, 116, 139, 0.06)"
        initialX="20%"
        initialY="30%"
        parallaxStrength={0.03}
        isTouchDevice={isTouchDevice}
      />
      <FloatingOrb
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        size={300}
        color="rgba(148, 163, 184, 0.05)"
        initialX="75%"
        initialY="60%"
        parallaxStrength={0.05}
        delay={0.5}
        isTouchDevice={isTouchDevice}
      />
      <FloatingOrb
        mouseX={smoothMouseX}
        mouseY={smoothMouseY}
        size={250}
        color="rgba(71, 85, 105, 0.04)"
        initialX="50%"
        initialY="80%"
        parallaxStrength={0.04}
        delay={1}
        isTouchDevice={isTouchDevice}
      />

      {/* Main hero content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-5xl text-center">
          {/* Animated heading */}
          <motion.h1
            className="mb-6 text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Crafting Digital
            </span>
            <br />
            <span className="bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Experiences
            </span>
          </motion.h1>

          {/* Animated subtext */}
          <motion.p
            className="mb-10 text-lg sm:text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Designing and building modern web interfaces with precision.
          </motion.p>

          {/* CTA buttons with magnetic effect */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton
              mouseX={smoothMouseX}
              mouseY={smoothMouseY}
              primary
              isTouchDevice={isTouchDevice}
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              mouseX={smoothMouseX}
              mouseY={smoothMouseY}
              isTouchDevice={isTouchDevice}
            >
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}

// Floating orb component with parallax cursor interaction
function FloatingOrb({ 
  mouseX, 
  mouseY, 
  size, 
  color, 
  initialX, 
  initialY, 
  parallaxStrength = 0.03,
  delay = 0,
  isTouchDevice 
}) {
  // Transform mouse position into parallax offset
  const x = useTransform(
    mouseX,
    [0, window.innerWidth],
    isTouchDevice ? [0, 0] : [-window.innerWidth * parallaxStrength, window.innerWidth * parallaxStrength]
  );
  const y = useTransform(
    mouseY,
    [0, window.innerHeight],
    isTouchDevice ? [0, 0] : [-window.innerHeight * parallaxStrength, window.innerHeight * parallaxStrength]
  );

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        background: color,
        x,
        y,
        filter: 'blur(80px)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        // Gentle floating animation
        y: [0, -20, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: {
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
      }}
    />
  );
}

// Button component with magnetic cursor effect
function MagneticButton({ children, primary, mouseX, mouseY, isTouchDevice }) {
  const [buttonRef, setButtonRef] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate magnetic pull effect based on cursor distance
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);

  useEffect(() => {
    if (!buttonRef || isTouchDevice) return;

    const handleMagneticEffect = () => {
      const rect = buttonRef.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      
      const currentMouseX = mouseX.get();
      const currentMouseY = mouseY.get();

      // Calculate distance from button center
      const distanceX = currentMouseX - buttonCenterX;
      const distanceY = currentMouseY - buttonCenterY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Apply magnetic effect within 150px radius
      const magneticRadius = 150;
      if (distance < magneticRadius && !isHovered) {
        const strength = 0.3;
        magneticX.set(distanceX * strength);
        magneticY.set(distanceY * strength);
      } else if (!isHovered) {
        magneticX.set(0);
        magneticY.set(0);
      }
    };

    const unsubscribe = mouseX.on('change', handleMagneticEffect);
    return unsubscribe;
  }, [buttonRef, mouseX, mouseY, magneticX, magneticY, isHovered, isTouchDevice]);

  return (
    <motion.button
      ref={setButtonRef}
      className={`
        relative px-8 py-4 rounded-2xl font-medium text-base sm:text-lg
        transition-all duration-300 overflow-hidden
        ${primary 
          ? 'bg-gradient-to-br from-slate-100 to-slate-300 text-slate-950 shadow-lg shadow-slate-900/20' 
          : 'bg-slate-800/30 text-slate-200 border border-slate-700/50 backdrop-blur-sm'
        }
      `}
      style={{
        x: magneticX,
        y: magneticY,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        magneticX.set(0);
        magneticY.set(0);
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glassmorphism effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Button text */}
      <span className="relative z-10">{children}</span>
      
      {/* Glow effect for primary button */}
      {primary && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-400 opacity-0 blur-xl"
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}