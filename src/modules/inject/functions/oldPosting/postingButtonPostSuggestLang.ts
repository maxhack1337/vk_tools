const postingButtonPostSuggestLang = (lang:number) => {
    switch (lang) {
    case 0:
      return "Предложить новость";
    case 1:
      return "Запропонувати новину";
    case 454:
      return "Запропонувати новину";
    case 114:
      return "Прапанаваць навіна";
    case 2:
      return "Прапанаваць навіна";
    case 777:
      return "Предложить новость";
    case 97:
      return "Жаңалық ұсыныңыз";
    case 100:
      return "Предложить новасть";
    default:
      return "Suggest a post";
  }
}

export default postingButtonPostSuggestLang;