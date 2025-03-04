import { notFound } from "next/navigation";
import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";
import { getAllTags, getBlogPostsByTag } from "~/lib/notion/blog";
import TagPageWithAnimations from "~/components/sections/TagPageWithAnimations";

// 设置页面缓存策略，每24小时重新验证一次
export const dynamic = "force-static";
export const revalidate = 86400; // 24小时 = 86400秒

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
  params: Promise<{ tag: string }>;
}) {
  const decodedTag = decodeURIComponent((await params).tag);

  return {
    title: `${decodedTag} | 标签 | 手绘风格博客`,
    description: `浏览所有关于 ${decodedTag} 的文章`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const decodedTag = decodeURIComponent((await params).tag);

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

      {/* 使用客户端动画组件替换原有内容 */}
      <TagPageWithAnimations
        posts={posts}
        allTags={allTags}
        currentTag={decodedTag}
      />
    </PageContainer>
  );
}
