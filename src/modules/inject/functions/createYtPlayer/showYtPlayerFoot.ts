const showYtPlayerFoot = (lang: number) => {
  switch (lang) {
    case 0:
      return "Нажмите, чтобы показать встроенный YouTube-плеер";
    case 1:
      return "Натисніть, щоб показати вбудований YouTube програвач";
    case 454:
      return "Натисніть, щоб показати вбудований YouTube програвач";
    case 114:
      return "Націсніце, каб паказаць убудаваны YouTube-плэер";
    case 2:
      return "Націсніце, каб паказаць убудаваны YouTube-плэер";
    case 777:
      return "Нажмите, чтобы показать встроенный YouTube-плеер";
    case 97:
      return "Енгізілген YouTube ойнатқышын көрсету үшін басыңыз";
    case 100:
      return "Нажмите, чтобы показать встроенный YouTube-плееръ";
    default:
      return "Click to show embedded YouTube player";
  }
};

export default showYtPlayerFoot;
