import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";

export const metadata = {
  title: "技能 | 手绘风格博客",
  description: "Lyle Lu的技术技能和专业领域展示",
};

export default function SkillsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="我的技能"
        description="这里展示了我的技术栈和专业领域，正在努力乘上AI时代的快车"
      />

      <div className="mb-12">
        <h2 className="pencil-line-animation mb-6">前端开发</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <SkillCard
            name="HTML5 & CSS3"
            description="构建现代化、语义化的网页结构和样式"
            className="rotate-hand-slight-left"
          />
          <SkillCard
            name="JavaScript"
            description="使用现代JavaScript开发交互式网页应用"
            className="rotate-hand-slight-right"
          />
          <SkillCard
            name="TypeScript"
            description="使用静态类型增强代码质量和开发体验"
          />
          <SkillCard
            name="React"
            description="构建高效、可复用的用户界面组件"
          />
          <SkillCard
            name="Vue.js"
            description="开发渐进式JavaScript框架应用"
            className="rotate-hand-slight-left"
          />
          <SkillCard
            name="Three.js"
            description="创建3D图形和动画效果"
            className="rotate-hand-slight-right"
          />
          <SkillCard
            name="Next.js"
            description="构建高性能的React应用和静态网站"
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="pencil-line-animation mb-6">后端开发</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <SkillCard
            name="NestJS"
            description="构建高效的服务器端应用和API"
            className="rotate-hand-slight-right"
          />
          <SkillCard
            name="MySQL"
            description="设计和优化关系型数据库"
            className="rotate-hand-slight-left"
          />
          <SkillCard
            name="MongoDB"
            description="使用非关系型数据库"
            className="rotate-hand-slight-left"
          />
          <SkillCard
            name="Redis"
            description="使用缓存提升性能"
            className="rotate-hand-slight-right"
          />
          <SkillCard
            name="Prisma"
            description="ORM快速构建数据库模型"
            className="rotate-hand-slight-right"
          />
          <SkillCard
            name="Zod"
            description="构建安全的数据验证"
            className="rotate-hand-slight-left"
          />
          <SkillCard
            name="RxJS"
            description="响应式编程"
            className="rotate-hand-slight-left"
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="pencil-line-animation mb-6">AI与新技术</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <SkillCard
            name="人工智能 (AI)"
            description="探索和应用人工智能技术"
            className="rotate-hand-slight-left"
          />
          <SkillCard
            name="大语言模型 (LLM)"
            description="利用大语言模型开发智能应用"
            className="rotate-hand-slight-right"
          />
          <SkillCard
            name="检索增强生成 (RAG)"
            description="实现基于检索的生成式AI应用"
          />
          <SkillCard
            name="智能代理 (Agent)"
            description="开发自主智能代理系统"
          />
        </div>
      </div>

      <div className="border-ink-primary bg-paper-secondary rotate-hand-slight-right mb-12 rounded-lg border-2 border-dashed p-6">
        <h2 className="pencil-line-animation mb-4">开发工具与技能</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="flex items-start">
            <span className="text-accent-blue mr-2 text-xl">•</span>
            <span className="text-ink-secondary">Git版本控制</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-blue mr-2 text-xl">•</span>
            <span className="text-ink-secondary">Docker容器化</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-blue mr-2 text-xl">•</span>
            <span className="text-ink-secondary">前端性能优化</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-blue mr-2 text-xl">•</span>
            <span className="text-ink-secondary">响应式设计</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-blue mr-2 text-xl">•</span>
            <span className="text-ink-secondary">Web应用架构设计</span>
          </li>
        </ul>
      </div>
    </PageContainer>
  );
}

interface SkillCardProps {
  name: string;
  description: string;
  className?: string;
}

function SkillCard({ name, description, className = "" }: SkillCardProps) {
  return (
    <div
      className={`border-ink-primary bg-paper-primary shadow-hand rounded-lg border-2 p-5 transition-transform hover:scale-[1.02] ${className}`}
    >
      <h3 className="mb-2 text-xl">{name}</h3>
      <p className="text-ink-secondary text-sm">{description}</p>
    </div>
  );
}
