import Link from "next/link";
import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";
import OptimizedImage from "~/components/ui/OptimizedImage";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNotion,
  SiReact,
  SiFirebase,
  SiMongodb,
  SiNodedotjs,
  SiRedux,
  SiHtml5,
  SiJavascript,
  SiGreensock,
  SiFigma,
  SiVuedotjs,
  SiExpress,
  SiGooglemaps,
  SiCapacitor,
  SiElectron,
  SiSqlite,
} from "react-icons/si";
import { DiJavascript } from "react-icons/di";

export const metadata = {
  title: "项目 | 手绘风格博客",
  description: "我的项目作品集展示",
};

const TECH_ICONS: Record<string, React.ComponentType> = {
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  TailwindCSS: SiTailwindcss,
  "Notion API": SiNotion,
  React: SiReact,
  "React Native": SiReact,
  "Canvas API": DiJavascript,
  WebGL: DiJavascript,
  Firebase: SiFirebase,
  Redux: SiRedux,
  "Node.js": SiNodedotjs,
  MongoDB: SiMongodb,
  "HTML/CSS": SiHtml5,
  JavaScript: SiJavascript,
  GSAP: SiGreensock,
  Figma: SiFigma,
  "Vue.js": SiVuedotjs,
  Express: SiExpress,
  "Google Maps API": SiGooglemaps,
  Capacitor: SiCapacitor,
  Electron: SiElectron,
  SQLite: SiSqlite,
  "EPUB.js": DiJavascript,
};

export default function ProjectsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="我的项目"
        description="这里展示了我的一些项目作品，涵盖了前端开发、设计和创意方面的工作。"
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          title="手绘风格博客"
          category="Web开发"
          description="基于Next.js开发的手绘风格个人博客，使用Notion API获取内容，展示了创意设计与技术实现的结合。"
          technologies={["Next.js", "TypeScript", "TailwindCSS", "Notion API"]}
          imageUrl="/images/projects/blog.jpg"
          demoUrl="/"
          repoUrl="https://github.com/username/project"
          className="rotate-hand-slight-left"
        />

        <ProjectCard
          title="水彩效果图像编辑器"
          category="Web应用"
          description="一个在线图像编辑工具，可以将普通照片转换为水彩画风格，支持多种艺术滤镜和效果。"
          technologies={["React", "Canvas API", "WebGL", "Firebase"]}
          imageUrl="/images/projects/editor.jpg"
          demoUrl="https://example.com"
          className="rotate-hand-slight-right"
        />

        <ProjectCard
          title="手写风格任务管理器"
          category="移动应用"
          description="一款具有手写风格UI的任务管理应用，让枯燥的任务清单变得有趣而富有个性。"
          technologies={["React Native", "Redux", "Node.js", "MongoDB"]}
          imageUrl="/images/projects/todo.jpg"
          demoUrl="https://example.com"
          repoUrl="https://github.com/username/project"
        />

        <ProjectCard
          title="创意作品集网站"
          category="Web设计"
          description="为一位插画师设计和开发的作品集网站，展示了独特的视觉效果和流畅的用户体验。"
          technologies={["HTML/CSS", "JavaScript", "GSAP", "Figma"]}
          imageUrl="/images/projects/portfolio.jpg"
          demoUrl="https://example.com"
        />

        <ProjectCard
          title="旅行日记应用"
          category="Web & 移动应用"
          description="一款记录旅行经历的应用，具有地图标记、照片集和手绘风格日记功能，支持Web和移动端。"
          technologies={["Vue.js", "Express", "Google Maps API", "Capacitor"]}
          imageUrl="/images/projects/travel.jpg"
          demoUrl="https://example.com"
          repoUrl="https://github.com/username/project"
          className="rotate-hand-slight-right"
        />

        <ProjectCard
          title="电子书阅读器"
          category="桌面应用"
          description="一个具有纸张质感和手绘元素的电子书阅读器，提供舒适的阅读体验和丰富的标注功能。"
          technologies={["Electron", "React", "SQLite", "EPUB.js"]}
          imageUrl="/images/projects/ebook.jpg"
          demoUrl="https://example.com"
          className="rotate-hand-slight-left"
        />
      </div>

      <div className="border-ink-primary bg-paper-secondary mt-16 rounded-lg border-2 border-dashed p-6">
        <h2 className="pencil-line-animation mb-4">更多小项目</h2>
        <p className="text-ink-secondary mb-4">
          除了上面展示的主要项目外，我还有一些小型的实验性项目和概念验证作品：
        </p>
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="border-ink-light rounded border p-3">
            <h3 className="text-lg">CSS动画实验</h3>
            <p className="text-ink-secondary text-sm">
              纯CSS实现的各种手绘风格动画效果集合
            </p>
            <Link
              href="https://example.com"
              className="text-accent-blue text-sm hover:underline"
            >
              查看演示
            </Link>
          </li>
          <li className="border-ink-light rounded border p-3">
            <h3 className="text-lg">手绘图标库</h3>
            <p className="text-ink-secondary text-sm">
              一套自制的SVG手绘风格图标集合
            </p>
            <Link
              href="https://example.com"
              className="text-accent-blue text-sm hover:underline"
            >
              查看演示
            </Link>
          </li>
          <li className="border-ink-light rounded border p-3">
            <h3 className="text-lg">字体渲染器</h3>
            <p className="text-ink-secondary text-sm">
              将文本转换为手写风格字体的在线工具
            </p>
            <Link
              href="https://example.com"
              className="text-accent-blue text-sm hover:underline"
            >
              查看演示
            </Link>
          </li>
          <li className="border-ink-light rounded border p-3">
            <h3 className="text-lg">手绘UI组件库</h3>
            <p className="text-ink-secondary text-sm">
              一套为React设计的手绘风格UI组件
            </p>
            <Link
              href="https://example.com"
              className="text-accent-blue text-sm hover:underline"
            >
              查看演示
            </Link>
          </li>
        </ul>
      </div>
    </PageContainer>
  );
}

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  className?: string;
}

function ProjectCard({
  title,
  category,
  description,
  technologies,
  imageUrl,
  demoUrl,
  repoUrl,
  className = "",
}: ProjectCardProps) {
  return (
    <div
      className={`border-ink-primary shadow-hand hover:shadow-hand-lg overflow-hidden rounded-lg border-2 transition-all duration-300 hover:-translate-y-2 ${className}`}
    >
      {/* 图片区域 */}
      <div className="relative h-[180px] w-full overflow-hidden">
        <OptimizedImage
          src={imageUrl}
          alt={`${title} 项目截图`}
          className="rounded-t-lg object-cover transition-transform duration-500 hover:scale-110"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          quality={80}
          fallbackSrc="/images/placeholders/project-placeholder.svg"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="pencil-line-animation font-handwriting-primary text-xl">
            {title}
          </h3>
          <span className="badge-hand transform transition-transform hover:rotate-3 hover:scale-110">
            {category}
          </span>
        </div>

        <p className="text-ink-secondary mb-4 text-sm">{description}</p>

        <div className="mb-4">
          <p className="text-ink-secondary mb-2 text-xs">使用技术:</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => {
              const IconComponent = TECH_ICONS[tech] ?? DiJavascript;
              return (
                <span
                  key={index}
                  className="text-ink-primary bg-paper-secondary border-ink-light hover:bg-paper-primary flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition-all hover:scale-105"
                  title={tech}
                >
                  <IconComponent className="text-accent-primary text-base" />
                  <span>{tech}</span>
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          {demoUrl && (
            <Link
              href={demoUrl}
              className="btn-hand px-3 py-1 text-xs transition-transform hover:scale-105"
            >
              查看演示
            </Link>
          )}

          {repoUrl && (
            <Link
              href={repoUrl}
              className="btn-hand px-3 py-1 text-xs transition-transform hover:scale-105"
            >
              源代码
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
