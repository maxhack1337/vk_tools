const getPhotoTagText = (lang: number) => {
  switch (lang) {
    case 0:
      return ["","отметка","отметки","отметок"];
    case 1:
      return ["","позначка","відмітки","відміток"];
    case 454:
      return ["","позначка","відмітки","відміток"];
    case 114:
      return ["","адзнака","адзнакі","адзнак"];
    case 2:
      return ["","адзнака","адзнакі","адзнак"];
    case 777:
      return ["","отметка","отметки","отметок"];
    case 97:
      return ["","белгі","белгілер","белгілер"];
    case 100:
      return ["","отметка","отметки","отметок"];
    default:
      return ["","mark","marks","marks"];
  }
}

export default getPhotoTagText;