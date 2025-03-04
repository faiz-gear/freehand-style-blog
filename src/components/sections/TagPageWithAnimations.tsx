"use client";

import Link from "next/link";
import React from "react";
import {
  HandwritingText,
  InkSpread,
  PaperShake,
  HandDrawnBorder,
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

interface TagPageWithAnimationsProps {
  posts: BlogPost[];
  allTags: string[];
  currentTag: string;
}

export default function TagPageWithAnimations({
  posts,
  allTags,
  currentTag,
}: TagPageWithAnimationsProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  // 模拟加载状态转换
  const handleTagClick = () => {
    setIsLoading(true);
    // 800ms后取消加载状态
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
      {/* 侧边栏：标签列表 */}
      <div className="md:col-span-1">
        <PaperShake intensity={0.3}>
          <div className="border-ink-primary bg-paper-secondary sticky top-8 rounded-lg border-2 border-dashed p-4">
            <HandwritingText
              text="所有标签"
              tag="h2"
              className="mb-4 text-xl"
            />
            <ul className="space-y-2">
              {allTags.map((tagItem) => (
                <li key={tagItem}>
                  <Link
                    href={`/tags/${encodeURIComponent(tagItem)}`}
                    onClick={() => handleTagClick()}
                    className={`font-handwriting-casual block transition-colors ${
                      tagItem === currentTag
                        ? "text-accent-blue-dark font-bold"
                        : "text-ink-primary hover:text-accent-blue-dark underline-hand"
                    }`}
                  >
                    {tagItem}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <InkSpread inkColor="rgba(120, 170, 220, 0.15)" spreadRadius={50}>
                <Link
                  href="/blog"
                  className="text-accent-blue hover:text-accent-blue-dark font-handwriting-casual inline-block transition-colors"
                >
                  ← 返回所有文章
                </Link>
              </InkSpread>
            </div>
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
                  <BlogPostCard post={post} currentTag={currentTag} />
                </InkSpread>
              ))
            ) : (
              <div className="border-ink-light rounded-lg border p-8 text-center">
                <HandwritingText
                  text={`暂无关于 ${currentTag} 的文章`}
                  tag="p"
                  className="text-lg"
                />
                <p className="text-ink-tertiary mt-2">请稍后再来查看</p>
              </div>
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
  currentTag: string;
}

function BlogPostCard({ post, currentTag }: BlogPostCardProps) {
  // 格式化日期
  const formattedDate = new Date(post.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 估算阅读时间（假设每分钟阅读300字）
  const readingTime = `${Math.max(1, Math.ceil(post.summary.length / 300))}分钟阅读`;

  return (
    <HandDrawnBorder height={280} className="w-full">
      <article className="border-ink-light hover:border-ink-primary hover:shadow-hand h-full rounded-lg border p-6 transition-all">
        <Link href={`/blog/${post.slug}`} className="group">
          <h2 className="group-hover:text-accent-blue mb-3 line-clamp-2 break-words text-2xl transition-colors">
            {post.title}
          </h2>
        </Link>

        <div className="text-ink-secondary mb-4 flex items-center text-sm">
          <span className="mr-4">{formattedDate}</span>
          <span className="border-ink-light border-l pl-4">{readingTime}</span>
        </div>

        <p className="text-ink-secondary mb-4 line-clamp-2">{post.summary}</p>

        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
              <span
                className={`rounded-lg px-3 py-1 text-xs transition-colors ${
                  tag === currentTag
                    ? "bg-accent-blue-light text-ink-primary"
                    : "bg-paper-tertiary hover:bg-paper-primary text-ink-secondary"
                }`}
              >
                {tag}
              </span>
            </Link>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="text-accent-blue hover:text-accent-blue-dark font-handwriting-casual inline-block transition-colors"
        >
          阅读全文 →
        </Link>
      </article>
    </HandDrawnBorder>
  );
}
