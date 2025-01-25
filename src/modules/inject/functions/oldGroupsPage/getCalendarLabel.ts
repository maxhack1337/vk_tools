const getCalendarLabel = (lang:number) => {
  switch (lang) {
    case 0:
      return "Календарь";
    case 1:
      return "Календар";
    case 454:
      return "Календар";
    case 114:
      return "Каляндар";
    case 2:
      return "Каляндар";
    case 777:
      return "Календарь";
    case 97:
      return "Күнтізбе";
    case 100:
      return "Календарь";
    default:
      return "Calendar";
  }
}

export default getCalendarLabel;