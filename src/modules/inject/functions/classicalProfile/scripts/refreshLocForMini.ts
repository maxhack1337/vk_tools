const refreshLocForMini = (lang: number) => {
  switch (lang) {
    case 0:
      return "Не удалось обновить миниатюру. Страница будет обновлена";
    case 1:
      return "Не вдалося поновити мініатюру. Сторінку буде оновлено";
    case 454:
      return "Не вдалося поновити мініатюру. Сторінку буде оновлено";
    case 114:
      return "Не ўдалося абнавіць мініяцюру. Старонка будзе абноўлена";
    case 2:
      return "Не ўдалося абнавіць мініяцюру. Старонка будзе абноўлена";
    case 777:
      return "Не удалось обновить миниатюру. Страница будет обновлена";
    case 97:
      return "Нобайды жаңарту сәтсіз аяқталды. Бет жаңартылады";
    case 100:
      return "Не удалось обновить миниатюру. Страница будет обновлена";
    default:
      return "Failed to update thumbnail. Page will be refreshed.";
  }
}

export default refreshLocForMini;