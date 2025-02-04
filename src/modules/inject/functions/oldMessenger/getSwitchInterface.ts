const getSwitchInterface = (lang:number) => {
  switch (lang) {
    case 0:
      return ["Новый интерфейс", "Классический интерфейс"];
    case 1:
      return ["Новий інтерфейс", "Класичний інтерфейс"];
    case 454:
      return ["Новий інтерфейс", "Класичний інтерфейс"];
    case 114:
      return ["Новы інтэрфейс", "Класічны інтэрфейс"];
    case 2:
      return ["Новы інтэрфейс", "Класічны інтэрфейс"];
    case 777:
      return ["Новый телеграф", "Классический телеграф"];
    case 97:
      return ["Жаңа интерфейс", "Классикалық интерфейс"];
    case 100:
      return ["Новый интѣрфейс", "Классическiй интѣрфейс"];
    default:
      return ["New interface", "Classic interface"];
  }
}

export default getSwitchInterface;