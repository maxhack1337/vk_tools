const postingFooterLangSuggest = (lang:number) => {
  switch (lang) {
    case 0:
      return "Предложите новость";
    case 1:
      return "Запропонуйте новину";
    case 454:
      return "Запропонуйте новину";
    case 114:
      return "Прапануйце навіна";
    case 2:
      return "Прапануйце навіна";
    case 777:
      return "Предложите новость, товарищ!";
    case 97:
      return "Жаңалық ұсыныңыз";
    case 100:
      return "Предложите новасть";
    default:
      return "Suggest a post";
  }
}

export default postingFooterLangSuggest;