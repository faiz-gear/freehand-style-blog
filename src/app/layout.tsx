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
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
