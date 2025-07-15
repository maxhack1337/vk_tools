const deletePhotoConfirmLang = (lang: number) => {
  switch (lang) {
    case 0:
      return "Вы уверены, что хотите удалить фотографию?";
    case 1:
    case 454:
      return "Ви впевнені, що хочете видалити фотографію?";
    case 114:
    case 2:
      return "Вы ўпэўнены, што хочаце выдаліць фатаграфію?";
    case 777:
    case 100:
      return "Вы уверены, что хотите удалить фотографию?";
    case 97:
      return "Суретіңізді жойғыңыз келетініне сенімдісіз бе?";
    default:
      return "Are you sure you want to delete the photo?";
  }
};

export default deletePhotoConfirmLang;
