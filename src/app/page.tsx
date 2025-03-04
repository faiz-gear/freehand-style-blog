import HomeContentWithAnimations from "~/components/sections/HomeContentWithAnimations";
import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";
import { getAllPublishedBlogPosts } from "~/lib/notion/blog";

// 设置页面缓存策略，每24小时重新验证一次
export const dynamic = "force-static";
export const revalidate = 86400; // 24小时 = 86400秒

// 服务器组件
export default async function HomePage() {
  // 获取最新的3篇博客文章
  const latestPosts = await getAllPublishedBlogPosts();
  const recentPosts = latestPosts.slice(0, 4);

  return (
    <PageContainer>
      <PageHeader
        title="欢迎来到Lyle的博客"
        description="这是一个关于编程、设计与生活的博客，记录我的学习和思考。"
      />

      {/* 使用客户端动画组件 */}
      <HomeContentWithAnimations recentPosts={recentPosts} />
    </PageContainer>
  );
}
