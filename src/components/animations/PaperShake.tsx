"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

interface PaperShakeProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  disabled?: boolean;
}

export const PaperShake: React.FC<PaperShakeProps> = ({
  children,
  className = "",
  intensity = 1,
  disabled = false,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimationControls();

  // 监听鼠标移动
  useEffect(() => {
    if (disabled) return;

    const updateMousePosition = (e: MouseEvent) => {
      // 计算旋转角度，基于鼠标位置与窗口中心的距离
      const x =
        ((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) *
        1.5 *
        intensity;
      const y =
        ((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) *
        1.5 *
        intensity;

      setPosition({ x, y });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [intensity, disabled]);

  // 当位置改变时应用动画
  useEffect(() => {
    if (disabled) return;

    void controls.start({
      rotateX: -position.y,
      rotateY: position.x,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    });
  }, [position, controls, disabled]);

  return (
    <motion.div
      className={`perspective-1000 transform-gpu ${className}`}
      animate={controls}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
};

export default PaperShake;
