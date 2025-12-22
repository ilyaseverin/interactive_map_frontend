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

