import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface BlogPost extends BlogPostListItem {
  content?: BlockObjectResponse[]; // Notion块内容
  coverImage?: string;
  description?: string;
  publishedAt?: string;
  lastUpdatedAt?: string;
  author?: {
    name: string;
    avatarUrl?: string;
  };
}

export interface BlogPostListItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  status: "Published" | "Revise" | "Draft" | "Idea";
}
