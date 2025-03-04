import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";
import { getAllPublishedBlogPosts, getAllTags } from "~/lib/notion/blog";
import BlogContentWithAnimations from "~/components/sections/BlogContentWithAnimations";

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

      {/* 使用客户端动画组件替换原有内容 */}
      <BlogContentWithAnimations posts={posts} allTags={allTags} />
    </PageContainer>
  );
}
