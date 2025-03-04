"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface InkSpreadProps {
  children: React.ReactNode;
  className?: string;
  inkColor?: string;
  spreadRadius?: number;
  disabled?: boolean;
}

export const InkSpread: React.FC<InkSpreadProps> = ({
  children,
  className = "",
  inkColor = "rgba(0, 0, 0, 0.1)",
  spreadRadius = 80,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inkPosition, setInkPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    setIsHovered(true);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setInkPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered || disabled) return;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setInkPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 墨水扩散效果层 */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute z-0"
          initial={{
            width: 0,
            height: 0,
            x: inkPosition.x,
            y: inkPosition.y,
            opacity: 0,
          }}
          animate={{
            width: spreadRadius * 2,
            height: spreadRadius * 2,
            x: inkPosition.x - spreadRadius,
            y: inkPosition.y - spreadRadius,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
          style={{
            borderRadius: "50%",
            background: `radial-gradient(circle, ${inkColor} 0%, transparent 70%)`,
            filter: "blur(8px)",
            mixBlendMode: "multiply",
          }}
        />
      )}

      {/* 内容 */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default InkSpread;
