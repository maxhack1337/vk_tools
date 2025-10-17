const followersLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Подписчики";
    case 1:
      return "Підписники";
    case 454:
      return "Підписники";
    case 114:
      return "Падпісчыкі";
    case 2:
      return "Падпісчыкі";
    case 777:
      return "Читатели";
    case 97:
      return "Жазылушылар";
    case 100:
      return "Составъ общества";
    default:
      return "Followers";
  }
};

export default followersLang;
