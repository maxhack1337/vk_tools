const isNotAlbumLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Ошибка: цель не является альбомом";
    case 1:
      return "Помилка: мета не є альбомом";
    case 454:
      return "Помилка: мета не є альбомом";
    case 114:
      return "Памылка: мэта не з'яўляецца альбомам";
    case 2:
      return "Памылка: мэта не з'яўляецца альбомам";
    case 777:
      return "Ошибка: цель не является альбомом";
    case 97:
      return "Қате: мақсат альбом емес";
    case 100:
      return "Ошибка: цель не является альбомом";
    default:
      return "Error: target is not an album";
  }
}

export default isNotAlbumLang;