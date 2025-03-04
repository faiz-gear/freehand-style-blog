# Freehand Style Blog - 项目结构解剖

这是一个基于 Next.js 15 的个人博客网站项目，使用 TypeScript、React 18 和 Tailwind CSS 构建。

## 项目技术栈

- **前端框架**：Next.js 15.0.1（使用 App Router）
- **UI 库**：React 18.3.1
- **样式**：Tailwind CSS 3.4.3 + @tailwindcss/typography
- **数据库**：PostgreSQL（通过 Drizzle ORM 连接）
- **内容管理**：Notion API (@notionhq/client)
- **包管理器**：pnpm 8.6.4
- **类型系统**：TypeScript 5.5.3
- **图标**：React Icons 5.5.0
- **字体**：Geist 1.3.0
- **代码检查与格式**：ESLint 8.57.0 + Prettier 3.3.2

## 目录结构

### 根目录

- **package.json**：项目依赖与脚本定义
- **next.config.js**：Next.js 配置
- **.env** / **.env.example**：环境变量
- **tailwind.config.ts**：Tailwind CSS 配置
- **drizzle.config.ts**：Drizzle ORM 配置
- **tsconfig.json**：TypeScript 配置
- **start-database.sh**：数据库启动脚本

### src 目录

- **app/**：Next.js App Router 页面结构
  - **page.tsx**：主页
  - **blog/**：博客相关页面
  - **about/**：关于页面
  - **skills/**：技能页面
  - **projects/**：项目页面
  - **contact/**：联系页面
  - **tags/**：标签页面
- **components/**：React 组件

  - **ui/**：通用 UI 组件
  - **layout/**：布局相关组件
  - **sections/**：页面区块组件
  - **shared/**：共享组件

- **server/**：服务器端代码

  - **db/**：数据库相关代码（Drizzle ORM）

- **lib/**：公共库和工具函数

- **hooks/**：自定义 React Hooks

- **styles/**：全局样式定义

- **types/**：TypeScript 类型定义

- **assets/**：静态资产（可能包含图像等）

- **env.js**：环境变量验证（使用 zod）

### public 目录

存放静态资源文件，如图片、字体等。

## 项目特点

- 使用 Next.js 的 App Router 进行路由管理
- 使用 Drizzle ORM 连接 PostgreSQL 数据库
- 使用 Notion API 可能作为内容管理系统
- 采用 Tailwind CSS 进行样式设计
- 完整的 ESLint 和 Prettier 配置确保代码质量
- 支持 TypeScript 强类型开发

## 开发工具链

- 使用 pnpm 作为包管理器
- 提供了多种 npm 脚本用于开发、构建和检查
- 配置了 TypeScript、ESLint 和 Prettier 的检查和修复命令
