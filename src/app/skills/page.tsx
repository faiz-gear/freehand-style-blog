import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";

export const metadata = {
  title: "技能 | 手绘风格博客",
  description: "我的技术技能和专业领域展示",
};

export default function SkillsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="我的技能"
        description="这里展示了我的技术栈和专业领域，以及我在各个方面的能力水平。"
      />

      <div className="mb-12">
        <h2 className="pencil-line-animation mb-6">前端开发</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <SkillCard
            name="React & Next.js"
            level={90}
            description="构建现代化、高性能的用户界面和Web应用"
            className="rotate-hand-slight-left"
          />
          <SkillCard
            name="TypeScript"
            level={85}
            description="使用静态类型增强代码质量和开发体验"
            className="rotate-hand-slight-right"
          />
          <SkillCard
            name="CSS & TailwindCSS"
            level={95}
            description="创建响应式、美观的用户界面和动画效果"
          />
          <SkillCard
            name="React Native"
            level={70}
            description="开发跨平台移动应用程序"
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="pencil-line-animation mb-6">后端开发</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <SkillCard
            name="Node.js"
            level={80}
            description="构建高效的服务器端应用和API"
            className="rotate-hand-slight-right"
          />
          <SkillCard
            name="数据库设计"
            level={75}
            description="设计和优化关系型及NoSQL数据库"
            className="rotate-hand-slight-left"
          />
          <SkillCard
            name="RESTful API"
            level={85}
            description="设计和实现符合REST规范的API"
          />
          <SkillCard
            name="GraphQL"
            level={70}
            description="构建灵活的数据查询和操作API"
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="pencil-line-animation mb-6">设计与创意</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <SkillCard
            name="UI/UX设计"
            level={80}
            description="设计用户友好、美观的界面和交互体验"
            className="rotate-hand-slight-left"
          />
          <SkillCard
            name="手绘插画"
            level={85}
            description="创作手绘风格的图形和插画"
            className="rotate-hand-slight-right"
          />
          <SkillCard
            name="动画与交互"
            level={75}
            description="设计和实现网页动画和交互效果"
          />
          <SkillCard
            name="创意概念"
            level={90}
            description="构思创新的项目和设计理念"
          />
        </div>
      </div>

      <div className="border-ink-primary bg-paper-secondary rotate-hand-slight-right mb-12 rounded-lg border-2 border-dashed p-6">
        <h2 className="pencil-line-animation mb-4">其他技能</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="flex items-start">
            <span className="text-accent-blue mr-2 text-xl">•</span>
            <span className="text-ink-secondary">版本控制 (Git)</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-blue mr-2 text-xl">•</span>
            <span className="text-ink-secondary">CI/CD 流程</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-blue mr-2 text-xl">•</span>
            <span className="text-ink-secondary">测试与调试</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-blue mr-2 text-xl">•</span>
            <span className="text-ink-secondary">性能优化</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-blue mr-2 text-xl">•</span>
            <span className="text-ink-secondary">技术文档撰写</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent-blue mr-2 text-xl">•</span>
            <span className="text-ink-secondary">项目管理</span>
          </li>
        </ul>
      </div>
    </PageContainer>
  );
}

interface SkillCardProps {
  name: string;
  level: number;
  description: string;
  className?: string;
}

function SkillCard({
  name,
  level,
  description,
  className = "",
}: SkillCardProps) {
  // 确保level在0-100之间
  const normalizedLevel = Math.min(100, Math.max(0, level));

  return (
    <div
      className={`border-ink-primary bg-paper-primary shadow-hand rounded-lg border-2 p-5 transition-transform hover:scale-[1.02] ${className}`}
    >
      <h3 className="mb-2 text-xl">{name}</h3>
      <p className="text-ink-secondary mb-4 text-sm">{description}</p>
      <div className="mb-1 flex justify-between">
        <span className="text-ink-secondary font-handwriting-casual text-sm">
          技能熟练度
        </span>
        <span className="text-ink-secondary font-handwriting-casual text-sm">
          {normalizedLevel}%
        </span>
      </div>
      <div className="border-ink-light h-4 overflow-hidden rounded border">
        <div
          className="bg-accent-blue h-full rounded"
          style={{ width: `${normalizedLevel}%` }}
        ></div>
      </div>
    </div>
  );
}
