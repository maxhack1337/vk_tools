const audiosLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Аудиозаписи";
    case 1:
      return "Аудіозаписи";
    case 454:
      return "Аудіозаписи";
    case 114:
      return "Аўдыязапісы";
    case 2:
      return "Аўдыязапісы";
    case 777:
      return "Звукозаписи";
    case 97:
      return "Аудиожазба";
    case 100:
      return "Композицiи";
    default:
      return "Audios";
  }
};

export default audiosLang;
