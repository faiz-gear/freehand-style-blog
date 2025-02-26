import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";

export const metadata = {
  title: "关于我 | 手绘风格博客",
  description: "了解更多关于我的经历、技能和兴趣",
};

export default function AboutPage() {
  return (
    <PageContainer>
      <PageHeader
        title="关于我"
        description="嗨，我是这个手绘风格博客的创建者。这里是关于我的一些介绍。"
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <section className="mb-8">
            <h2 className="pencil-line-animation mb-4">我是谁</h2>
            <p className="text-ink-secondary mb-4">
              我是一名热爱技术与创意的开发者，对手绘和设计有着浓厚的兴趣。我喜欢将艺术与科技结合，创造独特的体验。
            </p>
            <p className="text-ink-secondary">
              这个博客是我记录学习历程、分享技术见解和生活感悟的地方。我希望通过这个独特的手绘风格设计，为读者带来不一样的阅读体验。
            </p>
          </section>

          <section>
            <h2 className="pencil-line-animation mb-4">联系我</h2>
            <p className="text-ink-secondary">
              如果你有任何问题或想法想要分享，欢迎通过以下方式联系我：
            </p>
            <ul className="mt-3 list-disc pl-5">
              <li className="text-ink-secondary mb-2">
                邮箱：example@email.com
              </li>
              <li className="text-ink-secondary mb-2">GitHub：@username</li>
              <li className="text-ink-secondary">Twitter：@username</li>
            </ul>
          </section>
        </div>

        <div className="border-ink-primary rotate-hand-slight-right rounded-lg border-2 border-dashed p-6">
          <h2 className="pencil-line-animation mb-4">我的兴趣</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-ink-accent mr-2">•</span>
              <span className="text-ink-secondary">前端开发与设计</span>
            </li>
            <li className="flex items-start">
              <span className="text-ink-accent mr-2">•</span>
              <span className="text-ink-secondary">手绘艺术与插画</span>
            </li>
            <li className="flex items-start">
              <span className="text-ink-accent mr-2">•</span>
              <span className="text-ink-secondary">交互设计与用户体验</span>
            </li>
            <li className="flex items-start">
              <span className="text-ink-accent mr-2">•</span>
              <span className="text-ink-secondary">开源项目贡献</span>
            </li>
            <li className="flex items-start">
              <span className="text-ink-accent mr-2">•</span>
              <span className="text-ink-secondary">阅读与写作</span>
            </li>
          </ul>
        </div>
      </div>
    </PageContainer>
  );
}
