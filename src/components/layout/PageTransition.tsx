"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // 当路径变化时，开始过渡动画
    if (pathname) {
      setIsTransitioning(true);

      // 短暂延迟后更新内容并结束过渡
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [pathname, children]);

  return (
    <div
      className={`transition-opacity duration-300 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {displayChildren}
    </div>
  );
}
