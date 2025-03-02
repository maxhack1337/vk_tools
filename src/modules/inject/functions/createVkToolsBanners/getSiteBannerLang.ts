const getSiteBannerLang = (lang:number) => {
  switch (lang) {
    case 0:
      return ["Напиши нам, если есть вопросы, или ты нашёл ошибку","Написать"];
    case 1:
      return ["Напиши нам, якщо є питання, або ти знайшов помилку","Написати"];
    case 454:
      return ["Напиши нам, якщо є питання, або ти знайшов помилку","Написати"];
    case 114:
      return ["Напішы нам, калі ёсць пытанні, ці ты знайшоў памылку","Напісаць"];
    case 2:
      return ["Напішы нам, калі ёсць пытанні, ці ты знайшоў памылку","Напісаць"];
    case 777:
      return ["Товарищ! Отправь нам телеграмму, если есть вопросы, или ты столкнулся с недоразумением!","Отправить телеграмму"];
    case 97:
      return ["Сұрақтарыңыз болса немесе қате тапсаңыз, бізге жазыңыз","Жазыңыз"];
    case 100:
      return ["Напиши нам, если есть вопросы, или ты нашёл ошибку","Написать"];
    default:
      return ["Write to us if you have questions or if you found a bug", "Write"];
  }
}

export default getSiteBannerLang;