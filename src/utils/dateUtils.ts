/**
 * Форматирует дату в формате DD.MM.YYYY
 * @param dateString - строка с датой в формате ISO
 * @returns отформатированная дата в формате DD.MM.YYYY
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

/**
 * Преобразует дату в относительное время (например: "2 дня назад", "Вчера")
 * @param dateString - строка с датой в формате ISO
 * @returns строка с относительным временем на русском языке
 */
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Сегодня";
  if (diffInDays === 1) return "Вчера";
  if (diffInDays === 2) return "2 дня назад";
  if (diffInDays === 3) return "3 дня назад";
  if (diffInDays === 4) return "4 дня назад";
  if (diffInDays < 7) return `${diffInDays} дней назад`;
  if (diffInDays < 14) return "Неделю назад";
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} недели назад`;
  if (diffInDays < 60) return "Месяц назад";
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
