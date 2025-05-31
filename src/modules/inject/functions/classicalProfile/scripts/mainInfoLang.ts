const mainInfoLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Основная информация";
    case 1:
      return "Основна інформація";
    case 454:
      return "Основна інформація";
    case 114:
      return "Асноўная інфармацыя";
    case 2:
      return "Асноўная інфармацыя";
    case 777:
      return "Основные сведения";
    case 97:
      return "Негізгі ақпарат";
    case 100:
      return "Основные свѣдѣнiя";
    default:
      return "Primary information";
  }
};

export default mainInfoLang;
