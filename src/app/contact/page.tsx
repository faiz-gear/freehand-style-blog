import PageContainer from "~/components/shared/PageContainer";
import PageHeader from "~/components/shared/PageHeader";

export const metadata = {
  title: "联系我 | 手绘风格博客",
  description: "有任何问题或合作意向，欢迎与我联系",
};

export default function ContactPage() {
  return (
    <PageContainer>
      <PageHeader
        title="联系我"
        description="有问题、建议或合作意向？请填写下面的表单或通过以下方式联系我。"
      />

      <div className="grid gap-10 md:grid-cols-2">
        {/* 联系表单 */}
        <div className="border-ink-primary rotate-hand-slight-left rounded-lg border-2 border-dashed p-6">
          <h2 className="pencil-line-animation mb-4">给我留言</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="text-ink-primary mb-2 block font-medium"
              >
                您的名字 <span className="text-ink-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="border-ink-primary bg-paper-light text-ink-primary focus:ring-ink-accent w-full rounded-md border-2 border-dashed p-2 focus:outline-none focus:ring-2"
                placeholder="请输入您的名字"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-ink-primary mb-2 block font-medium"
              >
                电子邮箱 <span className="text-ink-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="border-ink-primary bg-paper-light text-ink-primary focus:ring-ink-accent w-full rounded-md border-2 border-dashed p-2 focus:outline-none focus:ring-2"
                placeholder="请输入您的电子邮箱"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="text-ink-primary mb-2 block font-medium"
              >
                主题
              </label>
              <input
                type="text"
                id="subject"
                className="border-ink-primary bg-paper-light text-ink-primary focus:ring-ink-accent w-full rounded-md border-2 border-dashed p-2 focus:outline-none focus:ring-2"
                placeholder="请输入主题"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-ink-primary mb-2 block font-medium"
              >
                留言内容 <span className="text-ink-accent">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                className="border-ink-primary bg-paper-light text-ink-primary focus:ring-ink-accent w-full rounded-md border-2 border-dashed p-2 focus:outline-none focus:ring-2"
                placeholder="请输入您的留言内容"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-ink-primary hover:bg-ink-accent text-paper-light rotate-hand-slight-right inline-block transform rounded-md px-6 py-2 font-medium transition-transform hover:scale-105"
            >
              发送留言
            </button>
          </form>
        </div>

        {/* 联系信息 */}
        <div>
          <div className="mb-8">
            <h2 className="pencil-line-animation mb-4">其他联系方式</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-ink-accent mr-3 text-xl">✉</span>
                <div>
                  <p className="text-ink-primary font-medium">电子邮箱</p>
                  <p className="text-ink-secondary">luyao9637@gmail.com</p>
                </div>
              </li>

              <li className="flex items-start">
                <span className="text-ink-accent mr-3 text-xl">🔗</span>
                <div>
                  <p className="text-ink-primary font-medium">社交媒体</p>
                  <div className="space-y-1">
                    <p className="text-ink-secondary">GitHub: @username</p>
                    <p className="text-ink-secondary">Twitter: @username</p>
                    <p className="text-ink-secondary">LinkedIn: 您的名字</p>
                  </div>
                </div>
              </li>

              <li className="flex items-start">
                <span className="text-ink-accent mr-3 text-xl">⏰</span>
                <div>
                  <p className="text-ink-primary font-medium">回复时间</p>
                  <p className="text-ink-secondary">
                    我通常会在1-2个工作日内回复您的消息
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="border-ink-primary bg-paper-accent rotate-hand-slight-right rounded-lg border-2 border-dotted p-6">
            <h3 className="text-ink-primary mb-3 font-medium">关于合作</h3>
            <p className="text-ink-secondary">
              我很乐意与您探讨项目合作、内容创作或其他机会。请通过表单或邮件联系我，并在留言中简要描述您的想法。
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
