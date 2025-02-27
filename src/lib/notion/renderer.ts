import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * 将Notion块渲染为HTML
 */
export async function renderNotionBlocks(
  blocks: BlockObjectResponse[],
): Promise<string> {
  let html = "";

  for (const block of blocks) {
    html += await renderBlock(block);
  }

  return html;
}

/**
 * 渲染单个Notion块
 */
async function renderBlock(block: BlockObjectResponse): Promise<string> {
  const { type } = block;

  // 处理不同类型的块
  switch (type) {
    case "paragraph":
      return renderParagraph(block);
    case "heading_1":
      return renderHeading1(block);
    case "heading_2":
      return renderHeading2(block);
    case "heading_3":
      return renderHeading3(block);
    case "bulleted_list_item":
      return renderBulletedListItem(block);
    case "numbered_list_item":
      return renderNumberedListItem(block);
    case "to_do":
      return renderToDo(block);
    case "toggle":
      return renderToggle(block);
    case "code":
      return renderCode(block);
    case "quote":
      return renderQuote(block);
    case "divider":
      return renderDivider();
    case "image":
      return renderImage(block);
    case "callout":
      return renderCallout(block);
    default:
      return `<div class="text-ink-tertiary p-2 italic">不支持的块类型: ${type}</div>`;
  }
}

/**
 * 渲染富文本内容
 */
function renderRichText(richText: RichTextItemResponse[] | undefined): string {
  if (!richText || richText.length === 0) return "";

  return richText
    .map((text) => {
      let content = escapeHtml(text.plain_text);

      // 应用文本样式
      if (text.annotations.bold) {
        content = `<strong>${content}</strong>`;
      }
      if (text.annotations.italic) {
        content = `<em>${content}</em>`;
      }
      if (text.annotations.strikethrough) {
        content = `<del>${content}</del>`;
      }
      if (text.annotations.underline) {
        content = `<u>${content}</u>`;
      }
      if (text.annotations.code) {
        content = `<code>${content}</code>`;
      }
      if (text.annotations.color && text.annotations.color !== "default") {
        content = `<span class="text-${text.annotations.color}">${content}</span>`;
      }

      // 处理链接
      if (text.href) {
        content = `<a href="${text.href}" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:text-accent-blue-dark underline-hand transition-colors">${content}</a>`;
      }

      return content;
    })
    .join("");
}

/**
 * HTML转义
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * 渲染段落
 */
function renderParagraph(block: BlockObjectResponse): string {
  if (block.type !== "paragraph") return "";
  const text = renderRichText(block.paragraph.rich_text);
  return `<p>${text}</p>`;
}

/**
 * 渲染一级标题
 */
function renderHeading1(block: BlockObjectResponse): string {
  if (block.type !== "heading_1") return "";
  const text = renderRichText(block.heading_1.rich_text);
  return `<h1 class="pencil-line-animation block text-3xl mt-4 mb-3">${text}</h1>`;
}

/**
 * 渲染二级标题
 */
function renderHeading2(block: BlockObjectResponse): string {
  if (block.type !== "heading_2") return "";
  const text = renderRichText(block.heading_2.rich_text);
  return `<h2 class="pencil-line-animation block text-2xl mt-4 mb-3">${text}</h2>`;
}

/**
 * 渲染三级标题
 */
function renderHeading3(block: BlockObjectResponse): string {
  if (block.type !== "heading_3") return "";
  const text = renderRichText(block.heading_3.rich_text);
  return `<h3 class="pencil-line-animation block text-xl mt-4 mb-3">${text}</h3>`;
}

/**
 * 渲染无序列表项
 */
function renderBulletedListItem(block: BlockObjectResponse): string {
  if (block.type !== "bulleted_list_item") return "";
  const text = renderRichText(block.bulleted_list_item.rich_text);
  return `<li class="ml-6 list-disc">${text}</li>`;
}

/**
 * 渲染有序列表项
 */
function renderNumberedListItem(block: BlockObjectResponse): string {
  if (block.type !== "numbered_list_item") return "";
  const text = renderRichText(block.numbered_list_item.rich_text);
  return `<li class="ml-6 list-decimal">${text}</li>`;
}

/**
 * 渲染待办事项
 */
function renderToDo(block: BlockObjectResponse): string {
  if (block.type !== "to_do") return "";
  const text = renderRichText(block.to_do.rich_text);
  const checked = block.to_do.checked;
  return `
    <div class="flex items-start my-2">
      <input type="checkbox" ${checked ? "checked" : ""} disabled class="mt-1 mr-2" />
      <div class="${checked ? "line-through text-ink-tertiary" : ""}">${text}</div>
    </div>
  `;
}

/**
 * 渲染折叠块
 */
function renderToggle(block: BlockObjectResponse): string {
  if (block.type !== "toggle") return "";
  const summary = renderRichText(block.toggle.rich_text);
  return `
    <details class="border-ink-light rounded-lg border p-3 my-3">
      <summary class="cursor-pointer font-medium">${summary}</summary>
      <div class="mt-2 pl-4">
        ${block.has_children ? "（子块内容暂不支持）" : ""}
      </div>
    </details>
  `;
}

/**
 * 渲染代码块
 */
function renderCode(block: BlockObjectResponse): string {
  if (block.type !== "code") return "";
  const code = renderRichText(block.code.rich_text);
  const language = block.code.language || "plaintext";
  return `
    <pre class="bg-paper-tertiary border-ink-light rounded-lg border p-4 my-4 overflow-x-auto">
      <code class="language-${language}">${code}</code>
    </pre>
  `;
}

/**
 * 渲染引用
 */
function renderQuote(block: BlockObjectResponse): string {
  if (block.type !== "quote") return "";
  const text = renderRichText(block.quote.rich_text);
  return `
    <blockquote class="border-l-4 border-ink-secondary pl-4 italic my-4">
      ${text}
    </blockquote>
  `;
}

/**
 * 渲染分割线
 */
function renderDivider(): string {
  return `<hr class="border-ink-light my-6" />`;
}

/**
 * 渲染图片
 */
function renderImage(block: BlockObjectResponse): string {
  if (block.type !== "image") return "";

  let imageUrl = "";
  if (block.image.type === "external") {
    imageUrl = block.image.external.url;
  } else if (block.image.type === "file") {
    imageUrl = block.image.file.url;
  }

  const caption = block.image.caption
    ? renderRichText(block.image.caption)
    : "";

  return `
    <figure class="my-6">
      <img 
        src="${imageUrl}" 
        alt="${caption || "图片"}" 
        class="border-ink-light mx-auto rounded-lg border"
      />
      ${caption ? `<figcaption class="text-ink-tertiary text-center mt-2 text-sm">${caption}</figcaption>` : ""}
    </figure>
  `;
}

/**
 * 渲染提示框
 */
function renderCallout(block: BlockObjectResponse): string {
  if (block.type !== "callout") return "";
  const text = renderRichText(block.callout.rich_text);
  const emoji =
    block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : "💡";

  return `
    <div class="bg-paper-secondary border-ink-light rounded-lg border p-4 my-4 flex">
      <div class="mr-3 text-xl">${emoji}</div>
      <div>${text}</div>
    </div>
  `;
}
