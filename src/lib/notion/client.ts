import { Client } from "@notionhq/client";
import { env } from "../../env.js";

// 初始化Notion客户端
export const notion = new Client({
  auth: env.NOTION_API_KEY,
});

// Notion数据库ID
export const databaseId = env.NOTION_BLOG_DATABASE_ID;
