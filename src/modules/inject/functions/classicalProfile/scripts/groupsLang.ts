const groupsLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Группы:";
    case 1:
      return "Групи:";
    case 454:
      return "Групи:";
    case 114:
      return "Групы:";
    case 2:
      return "Групы:";
    case 777:
      return "Объединения:";
    case 97:
      return "Топтар:";
    case 100:
      return "Общества:";
    default:
      return "Groups:";
  }
};

export default groupsLang;
