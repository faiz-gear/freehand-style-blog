import Link from "next/link";
import PageContainer from "~/components/shared/PageContainer";

export const metadata = {
  title: "页面未找到 | 手绘风格博客",
  description: "很抱歉，您访问的页面不存在",
};

export default function NotFound() {
  return (
    <PageContainer className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="pencil-line-animation mb-3 text-8xl font-bold">404</h1>
        <div className="border-ink-primary relative -mt-3 mb-6 h-0.5 w-32 border-t-2 border-dashed"></div>
        <h2 className="text-ink-primary rotate-hand-slight-left mb-4 text-3xl font-medium">
          哎呀！页面走丢了
        </h2>
        <p className="text-ink-secondary opacity-hand-medium mb-6 max-w-md">
          看起来您想要访问的页面消失在了纸张的边缘。它可能被橡皮擦掉了，
          或者只是暂时藏在了笔记本的某个角落里。
        </p>
      </div>

      <div className="bg-paper-accent border-ink-primary rotate-hand-slight-right mb-10 max-w-lg rounded-lg border-2 border-dashed p-6">
        <div className="mb-4 flex justify-center">
          <div className="opacity-hand-medium text-8xl">🔍</div>
        </div>
        <p className="text-ink-secondary mb-2">
          您可以尝试返回首页，或者查看其他有趣的页面：
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              href="/"
              className="text-ink-accent underline-hand hover:text-ink-primary"
            >
              ✏️ 返回首页
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-ink-accent underline-hand hover:text-ink-primary"
            >
              📝 浏览博客文章
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="text-ink-accent underline-hand hover:text-ink-primary"
            >
              🎨 查看项目作品
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-ink-accent underline-hand hover:text-ink-primary"
            >
              ✉️ 联系我
            </Link>
          </li>
        </ul>
      </div>

      <div className="text-ink-secondary opacity-hand-light italic">
        <p>如果您认为这是一个错误，请告诉我，我会尽快修复它。</p>
      </div>
    </PageContainer>
  );
}
