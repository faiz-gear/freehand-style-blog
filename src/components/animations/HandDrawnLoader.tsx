"use client";

import React from "react";
import { motion } from "framer-motion";

interface HandDrawnLoaderProps {
  className?: string;
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
  text?: string;
}

export const HandDrawnLoader: React.FC<HandDrawnLoaderProps> = ({
  className = "",
  size = 80,
  strokeColor = "#333",
  strokeWidth = 2,
  text = "加载中...",
}) => {
  // 手绘风格的加载中SVG路径
  const loaderPath = `
    M ${size * 0.2},${size * 0.5} 
    C ${size * 0.3},${size * 0.3} ${size * 0.7},${size * 0.3} ${size * 0.8},${size * 0.5} 
    C ${size * 0.7},${size * 0.7} ${size * 0.3},${size * 0.7} ${size * 0.2},${size * 0.5} Z
  `;

  const pathAnimation = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 2,
          ease: "easeInOut",
        },
        opacity: { duration: 0.2 },
      },
    },
  };

  const rotateAnimation = {
    hidden: {
      rotate: 0,
    },
    visible: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "linear",
      },
    },
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        initial="hidden"
        animate="visible"
        variants={rotateAnimation}
        className="mb-2"
      >
        <motion.path
          d={loaderPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          variants={pathAnimation}
        />
      </motion.svg>

      {text && (
        <motion.p
          className="mt-2 text-base font-medium opacity-80"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0.8 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default HandDrawnLoader;
