export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-hand-thin bg-paper-secondary mt-12 border-t py-6">
      <div className="container-hand">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="rotate-hand-slight-left mb-4 md:mb-0">
            <p className="text-handwritten text-center md:text-left">
              © {currentYear} 手绘风格博客 | 用手绘风格讲述编程与生活
            </p>
          </div>

          <div className="social-links">
            <ul className="flex space-x-4">
              <li>
                <SocialLink
                  href="https://github.com/faiz-gear"
                  icon="github"
                  label="GitHub"
                />
              </li>
              <li>
                <SocialLink
                  href="https://x.com/luyao9637"
                  icon="twitter"
                  label="Twitter"
                />
              </li>
              <li>
                <SocialLink
                  href="https://www.linkedin.com/in/lu-lyle-9789332a3/"
                  icon="linkedin"
                  label="LinkedIn"
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-hand my-4"></div>

        <p className="text-ink-light font-handwriting-body rotate-hand-slight-right text-center text-sm">
          用 Next.js 搭建 | Lyle的随笔涂鸦 |{" "}
          <a
            href="/contact"
            className="hover:text-accent-blue transition-colors"
          >
            联系我
          </a>
        </p>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  icon: string;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ink-primary hover:text-accent-blue transition-colors"
      aria-label={label}
    >
      <div className="btn-hand px-2 py-1 text-sm">
        {/* 简单的图标文本，实际项目中可替换为适当的SVG图标 */}
        {icon === "github" && "GitHub"}
        {icon === "twitter" && "Twitter"}
        {icon === "linkedin" && "LinkedIn"}
      </div>
    </a>
  );
}
