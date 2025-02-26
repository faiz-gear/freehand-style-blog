import "~/styles/globals.css";

import { type Metadata } from "next";
import MainLayout from "~/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "手绘风格博客",
  description: "一个用手绘风格讲述编程与生活的个人网站",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
