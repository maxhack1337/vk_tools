const albumDownloadFailLang = (lang: number, count: number, title: string) => {
  switch (lang) {
    case 0:
      return `Не удалось скачать ${count} фото из альбома "${title}"`;
    case 1:
      return `Не вдалося завантажити ${count} фото з альбому "${title}"`;
    case 454:
      return `Не вдалося завантажити ${count} фото з альбому "${title}"`;
    case 114:
      return `Не ўдалося спампаваць ${count} фота з альбома "${title}"`;
    case 2:
      return `Не ўдалося спампаваць ${count} фота з альбома "${title}"`;
    case 777:
      return `Не удалось скачать ${count} фото из альбома "${title}"`;
    case 97:
      return `${count} фотосуретті "${title}" альбомынан жүктеу мүмкін болмады`;
    case 100:
      return `Не удалось скачать ${count} фото из альбома "${title}"`;
    default:
      return `Failed to download ${count} photos from album "${title}"`;
  }
};

export default albumDownloadFailLang;
