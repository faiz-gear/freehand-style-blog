import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "~/components/shared/PageContainer";
import { getBlogPostBySlug, getAllPublishedBlogPosts } from "~/lib/notion/blog";
import { renderNotionBlocks } from "~/lib/notion/renderer";
import OptimizedImage from "~/components/ui/OptimizedImage";
import {
  type BlockObjectResponse,
  type RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// 设置页面缓存策略，每24小时重新验证一次
export const dynamic = "force-static";
export const revalidate = 86400; // 24小时 = 86400秒

// 生成静态路径
export async function generateStaticParams() {
  const posts = await getAllPublishedBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 生成元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到",
      description: "无法找到请求的文章",
    };
  }

  return {
    title: `${post.title} | 手绘风格博客`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // 格式化日期
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "未知日期";

  // 估算阅读时间（基于Notion内容）
  const calculateReadingTime = () => {
    if (!post.content || post.content.length === 0) {
      return "短文";
    }

    // 计算文本内容的总字数
    let totalTextLength = 0;

    post.content.forEach((block: BlockObjectResponse) => {
      // 段落块
      if (block.type === "paragraph") {
        const richText = block.paragraph.rich_text || [];
        richText.forEach((textItem: RichTextItemResponse) => {
          if (textItem.type === "text") {
            totalTextLength += textItem.text.content.length;
          }
        });
      }

      // 标题块
      else if (block.type === "heading_1") {
        const richText = block.heading_1.rich_text || [];
        richText.forEach((textItem: RichTextItemResponse) => {
          if (textItem.type === "text") {
            totalTextLength += textItem.text.content.length;
          }
        });
      } else if (block.type === "heading_2") {
        const richText = block.heading_2.rich_text || [];
        richText.forEach((textItem: RichTextItemResponse) => {
          if (textItem.type === "text") {
            totalTextLength += textItem.text.content.length;
          }
        });
      } else if (block.type === "heading_3") {
        const richText = block.heading_3.rich_text || [];
        richText.forEach((textItem: RichTextItemResponse) => {
          if (textItem.type === "text") {
            totalTextLength += textItem.text.content.length;
          }
        });
      }

      // 列表项
      else if (block.type === "bulleted_list_item") {
        const richText = block.bulleted_list_item.rich_text || [];
        richText.forEach((textItem: RichTextItemResponse) => {
          if (textItem.type === "text") {
            totalTextLength += textItem.text.content.length;
          }
        });
      } else if (block.type === "numbered_list_item") {
        const richText = block.numbered_list_item.rich_text || [];
        richText.forEach((textItem: RichTextItemResponse) => {
          if (textItem.type === "text") {
            totalTextLength += textItem.text.content.length;
          }
        });
      }

      // 待办事项
      else if (block.type === "to_do") {
        const richText = block.to_do.rich_text || [];
        richText.forEach((textItem: RichTextItemResponse) => {
          if (textItem.type === "text") {
            totalTextLength += textItem.text.content.length;
          }
        });
      }

      // 引用块
      else if (block.type === "quote") {
        const richText = block.quote.rich_text || [];
        richText.forEach((textItem: RichTextItemResponse) => {
          if (textItem.type === "text") {
            totalTextLength += textItem.text.content.length;
          }
        });
      }

      // 代码块
      else if (block.type === "code") {
        const richText = block.code.rich_text || [];
        richText.forEach((textItem: RichTextItemResponse) => {
          if (textItem.type === "text") {
            totalTextLength += textItem.text.content.length;
          }
        });
      }
    });

    // 假设每分钟阅读300字
    const minutes = Math.max(1, Math.ceil(totalTextLength / 300));
    return `${minutes}分钟阅读`;
  };

  const readingTime = calculateReadingTime();

  // 渲染Notion内容
  const renderedContent = post.content
    ? await renderNotionBlocks(post.content)
    : null;

  return (
    <PageContainer>
      <div className="mx-auto max-w-3xl">
        {/* 文章头部 */}
        <div className="mb-8 text-center">
          <Link
            href="/blog"
            className="text-accent-blue hover:text-accent-blue-dark font-handwriting-casual mb-4 inline-block transition-colors"
          >
            ← 返回文章列表
          </Link>

          <h1 className="pencil-line-animation mb-4 text-3xl md:text-4xl">
            {post.title}
          </h1>

          <div className="text-ink-secondary flex flex-wrap items-center justify-center gap-4 text-sm">
            <span>{formattedDate}</span>
            <span className="border-ink-light border-l pl-4">
              {readingTime}
            </span>
            {post.author?.name && (
              <span className="border-ink-light border-l pl-4">
                作者: {post.author.name}
              </span>
            )}
          </div>
        </div>

        {/* 标签 */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
              <span className="bg-paper-tertiary hover:bg-paper-primary text-ink-secondary rounded-lg px-3 py-1 text-sm transition-colors">
                {tag}
              </span>
            </Link>
          ))}
        </div>

        {/* 封面图片 */}
        {post.coverImage ? (
          <div className="mb-8">
            <OptimizedImage
              src={post.coverImage}
              alt={post.title}
              className="border-ink-light mx-auto rounded-lg border object-cover"
              style={{ maxHeight: "400px", width: "100%" }}
              width={1200}
              height={630}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="eager"
              quality={85}
              fallbackSrc="/images/placeholders/blog-placeholder.svg"
            />
          </div>
        ) : (
          <div className="bg-paper-secondary mb-8 h-48 rounded-lg border p-4 text-center italic text-gray-500">
            <img
              src="/images/placeholders/blog-placeholder.svg"
              alt="无封面图片"
              className="mx-auto h-full max-h-40 object-contain"
            />
          </div>
        )}

        {/* 文章内容 */}
        <div className="prose prose-lg prose-slate mx-auto max-w-none">
          {renderedContent ? (
            <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
          ) : (
            <div className="border-ink-light my-8 rounded-lg border p-8 text-center">
              <p className="text-ink-secondary text-lg">暂无内容</p>
              <p className="text-ink-tertiary mt-2">
                该文章内容可能正在编辑中，请稍后再来查看
              </p>
            </div>
          )}
        </div>

        {/* 文章底部 */}
        <div className="border-ink-light mt-12 border-t pt-8 text-center">
          <Link
            href="/blog"
            className="text-accent-blue hover:text-accent-blue-dark font-handwriting-casual inline-block transition-colors"
          >
            ← 返回文章列表
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
