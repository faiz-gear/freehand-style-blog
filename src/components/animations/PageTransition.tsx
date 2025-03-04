"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = "",
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.98,
      rotateY: -2,
    },
    enter: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.98,
      rotateY: 2,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // 添加滚动到顶部的效果
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 ${className}`}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
