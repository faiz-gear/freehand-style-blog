import { notion, databaseId } from "./client";
import type { BlogPost, BlogPostListItem } from "../../types/blog";
import type {
  PageObjectResponse,
  RichTextItemResponse,
  MultiSelectPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Notion属性类型
type NotionProperty =
  | TitlePropertyItemObjectResponse
  | RichTextPropertyItemObjectResponse
  | MultiSelectPropertyItemObjectResponse
  | DatePropertyItemObjectResponse
  | UrlPropertyItemObjectResponse
  | Record<string, unknown>;

/**
 * 从Notion属性中提取文本内容
 */
function extractPlainText(property: NotionProperty): string {
  if (!property) return "";

  if ("title" in property && property.title && Array.isArray(property.title)) {
    return property.title
      .map((p: RichTextItemResponse) => p.plain_text)
      .join("");
  }

  if (
    "rich_text" in property &&
    property.rich_text &&
    Array.isArray(property.rich_text)
  ) {
    return property.rich_text
      .map((p: RichTextItemResponse) => p.plain_text)
      .join("");
  }

  return "";
}

/**
 * 从Notion属性中提取日期
 */
function extractDate(property: NotionProperty): string {
  if (!property || !("date" in property) || !property.date) return "";
  const dateObj = property.date as { start?: string };
  return dateObj.start ?? "";
}

/**
 * 从Notion属性中提取多选标签
 */
function extractMultiSelect(property: NotionProperty): string[] {
  if (
    !property ||
    !("multi_select" in property) ||
    !property.multi_select ||
    !Array.isArray(property.multi_select)
  )
    return [];
  return property.multi_select.map((item: { name: string }) => item.name);
}

/**
 * 从Notion属性中提取URL
 */
function extractUrl(property: NotionProperty): string {
  if (!property || !("url" in property) || !property.url) return "";
  return property.url as string;
}

/**
 * 将Notion页面转换为博客文章格式
 */
function convertNotionPageToBlogPost(
  page: PageObjectResponse,
): BlogPostListItem {
  const properties = page.properties;

  return {
    id: page.id,
    slug: extractPlainText(properties.slug as NotionProperty),
    title: extractPlainText(properties.title as NotionProperty),
    date: extractDate(properties.date as NotionProperty),
    summary: extractPlainText(properties.summary as NotionProperty),
    tags: extractMultiSelect(properties.tags as NotionProperty),
    status: "Published" as const,
  };
}

/**
 * 获取所有已发布的博客文章
 */
export async function getAllPublishedBlogPosts(): Promise<BlogPostListItem[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "status",
        select: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page: unknown) =>
      convertNotionPageToBlogPost(page as PageObjectResponse),
    );
  } catch (error) {
    console.error("Error fetching blog posts from Notion:", error);
    return [];
  }
}

/**
 * 通过slug获取单个博客文章
 */
export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0] as PageObjectResponse;
    const blogPost = convertNotionPageToBlogPost(page);
    const properties = page.properties;

    // 获取页面内容
    const blocks = await getPageBlocks(page.id);

    // 添加额外的属性
    return {
      ...blogPost,
      content: blocks,
      coverImage: extractUrl(properties.coverImage as NotionProperty),
      author: {
        name: extractPlainText(properties.Author as NotionProperty),
        avatarUrl: extractUrl(properties.AuthorAvatar as NotionProperty),
      },
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * 获取页面的所有块内容
 */
export async function getPageBlocks(
  pageId: string,
): Promise<BlockObjectResponse[]> {
  try {
    const blocks: BlockObjectResponse[] = [];
    let cursor: string | undefined;

    while (true) {
      const { results, next_cursor } = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });

      blocks.push(...(results as BlockObjectResponse[]));

      if (!next_cursor) {
        break;
      }

      cursor = next_cursor;
    }

    return blocks;
  } catch (error) {
    console.error(`Error fetching blocks for page ${pageId}:`, error);
    return [];
  }
}

/**
 * 获取所有标签
 */
export async function getAllTags(): Promise<string[]> {
  try {
    const posts = await getAllPublishedBlogPosts();
    const tagsSet = new Set<string>();

    posts.forEach((post) => {
      post.tags.forEach((tag) => tagsSet.add(tag));
    });

    return Array.from(tagsSet);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

/**
 * 通过标签获取博客文章
 */
export async function getBlogPostsByTag(
  tag: string,
): Promise<BlogPostListItem[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "status",
            select: {
              equals: "Published",
            },
          },
          {
            property: "tags",
            multi_select: {
              contains: tag,
            },
          },
        ],
      },
      sorts: [
        {
          property: "date",
          direction: "descending",
        },
      ],
    });

    return response.results.map((page: unknown) =>
      convertNotionPageToBlogPost(page as PageObjectResponse),
    );
  } catch (error) {
    console.error(`Error fetching blog posts with tag ${tag}:`, error);
    return [];
  }
}
