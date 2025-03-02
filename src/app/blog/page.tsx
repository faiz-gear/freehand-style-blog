import Link from "next/link";
import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";
import { getAllPublishedBlogPosts, getAllTags } from "~/lib/notion/blog";

export const metadata = {
  title: "博客 | 手绘风格博客",
  description: "浏览我的技术文章、教程和生活随笔",
};

// 设置页面缓存策略，每24小时重新验证一次
export const dynamic = "force-static";
export const revalidate = 86400; // 24小时 = 86400秒

export default async function BlogPage() {
  // 从Notion API获取博客文章
  const posts = await getAllPublishedBlogPosts();
  // 从Notion API获取所有标签
  const allTags = await getAllTags();

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
                  全部文章 ({posts.length})
                </Link>
              </li>
              {allTags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="text-ink-primary hover:text-accent-blue-dark underline-hand font-handwriting-casual block transition-colors"
                  >
                    {tag} (
                    {posts.filter((post) => post.tags.includes(tag)).length})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 主内容：文章列表 */}
        <div className="md:col-span-3">
          {posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="border-ink-light rounded-lg border p-8 text-center">
              <p className="text-ink-secondary text-lg">暂无博客文章</p>
              <p className="text-ink-tertiary mt-2">请稍后再来查看</p>
            </div>
          )}
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
    date: string;
    summary: string;
    tags: string[];
    status: "Published" | "Revise" | "Draft" | "Idea";
  };
}

function BlogPostCard({ post }: BlogPostCardProps) {
  // 格式化日期
  const formattedDate = new Date(post.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 估算阅读时间（假设每分钟阅读300字）
  const readingTime = `${Math.max(1, Math.ceil(post.summary.length / 300))}分钟阅读`;

  return (
    <article className="border-ink-light hover:border-ink-primary hover:shadow-hand rounded-lg border p-6 transition-all">
      <Link href={`/blog/${post.slug}`} className="group">
        <h2 className="pencil-line-animation group-hover:text-accent-blue mb-3 text-2xl transition-colors">
          {post.title}
        </h2>
      </Link>

      <div className="text-ink-secondary mb-4 flex items-center text-sm">
        <span className="mr-4">{formattedDate}</span>
        <span className="border-ink-light border-l pl-4">{readingTime}</span>
      </div>

      <p className="text-ink-secondary mb-4">{post.summary}</p>

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
