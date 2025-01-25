const getPopularLabel = (lang:number) => {
  switch (lang) {
    case 0:
      return "Популярные сообщества";
    case 1:
      return "Популярні спільноти";
    case 454:
      return "Популярні спільноти";
    case 114:
      return "Папулярныя супольнасці";
    case 2:
      return "Папулярныя супольнасці";
    case 777:
      return "Популярные сообщества";
    case 97:
      return "Танымал қауымдастықтар";
    case 100:
      return "Популярные сообщества";
    default:
      return "Popular communities";
  }
}

export default getPopularLabel;