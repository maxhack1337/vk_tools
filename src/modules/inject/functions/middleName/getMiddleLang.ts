const getMiddleLang = (lang:number) => {
  switch (lang) {
    case 0:
      return "Отчество:";
    case 1:
      return "По-батькові:";
    case 454:
      return "По-батькові:";
    case 114:
      return "Імя па бацьку:";
    case 2:
      return "Імя па бацьку:";
    case 777:
      return "Отчество:";
    case 97:
      return "Әкенің аты:";
    case 100:
      return "Отчество:";
    default:
      return "Middle name:";
  }
}

export default getMiddleLang;