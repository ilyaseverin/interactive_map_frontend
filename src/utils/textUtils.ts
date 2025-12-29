import sanitizeHtml from "sanitize-html";

/**
 * Разбивает контент на параграфы
 * Поддерживает как HTML с тегами <p>, так и обычный текст
 * @param content - HTML или обычный текст
 * @returns Массив параграфов (чистый текст без HTML тегов)
 */
export function parseContentParagraphs(
  content: string | undefined | null
): string[] {
  if (!content) {
    return [];
  }

  // Если это HTML с тегами <p>, извлекаем параграфы
  if (content.includes("<p>") || content.includes("</p>")) {
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    const matches = content.matchAll(pRegex);
    const paragraphs = Array.from(matches)
      .map((match) => match[1].trim().replace(/<[^>]+>/g, "")) // Удаляем вложенные HTML теги
      .filter((p) => p);

    // Если параграфы не найдены, пытаемся разбить по другим тегам или \n\n
    if (paragraphs.length > 0) {
      return paragraphs;
    }

    // Fallback: заменяем HTML теги на переносы строк и разбиваем
    return content
      .replace(/<[^>]+>/g, "\n") // Заменяем HTML теги на переносы строк
      .split("\n\n")
      .map((p) => p.trim().replace(/&nbsp;/g, " ")) // Удаляем &nbsp;
      .filter((p) => p);
  }

  // Обычный текст - разбиваем по \n\n
  return content
    .split("\n\n")
    .map((p) => p.trim().replace(/&nbsp;/g, " ")) // Удаляем &nbsp;
    .filter((p) => p);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isUnsafeHref(href: string): boolean {
  const trimmed = href.trim().toLowerCase();
  return (
    trimmed.startsWith("javascript:") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("vbscript:")
  );
}

function linkifyEscapedText(escapedText: string): string {
  // escapedText уже экранирован, поэтому можно безопасно вставлять <a>
  const urlRegex = /((?:https?:\/\/|www\.)[^\s<]+[^\s<.,:;"')\]\!])/gi;

  return escapedText.replace(urlRegex, (rawUrl) => {
    const href = rawUrl.startsWith("www.") ? `https://${rawUrl}` : rawUrl;
    if (isUnsafeHref(href)) return rawUrl;
    return `<a href="${escapeHtml(
      href
    )}" target="_blank" rel="noopener noreferrer">${rawUrl}</a>`;
  });
}

function plainTextToHtml(text: string): string {
  // Поддержка markdown-ссылок: [Текст](link)
  const mdLinkRegex = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;
  let out = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = mdLinkRegex.exec(text)) !== null) {
    const [full, labelRaw, hrefRaw] = match;
    const start = match.index;
    const end = start + full.length;

    // До markdown-ссылки: экранируем + линкуем "голые" URL
    const before = text.slice(lastIndex, start);
    out += linkifyEscapedText(escapeHtml(before));

    const href = String(hrefRaw).trim();
    if (!isUnsafeHref(href)) {
      const safeLabel = escapeHtml(String(labelRaw));
      const safeHref = escapeHtml(href);
      out += `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${safeLabel}</a>`;
    } else {
      out += escapeHtml(full);
    }

    lastIndex = end;
  }

  // Хвост после последней markdown-ссылки
  const rest = text.slice(lastIndex);
  out += linkifyEscapedText(escapeHtml(rest));

  return out.replace(/\n/g, "<br/>");
}

function convertMarkdownLinksInHtml(html: string): string {
  // Конвертируем markdown-ссылки, которые могут быть внутри HTML-параграфа
  const mdLinkRegex = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;
  return html.replace(
    mdLinkRegex,
    (full, labelRaw: string, hrefRaw: string) => {
      const href = String(hrefRaw).trim();
      if (isUnsafeHref(href)) return full;
      const safeLabel = escapeHtml(String(labelRaw));
      const safeHref = escapeHtml(href);
      return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${safeLabel}</a>`;
    }
  );
}

const RICH_TEXT_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "a",
    "b",
    "strong",
    "i",
    "em",
    "u",
    "br",
    "span",
    "code",
    "sup",
    "sub",
    "ul",
    "ol",
    "li",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel", "name"],
    span: [],
    code: [],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName: string, attribs: sanitizeHtml.Attributes) => {
      // Приводим ссылки к безопасному виду
      const href = attribs.href || "";
      const target = attribs.target || "_blank";
      const rel = attribs.rel || "noopener noreferrer";
      return {
        tagName,
        attribs: {
          ...attribs,
          href,
          target,
          rel,
        },
      };
    },
  },
};

/**
 * Разбивает контент на параграфы, но ВОЗВРАЩАЕТ HTML (безопасный), сохраняя <a href>.
 * Используйте вместе с `dangerouslySetInnerHTML`.
 */
export function parseContentParagraphsHtml(
  content: string | undefined | null
): string[] {
  if (!content) return [];

  // HTML с <p>...</p>
  if (content.includes("<p") && content.includes("</p>")) {
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    const matches = Array.from(content.matchAll(pRegex));
    const paragraphs = matches
      .map((m) => (m[1] || "").trim().replace(/&nbsp;/g, " "))
      .filter(Boolean)
      .map((html) => convertMarkdownLinksInHtml(html))
      .map((html) => sanitizeHtml(html, RICH_TEXT_SANITIZE_OPTIONS));

    if (paragraphs.length > 0) return paragraphs;
  }

  // Обычный текст: делим на параграфы и "линкуем" URL'ы
  return content
    .split("\n\n")
    .map((p) => p.trim().replace(/&nbsp;/g, " "))
    .filter(Boolean)
    .map((p) => plainTextToHtml(p))
    .map((html) => sanitizeHtml(html, RICH_TEXT_SANITIZE_OPTIONS));
}
