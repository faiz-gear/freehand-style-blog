import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";
import { getAllTags, getBlogPostsByTag } from "~/lib/notion/blog";
import type { BlogPostListItem } from "~/types/blog";

// 设置页面为动态渲染，确保每次访问都获取最新数据
export const dynamic = "force-dynamic";
export const revalidate = 0;

// 生成静态路径
export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}

// 生成元数据
export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `${decodedTag} | 标签 | 手绘风格博客`,
    description: `浏览所有关于 ${decodedTag} 的文章`,
  };
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);

  // 获取所有标签
  const allTags = await getAllTags();

  // 如果标签不存在，返回404
  if (!allTags.includes(decodedTag)) {
    notFound();
  }

  // 获取该标签下的所有文章
  const posts = await getBlogPostsByTag(decodedTag);

  return (
    <PageContainer>
      <PageHeader
        title={`标签: ${decodedTag}`}
        description={`浏览所有关于 ${decodedTag} 的文章和内容`}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* 侧边栏：标签列表 */}
        <div className="md:col-span-1">
          <div className="border-ink-primary bg-paper-secondary sticky top-8 rounded-lg border-2 border-dashed p-4">
            <h2 className="pencil-line-animation mb-4 text-xl">所有标签</h2>
            <ul className="space-y-2">
              {allTags.map((tagItem) => (
                <li key={tagItem}>
                  <Link
                    href={`/tags/${encodeURIComponent(tagItem)}`}
                    className={`font-handwriting-casual block transition-colors ${
                      tagItem === decodedTag
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
              <Link
                href="/blog"
                className="text-accent-blue hover:text-accent-blue-dark font-handwriting-casual inline-block transition-colors"
              >
                ← 返回所有文章
              </Link>
            </div>
          </div>
        </div>

        {/* 主内容：文章列表 */}
        <div className="md:col-span-3">
          {posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  currentTag={decodedTag}
                />
              ))}
            </div>
          ) : (
            <div className="border-ink-light rounded-lg border p-8 text-center">
              <p className="text-ink-secondary text-lg">
                暂无关于 {decodedTag} 的文章
              </p>
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
  );
}
