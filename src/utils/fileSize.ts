/**
 * Форматирует размер файла в байтах в читаемый формат
 * @param bytes - размер файла в байтах
 * @returns отформатированная строка (например, "969 КБ", "1.5 МБ")
 */
export function formatFileSize(bytes: number | undefined): string {
  if (!bytes || bytes === 0) return "0 Б";

  const k = 1024;

  // Если размер меньше 1024, проверяем - возможно это уже килобайты
  // Если значение имеет десятичную часть и меньше 1000, скорее всего это КБ
  if (bytes < k) {
    // Если значение имеет десятичную часть (например, 9.9, 10.17), это скорее всего КБ
    if (bytes % 1 !== 0 && bytes < 1000) {
      const rounded =
        bytes >= 10 ? Math.round(bytes) : Math.round(bytes * 10) / 10;
      return `${rounded} КБ`;
    }
    return `${Math.round(bytes)} Б`;
  }
  // Если размер меньше 1 МБ (1048576 байт), это килобайты
  else if (bytes < k * k) {
    const kb = bytes / k;
    // Округляем до целого числа для КБ
    return `${Math.round(kb)} КБ`;
  }
  // Если размер меньше 1 ГБ, это мегабайты
  else if (bytes < k * k * k) {
    const mb = bytes / (k * k);
    return `${Math.round(mb * 10) / 10} МБ`;
  }
  // Иначе это гигабайты
  else {
    const gb = bytes / (k * k * k);
    return `${Math.round(gb * 10) / 10} ГБ`;
  }
}

