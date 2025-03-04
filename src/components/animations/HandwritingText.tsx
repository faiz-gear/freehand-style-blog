"use client";

import React from "react";
import { motion } from "framer-motion";

// 定义支持的HTML标签类型
type SupportedHTMLTags =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div";

interface HandwritingTextProps {
  text: string;
  tag?: SupportedHTMLTags;
  className?: string;
  staggerDuration?: number;
  letterDuration?: number;
}

export const HandwritingText: React.FC<HandwritingTextProps> = ({
  text,
  tag = "h2",
  className = "",
  staggerDuration = 0.05,
  letterDuration = 0.5,
}) => {
  // 将文本拆分为单个字符
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: 0.1 * i,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 5,
      x: -5,
      rotateZ: -2,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      rotateZ: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        duration: letterDuration,
      },
    },
  };

  // 使用动态标签创建motion组件
  const MotionComponent = React.useMemo(() => {
    switch (tag) {
      case "h1":
        return motion.h1;
      case "h2":
        return motion.h2;
      case "h3":
        return motion.h3;
      case "h4":
        return motion.h4;
      case "h5":
        return motion.h5;
      case "h6":
        return motion.h6;
      case "p":
        return motion.p;
      case "span":
        return motion.span;
      case "div":
        return motion.div;
      default:
        return motion.h2;
    }
  }, [tag]);

  return (
    <MotionComponent
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{
            // 微妙的随机旋转使文本看起来更加手写
            transform: `rotate(${(Math.random() - 0.5) * 4}deg)`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </MotionComponent>
  );
};

export default HandwritingText;
