"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function LoadingIndicator() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 路由变化开始时显示加载指示器
    const handleStart = () => {
      setIsLoading(true);
    };

    // 路由变化完成时隐藏加载指示器
    const handleComplete = () => {
      setTimeout(() => setIsLoading(false), 300);
    };

    // 监听路由变化
    handleStart();
    handleComplete();

    return () => {
      // 清理
    };
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full">
      <div className="animate-loading-bar bg-accent-blue h-full"></div>
    </div>
  );
}
