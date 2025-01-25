const carouselGridKeys = (lang:number) => {
  switch (lang) {
    case 0:
      return ['Карусель','Сетка'];
    case 1:
      return ['Карусель','Сітка'];
    case 454:
      return ['Карусель','Сітка'];
    case 114:
      return ['Карусель','Сетка'];
    case 2:
      return ['Карусель','Сетка'];
    case 777:
      return ['Карусель','Сетка'];
    case 97:
      return ['Карусел','Тор'];
    case 100:
      return ['Карусель','Сетка'];
    default:
      return ['Carousel','Grid'];
  }
}

export default carouselGridKeys;