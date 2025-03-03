"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/images/placeholders/image-placeholder.svg",
  className = "",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // 处理图片加载完成
  const handleLoad = () => {
    setIsLoading(false);
  };

  // 处理图片加载错误
  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className="relative overflow-hidden">
      {/* 加载中的骨架屏 */}
      {isLoading && (
        <div className="bg-paper-secondary absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/placeholders/image-placeholder.svg"
            alt="加载中"
            className="h-full w-full object-cover opacity-70"
          />
        </div>
      )}

      {/* 实际图片 */}
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}
