"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  HandwritingText,
  PaperShake,
  InkSpread,
  HandDrawnBorder,
} from "~/components/animations";

// 定义博客文章类型
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

export default function HomeContentWithAnimations({
  recentPosts,
}: {
  recentPosts: BlogPost[];
}) {
  return (
    <>
      <section className="mb-12 mt-8">
        <PaperShake intensity={0.5}>
          <div className="border-ink-primary bg-paper-secondary rotate-hand-slight-right rounded-lg border-2 border-dashed p-6">
            <HandwritingText
              text="嗨 👋, 我是 Lyle Lu"
              tag="h2"
              className="mb-4"
            />
            <div className="text-ink-secondary space-y-4">
              <p>
                我是一名<strong>Web开发者👨🏻‍💻</strong>
                ，喜欢使用各种实用的计算机软件并构建美观的网站。
              </p>
              <p>
                我曾经梦想成为一名医生，但现实使我不得不学习一门技术💻。值得骄傲的是，我可以成功地使用CSS居中一个元素😋。
              </p>
              <p>
                目前，我是制造业的一名前端工程师。大学主修电子商务，但我很幸运选择了成为一名程序员，因为它让我能够不断接触新事物和新技术，感受互联网技术的魅力。
              </p>
              <p className="font-handwriting-casual text-accent-blue-dark text-lg">
                幸运的是，我认为我正走在一条我热爱的职业道路上 ❤️
              </p>
            </div>
          </div>
        </PaperShake>
      </section>

      {recentPosts.length > 0 && (
        <section className="my-12">
          <HandwritingText
            text="最新博客文章"
            tag="h2"
            className="mb-6 text-2xl font-semibold"
          />
          <div className="flex flex-col gap-6">
            {recentPosts.map((post) => (
              <InkSpread key={post.id} inkColor="rgba(120, 120, 120, 0.08)">
                <HomePostCard post={post} />
              </InkSpread>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/blog"
              className="border-ink-primary hover:bg-paper-secondary inline-block rounded-lg border-2 border-dashed px-6 py-2 transition-colors"
            >
              查看所有文章
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

// 特色卡片组件
interface FeaturedCardProps {
  title: string;
  description: string;
  href: string;
  className?: string;
}

function FeaturedCard({
  title,
  description,
  href,
  className = "",
}: FeaturedCardProps) {
  return (
    <HandDrawnBorder
      width={320}
      height={220}
      strokeColor="#666"
      className="h-full w-full"
    >
      <Link
        href={href}
        className={`bg-paper block h-full rounded-lg border-2 p-6 transition-transform duration-200 hover:scale-[1.02] ${className}`}
      >
        <h3 className="mb-3 text-lg font-semibold">{title}</h3>
        <p className="text-ink-secondary text-sm">{description}</p>
      </Link>
    </HandDrawnBorder>
  );
}

// 博客文章卡片组件
interface HomePostCardProps {
  post: BlogPost;
}

function HomePostCard({ post }: HomePostCardProps) {
  return (
    <div className="border-ink-primary hover:border-ink-accent hover:bg-paper-secondary rounded-lg border-2 border-dashed p-4 transition-all">
      <Link href={`/blog/${post.slug}`}>
        <h3 className="mb-2 line-clamp-2 break-words text-lg font-semibold">
          {post.title}
        </h3>
        <p className="text-ink-secondary mb-2 line-clamp-2">{post.summary}</p>
        <div className="text-ink-secondary flex items-center gap-4 text-sm">
          <span>{post.date}</span>
          <div className="flex gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-paper-tertiary rounded-full px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
