const getPhotoMapText = (lang:number) => {
  switch (lang) {
    case 0:
      return "показать на карте";
    case 1:
      return "показати на карті";
    case 454:
      return "показати на карті";
    case 114:
      return "паказаць на карце";
    case 2:
      return "паказаць на карце";
    case 777:
      return "показать на атласе";
    case 97:
      return "картада көрсету";
    case 100:
      return "показать на атласѣ";
    default:
      return "show on map";
  }
}

export default getPhotoMapText