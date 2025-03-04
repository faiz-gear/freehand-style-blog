"use client";

import Link from "next/link";
import React from "react";
import {
  HandwritingText,
  InkSpread,
  PaperShake,
  HandDrawnLoader,
} from "~/components/animations";

// 博客文章类型定义
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  status: "Published" | "Revise" | "Draft" | "Idea";
}

interface BlogContentWithAnimationsProps {
  posts: BlogPost[];
  allTags: string[];
  selectedTag?: string;
}

export default function BlogContentWithAnimations({
  posts,
  allTags,
  selectedTag,
}: BlogContentWithAnimationsProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  // 模拟加载状态转换
  const handleTagClick = () => {
    setIsLoading(true);
    // 500ms后取消加载状态
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
      {/* 侧边栏：标签过滤 */}
      <div className="md:col-span-1">
        <PaperShake intensity={0.3}>
          <div className="border-ink-primary bg-paper-secondary sticky top-8 rounded-lg border-2 border-dashed p-4">
            <HandwritingText
              text="文章标签"
              tag="h2"
              className="mb-4 text-xl"
            />
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  onClick={() => handleTagClick()}
                  className={`text-ink-primary hover:text-accent-blue-dark underline-hand font-handwriting-casual block transition-colors ${
                    !selectedTag ? "text-accent-blue-dark font-semibold" : ""
                  }`}
                >
                  全部文章 ({posts.length})
                </Link>
              </li>
              {allTags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/tags/${encodeURIComponent(tag)}`}
                    onClick={() => handleTagClick()}
                    className={`text-ink-primary hover:text-accent-blue-dark underline-hand font-handwriting-casual block transition-colors ${
                      selectedTag === tag
                        ? "text-accent-blue-dark font-semibold"
                        : ""
                    }`}
                  >
                    {tag} (
                    {posts.filter((post) => post.tags.includes(tag)).length})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </PaperShake>
      </div>

      {/* 文章列表 */}
      <div className="md:col-span-3">
        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <HandDrawnLoader text="加载文章中..." />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <InkSpread
                  key={post.id}
                  inkColor="rgba(120, 120, 120, 0.08)"
                  spreadRadius={100}
                >
                  <BlogPostCard post={post} />
                </InkSpread>
              ))
            ) : (
              <p className="text-ink-secondary mt-12 text-center italic">
                没有找到符合条件的文章...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 博客文章卡片组件
interface BlogPostCardProps {
  post: BlogPost;
}

function BlogPostCard({ post }: BlogPostCardProps) {
  // 格式化日期
  const formattedDate = new Date(post.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="border-ink-light hover:border-ink-primary hover:shadow-hand h-full w-full rounded-lg border p-5 transition-all">
      <Link href={`/blog/${post.slug}`} className="group">
        <h3 className="group-hover:text-accent-blue mb-2 line-clamp-2 break-words text-xl transition-colors">
          {post.title}
        </h3>
      </Link>

      <div className="text-ink-secondary mb-3 text-sm">
        <span>{formattedDate}</span>
      </div>

      <p className="text-ink-secondary mb-3 line-clamp-2 text-sm">
        {post.summary}
      </p>

      <div className="mb-3 flex flex-wrap gap-1">
        {post.tags.slice(0, 3).map((tag) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
            <span className="bg-paper-tertiary hover:bg-paper-primary text-ink-secondary rounded-lg px-2 py-0.5 text-xs transition-colors">
              {tag}
            </span>
          </Link>
        ))}
        {post.tags.length > 3 && (
          <span className="text-ink-tertiary text-xs">
            +{post.tags.length - 3}
          </span>
        )}
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="text-accent-blue hover:text-accent-blue-dark font-handwriting-casual inline-block text-sm transition-colors"
      >
        阅读全文 →
      </Link>
    </article>
  );
}
