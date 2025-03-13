const getInterestingPagesLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Интересные страницы";
    case 1:
      return "Цікаві сторінки";
    case 454:
      return "Цікаві сторінки";
    case 114:
      return "Цікавыя старонкі";
    case 2:
      return "Цікавыя старонкі";
    case 777:
      return "Интересные страницы";
    case 97:
      return "Қызықты беттер";
    case 100:
      return "Интересные страницы";
    default:
      return "Interesting pages";
  }
}

export default getInterestingPagesLang;