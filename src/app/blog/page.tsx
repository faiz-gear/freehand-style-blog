import Link from "next/link";
import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";

export const metadata = {
  title: "博客 | 手绘风格博客",
  description: "浏览我的技术文章、教程和生活随笔",
};

// 模拟博客文章数据，后续将通过Notion API获取
const mockPosts = [
  {
    id: "post-1",
    slug: "getting-started-with-nextjs",
    title: "Next.js入门指南：从零开始构建现代化Web应用",
    excerpt:
      "本文将介绍如何使用Next.js搭建一个现代化的React应用，包括路由、数据获取、样式设置等核心概念。",
    publishedAt: "2023-09-15",
    tags: ["Next.js", "React", "前端开发"],
    readingTime: "8分钟",
  },
  {
    id: "post-2",
    slug: "tailwindcss-handdrawn-styles",
    title: "使用TailwindCSS创建手绘风格UI：技巧与实践",
    excerpt:
      "探索如何结合TailwindCSS和手写风格字体、不规则边框等元素，打造独特的手绘风格网站界面。",
    publishedAt: "2023-10-22",
    tags: ["TailwindCSS", "UI设计", "手绘风格"],
    readingTime: "12分钟",
  },
  {
    id: "post-3",
    slug: "notion-api-integration",
    title: "将Notion作为CMS：使用Notion API构建个人博客",
    excerpt:
      "详细介绍如何使用Notion API获取内容，将你的Notion页面转变为功能完善的博客网站。",
    publishedAt: "2023-11-08",
    tags: ["Notion API", "CMS", "内容管理"],
    readingTime: "15分钟",
  },
  {
    id: "post-4",
    slug: "typescript-tricks",
    title: "TypeScript高级技巧：提升代码质量与开发效率",
    excerpt:
      "分享一些TypeScript的高级用法和技巧，帮助你写出更健壮、可维护的代码。",
    publishedAt: "2023-12-01",
    tags: ["TypeScript", "JavaScript", "编程技巧"],
    readingTime: "10分钟",
  },
  {
    id: "post-5",
    slug: "responsive-design-principles",
    title: "响应式设计原则：打造多设备友好的Web体验",
    excerpt:
      "探讨响应式设计的核心原则和最佳实践，确保你的网站在各种设备上都能提供出色的用户体验。",
    publishedAt: "2024-01-17",
    tags: ["响应式设计", "CSS", "用户体验"],
    readingTime: "9分钟",
  },
  {
    id: "post-6",
    slug: "creative-coding-experiments",
    title: "创意编程实验：用代码绘制艺术",
    excerpt:
      "分享一些有趣的创意编程实验，展示如何使用HTML Canvas、SVG和CSS动画创造视觉艺术作品。",
    publishedAt: "2024-02-05",
    tags: ["创意编程", "Canvas", "动画效果"],
    readingTime: "7分钟",
  },
];

// 提取所有标签，并去重
const allTags = Array.from(
  new Set(mockPosts.flatMap((post) => post.tags)),
).sort();

export default function BlogPage() {
  return (
    <PageContainer>
      <PageHeader
        title="博客文章"
        description="探索我的技术文章、教程和创意思考，涵盖前端开发、设计和个人成长等话题。"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* 侧边栏：标签过滤 */}
        <div className="md:col-span-1">
          <div className="border-ink-primary bg-paper-secondary sticky top-8 rounded-lg border-2 border-dashed p-4">
            <h2 className="pencil-line-animation mb-4 text-xl">文章标签</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-ink-primary hover:text-accent-blue-dark underline-hand font-handwriting-casual block transition-colors"
                >
                  全部文章 ({mockPosts.length})
                </Link>
              </li>
              {allTags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="text-ink-primary hover:text-accent-blue-dark underline-hand font-handwriting-casual block transition-colors"
                  >
                    {tag} (
                    {mockPosts.filter((post) => post.tags.includes(tag)).length}
                    )
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 主内容：文章列表 */}
        <div className="md:col-span-3">
          <div className="space-y-8">
            {mockPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

interface BlogPostCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    tags: string[];
    readingTime: string;
  };
}

function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="border-ink-light hover:border-ink-primary hover:shadow-hand rounded-lg border p-6 transition-all">
      <Link href={`/blog/${post.slug}`} className="group">
        <h2 className="pencil-line-animation group-hover:text-accent-blue mb-3 text-2xl transition-colors">
          {post.title}
        </h2>
      </Link>

      <div className="text-ink-secondary mb-4 flex items-center text-sm">
        <span className="mr-4">{formattedDate}</span>
        <span className="border-ink-light border-l pl-4">
          {post.readingTime}
        </span>
      </div>

      <p className="text-ink-secondary mb-4">{post.excerpt}</p>

      <div className="mb-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
            <span className="bg-paper-tertiary hover:bg-paper-primary text-ink-secondary rounded-lg px-3 py-1 text-xs transition-colors">
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
  );
}
