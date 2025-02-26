import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "~/components/shared/PageContainer";

// 博客文章接口定义
interface BlogPost {
  title: string;
  publishedAt: string;
  author: string;
  coverImage: string;
  tags: string[];
  readingTime: string;
  content: string;
}

// 博客文章集合类型
type BlogPostsCollection = Record<string, BlogPost>;

// 模拟博客文章详情数据，后续将通过Notion API获取
const mockPostDetails: BlogPostsCollection = {
  "getting-started-with-nextjs": {
    title: "Next.js入门指南：从零开始构建现代化Web应用",
    publishedAt: "2023-09-15",
    author: "手绘风格博主",
    coverImage: "/images/blog/nextjs.jpg",
    tags: ["Next.js", "React", "前端开发"],
    readingTime: "8分钟",
    content: `
# Next.js入门指南：从零开始构建现代化Web应用

Next.js是一个基于React的全栈开发框架，它简化了许多React应用开发中的常见挑战，如路由、数据获取和渲染优化等。本文将带你从零开始，了解Next.js的核心概念，并通过实例展示如何构建一个现代化的Web应用。

## 为什么选择Next.js？

Next.js在React的基础上提供了更多开箱即用的功能:

- **服务端渲染 (SSR) 和静态站点生成 (SSG)** - 提升性能和SEO
- **文件系统路由** - 基于文件结构的直观路由系统
- **API路由** - 轻松创建后端API
- **内置CSS和Sass支持** - 简化样式管理
- **图像优化** - 自动处理响应式图片
- **零配置** - 开箱即用的开发体验

## 开始使用Next.js

### 创建你的第一个Next.js应用

使用create-next-app命令快速创建一个新项目:

\`\`\`bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
\`\`\`

这将启动一个开发服务器，你可以在浏览器中访问http://localhost:3000查看你的应用。

### 文件系统路由

Next.js使用文件系统进行路由，这意味着你可以通过在pages目录中创建文件来定义路由：

- \`pages/index.js\` → \`/\`
- \`pages/about.js\` → \`/about\`
- \`pages/blog/[slug].js\` → \`/blog/:slug\`

### 数据获取

Next.js提供了几种在组件中获取数据的方法：

**getStaticProps** - 在构建时获取数据，适用于静态内容：

\`\`\`jsx
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}
\`\`\`

**getServerSideProps** - 在每个请求上获取数据，适用于动态内容：

\`\`\`jsx
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}
\`\`\`

## 构建实用的Next.js应用

现在，让我们通过一些实际例子来展示Next.js的强大功能：

### 1. 创建响应式布局

\`\`\`jsx
// components/Layout.js
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
\`\`\`

### 2. 实现动态路由

\`\`\`jsx
// pages/blog/[slug].js
import { useRouter } from 'next/router';

export default function BlogPost({ post }) {
  const router = useRouter();
  
  // 显示加载状态
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPostSlugs();
  
  return {
    paths: posts.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  
  return {
    props: { post },
    revalidate: 60, // 增量静态再生成 (ISR)
  };
}
\`\`\`

## 结语

Next.js通过提供强大的功能和简化的API，使React开发变得更加高效。无论你是构建个人博客、电子商务网站还是企业应用，Next.js都能帮助你更快地实现目标，并提供出色的用户体验。

随着Web开发的不断发展，Next.js也在持续改进。通过学习和使用Next.js，你将能够掌握现代Web开发的最佳实践，构建高性能、可扩展的应用程序。

希望这篇入门指南对你有所帮助！下一步，我建议你尝试构建一个小项目，将这些概念付诸实践。祝你编码愉快！
    `,
  },
  "tailwindcss-handdrawn-styles": {
    title: "使用TailwindCSS创建手绘风格UI：技巧与实践",
    publishedAt: "2023-10-22",
    author: "手绘风格博主",
    coverImage: "/images/blog/tailwind.jpg",
    tags: ["TailwindCSS", "UI设计", "手绘风格"],
    readingTime: "12分钟",
    content: "这是文章的详细内容...(省略)",
  },
  // 更多文章...
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = mockPostDetails[slug];

  if (!post) {
    return {
      title: "文章未找到",
      description: "无法找到请求的文章",
    };
  }

  return {
    title: `${post.title} | 手绘风格博客`,
    description: post.content.substring(0, 160) + "...",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = mockPostDetails[slug];

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
              {post.readingTime}
            </span>
            <span className="border-ink-light border-l pl-4">
              作者: {post.author}
            </span>
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

        {/* 封面图片（暂时使用占位符） */}
        <div className="bg-paper-secondary mb-8 h-48 rounded-lg border p-4 text-center italic text-gray-500">
          {post.title} 文章封面图片
        </div>

        {/* 文章内容 */}
        <div className="border-ink-light card-hand rounded-lg border p-8">
          <div className="prose prose-lg">
            {/* 这里简单展示，实际实现应该使用markdown解析器或富文本编辑器 */}
            <div
              className="article-content text-ink-primary"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {post.content}
            </div>
          </div>
        </div>

        {/* 文章底部 */}
        <div className="border-ink-light mt-12 border-t pt-8">
          <h3 className="pencil-line-animation mb-4 text-xl">继续阅读</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(mockPostDetails)
              .filter(([itemSlug]) => itemSlug !== slug)
              .slice(0, 2)
              .map(([itemSlug, relatedPost]) => (
                <Link
                  key={itemSlug}
                  href={`/blog/${itemSlug}`}
                  className="border-ink-light hover:border-ink-primary hover:bg-paper-secondary group rounded border p-4 transition-all"
                >
                  <h4 className="group-hover:text-accent-blue mb-2 transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-ink-secondary text-sm">
                    {relatedPost.readingTime}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
