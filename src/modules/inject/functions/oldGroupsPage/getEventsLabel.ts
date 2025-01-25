const getEventsLabel = (lang:number) => {
  switch (lang) {
    case 0:
      return "Мероприятия";
    case 1:
      return "Заходи";
    case 454:
      return "Заходи";
    case 114:
      return "Мерапрыемствы";
    case 2:
      return "Мерапрыемствы";
    case 777:
      return "Мероприятия";
    case 97:
      return "Оқиғалар";
    case 100:
      return "Мероприятия";
    default:
      return "Events";
  }
}

export default getEventsLabel;