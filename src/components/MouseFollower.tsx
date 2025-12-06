import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 1. Track Mouse Position
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // 2. Detect Hover over clickable items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the element is interactive
      // We use !! to cast the result of closest() to a boolean (true if found, false if null)
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        !!target.closest("a") ||      // Fixed: Cast to boolean
        !!target.closest("button") || // Fixed: Cast to boolean
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Animation variants for the reticle states
  const reticleVariants: Variants = {
    default: {
      opacity: 1,
      height: 12,
      width: 12,
      rotate: 0,
      scale: 1,
      backgroundColor: "transparent",
      borderWidth: "2px", 
      borderColor: "#22d3ee", // Cyan
      borderRadius: "0%",
    },
    hover: {
      opacity: 1,
      height: 40, 
      width: 40,
      rotate: 45, // Rotate into a diamond
      scale: 1,
      backgroundColor: "rgba(34, 211, 238, 0.1)", 
      borderWidth: "1px", 
      borderColor: "#22d3ee",
      borderRadius: "0%", 
    },
  };

  const centerDotVariants: Variants = {
      default: { opacity: 1, scale: 1 },
      hover: { opacity: 0, scale: 0.5 }
  }

  return (
    <>
        {/* The main shape (Crosshair -> Diamond) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference border-cyan-400 box-border"
        style={{
            x: mousePosition.x,
            y: mousePosition.y,
            translateX: "-50%",
            translateY: "-50%",
        }}
        animate={isHovering ? "hover" : "default"}
        variants={reticleVariants}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      >
        {/* Internal lines to form the crosshair '+' in default state */}
        <motion.div 
            className="absolute top-1/2 left-0 w-full h-[2px] bg-cyan-400 -translate-y-1/2"
            animate={{ opacity: isHovering ? 0 : 1 }} 
        />
        <motion.div 
            className="absolute left-1/2 top-0 h-full w-[2px] bg-cyan-400 -translate-x-1/2"
            animate={{ opacity: isHovering ? 0 : 1 }} 
        />
      </motion.div>
      
      {/* Tiny central precision dot */}
       <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
            x: mousePosition.x,
            y: mousePosition.y,
            translateX: "-50%",
            translateY: "-50%",
        }}
        animate={isHovering ? "hover" : "default"}
        variants={centerDotVariants}
        transition={{ duration: 0.2 }}
       />
    </>
  );
}