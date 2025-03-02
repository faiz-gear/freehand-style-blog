import "~/styles/globals.css";

import { type Metadata } from "next";
import MainLayout from "~/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "Lyle的博客",
  description: "Lyle的随笔涂鸦：思想的自由表达",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 预取关键页面 */}
        <link rel="prefetch" href="/" as="document" />
        <link rel="prefetch" href="/blog" as="document" />
        <link rel="prefetch" href="/about" as="document" />
        <link rel="prefetch" href="/projects" as="document" />
        <link rel="prefetch" href="/skills" as="document" />
        <link rel="prefetch" href="/contact" as="document" />

        {/* DNS预解析 */}
        <link rel="dns-prefetch" href="https://www.notion.so" />
        <link
          rel="dns-prefetch"
          href="https://prod-files-secure.s3.us-west-2.amazonaws.com"
        />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
