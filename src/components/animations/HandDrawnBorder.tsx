"use client";

import React from "react";
import { motion } from "framer-motion";

interface HandDrawnBorderProps {
  children: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  animationDuration?: number;
}

export const HandDrawnBorder: React.FC<HandDrawnBorderProps> = ({
  children,
  className = "",
  width = 300,
  height = 200,
  strokeColor = "#333333",
  strokeWidth = 2,
  animationDuration = 1.5,
}) => {
  // 生成手绘风格的不规则路径
  const generateHandDrawnPath = () => {
    // 添加一些随机性使线条看起来像手绘的
    const jitter = (value: number, amount = 5) =>
      value + (Math.random() - 0.5) * amount;

    // 创建四个角点，带有轻微的抖动
    const topLeft = `${jitter(0)},${jitter(0)}`;
    const topRight = `${jitter(width)},${jitter(0)}`;
    const bottomRight = `${jitter(width)},${jitter(height)}`;
    const bottomLeft = `${jitter(0)},${jitter(height)}`;

    // 返回略微不规则的矩形路径
    return `M${topLeft} L${topRight} L${bottomRight} L${bottomLeft} Z`;
  };

  const path = generateHandDrawnPath();

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <motion.svg
        className="pointer-events-none absolute inset-0"
        width="100%"
        height="100%"
        viewBox={`-5 -5 ${width + 10} ${height + 10}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d={path}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: {
                  type: "spring",
                  duration: animationDuration,
                  bounce: 0,
                },
                opacity: { duration: 0.1 },
              },
            },
          }}
        />
      </motion.svg>
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default HandDrawnBorder;
