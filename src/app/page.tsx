import Link from "next/link";
import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";

export default function HomePage() {
  return (
    <PageContainer>
      <PageHeader
        title="欢迎来到我的手绘风格博客"
        description="这是一个关于编程、设计与生活的手绘风格博客，记录我的学习和思考。"
      />

      <section className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <FeaturedCard
          title="关于我"
          description="了解更多关于我的经历、技能和兴趣。"
          href="/about"
          className="rotate-hand-slight-left"
        />
        <FeaturedCard
          title="技能"
          description="我的技术栈和专业领域。"
          href="/skills"
          className="rotate-hand-slight-right"
        />
        <FeaturedCard
          title="项目"
          description="查看我的最新项目和作品集。"
          href="/projects"
        />
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="pencil-line-animation">最新文章</h2>
          <Link
            href="/blog"
            className="underline-hand hover:text-ink-accent transition-colors"
          >
            查看所有文章
          </Link>
        </div>
        <div className="divider-hand mb-8"></div>

        <div className="grid gap-6 md:grid-cols-2">
          <p className="text-ink-secondary mt-12 text-center italic">
            博客文章即将上线，敬请期待...
          </p>
        </div>
      </section>
    </PageContainer>
  );
}

interface FeaturedCardProps {
  title: string;
  description: string;
  href: string;
  className?: string;
}

function FeaturedCard({
  title,
  description,
  href,
  className = "",
}: FeaturedCardProps) {
  return (
    <Link href={href}>
      <div
        className={`border-ink-primary hover:border-ink-accent hover:bg-paper-secondary rounded-lg border-2 border-dashed p-6 transition-all ${className}`}
      >
        <h3 className="pencil-line-animation mb-2">{title}</h3>
        <p className="text-ink-secondary">{description}</p>
      </div>
    </Link>
  );
}
