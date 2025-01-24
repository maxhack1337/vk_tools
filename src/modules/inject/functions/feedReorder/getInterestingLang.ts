const getInterestingLang = (lang:number) => {
  switch (lang) {
    case 0:
      return "Сначала интересные";
    case 1:
      return "Спочатку цікаві";
    case 454:
      return "Спочатку цікаві";
    case 114:
      return "Спачатку цікавыя";
    case 2:
      return "Спачатку цікавыя";
    case 777:
      return "Сначала интересные";
    case 97:
      return "Бірінші қызық";
    case 100:
      return "Сначала интересные";
    default:
      return "Interesting first";
  }
}

export default getInterestingLang;