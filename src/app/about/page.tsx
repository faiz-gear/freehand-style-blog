import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";

export const metadata = {
  title: "关于我 | 手绘风格博客",
  description: "了解更多关于Lyle Lu的经历、技能和兴趣",
};

export default function AboutPage() {
  return (
    <PageContainer>
      <PageHeader
        title="关于我"
        description="嗨，我是Lyle Lu，这个手绘风格博客的创建者。"
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <section className="mb-8">
            <h2 className="pencil-line-animation mb-4">我是谁</h2>
            <p className="text-ink-secondary mb-4">
              我是一名Web开发者，热爱使用各种实用的计算机软件并构建美观的网站。
            </p>
            <p className="text-ink-secondary mb-4">
              我曾经梦想成为一名医生，但现实使我不得不学习一门技术。不过，我很庆幸选择了成为一名程序员，因为它让我能够不断接触新事物和新技术，感受互联网技术的魅力。
            </p>
            <p className="text-ink-secondary">
              值得骄傲的是，我可以成功地使用CSS居中一个元素😋
            </p>
          </section>

          <section>
            <h2 className="pencil-line-animation mb-4">个人经历</h2>
            <p className="text-ink-secondary mb-4">
              我目前是制造业的一名前端工程师。大学主修电子商务，但我很幸运选择了成为一名程序员。
            </p>
            <p className="text-ink-secondary mb-4">
              幸运的是，我认为我正走在一条我热爱的职业道路上❤️
            </p>
            <p className="text-ink-secondary">
              我目前对AI、LLM、RAG和Agent充满热情。在空闲时间，我喜欢打球、看电影和听音乐。
            </p>
          </section>
        </div>

        <div className="border-ink-primary rotate-hand-slight-right rounded-lg border-2 border-dashed p-6">
          <h2 className="pencil-line-animation mb-4">联系我</h2>
          <p className="text-ink-secondary mb-4">
            如果你有任何问题或想法想要分享，欢迎通过以下方式联系我：
          </p>
          <ul className="mt-3 list-disc pl-5">
            <li className="text-ink-secondary mb-2">
              邮箱：luyao9637@gmail.com
            </li>
            <li className="text-ink-secondary mb-2">GitHub：@faiz-gear</li>
            <li className="text-ink-secondary">Twitter：@luyao9637</li>
          </ul>

          <h2 className="pencil-line-animation mb-4 mt-8">我的兴趣</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-ink-accent mr-2">•</span>
              <span className="text-ink-secondary">AI应用探索</span>
            </li>
            <li className="flex items-start">
              <span className="text-ink-accent mr-2">•</span>
              <span className="text-ink-secondary">打球运动</span>
            </li>
            <li className="flex items-start">
              <span className="text-ink-accent mr-2">•</span>
              <span className="text-ink-secondary">看电影</span>
            </li>
            <li className="flex items-start">
              <span className="text-ink-accent mr-2">•</span>
              <span className="text-ink-secondary">听音乐</span>
            </li>
          </ul>
        </div>
      </div>
    </PageContainer>
  );
}
