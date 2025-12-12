/**
 * Формирует строку keywords из переданных частей
 * @param parts - массив строк для объединения (undefined/null значения игнорируются)
 * @returns объединенная строка keywords или undefined, если нет частей
 */
export function buildKeywords(
  ...parts: (string | undefined | null)[]
): string | undefined {
  const validParts = parts.filter((part): part is string =>
    Boolean(part?.trim())
  );
  return validParts.length > 0 ? validParts.join(", ") : undefined;
}
