const postingEmojiHint = (lang: number) => {
  switch (lang) {
    case 0:
      return "Используйте TAB, чтобы быстрее открывать смайлы";
    case 1:
      return "Використовуйте TAB, щоб швидше відкривати смайли";
    case 454:
      return "Використовуйте TAB, щоб швидше відкривати смайли";
    case 114:
      return "Выкарыстоўвайце TAB, каб хутчэй адкрываць смайлы";
    case 2:
      return "Выкарыстоўвайце TAB, каб хутчэй адкрываць смайлы";
    case 777:
      return "Воспользуйтесь рычагом ТАБ для быстрого доступа к искусственным эмоциям";
    case 97:
      return "Смайлдарды тездетіп ашу үшін ТАВ пернесін қолданыңыз";
    case 100:
      return "Клавиша TAB явитъ ​потѣшныя​ рожицы";
    default:
      return "Use the TAB key to insert emoji faster";
  }
};

export default postingEmojiHint;
