const getMyPhotoText = (lang: number) => {
  switch (lang) {
    case 0:
      return "Мои фотографии";
    case 1:
      return "Мої фотографії";
    case 454:
      return "Мої фотографії";
    case 114:
      return "Мае фатаграфіі";
    case 2:
      return "Мае фатаграфіі";
    case 777:
      return "Мои фотокарточки";
    case 97:
      return "Менің фотоларым";
    case 100:
      return "Мои фотокарточки";
    default:
      return "My photos";
  }
}

export default getMyPhotoText;