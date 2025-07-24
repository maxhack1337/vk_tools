const pinnedPostLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Закреплённая запись";
    case 1:
      return "Закріплений запис";
    case 454:
      return "Закріплений запис";
    case 114:
      return "Замацаваны запіс";
    case 2:
      return "Замацаваны запіс";
    case 777:
      return "Закреплённая тема";
    case 97:
      return "Бекітілген жазба";
    case 100:
      return "Закрѣпленная запись";
    default:
      return "Pinned post";
  }
};

export default pinnedPostLang;
