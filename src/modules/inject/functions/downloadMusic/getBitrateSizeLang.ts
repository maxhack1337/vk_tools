import getDocSize from "../oldFeed/attachments/getDocSize";

const getBitrateSizeLang = (lang: number, bitrate: number, dataSize: number) => {
  const bitrateText = `Битрейт: <b>${bitrate} кбит/с</b>`;
  const sizeText = `Размер: <b>${getDocSize(dataSize)}</b>`;

  switch (lang) {
    case 0:
      return `<br><br>${bitrateText}<br>${sizeText}`;
    case 1:
      return `<br><br>Бітрейт: <b>${bitrate} кбіт/с</b><br>Розмір: <b>${getDocSize(dataSize)}</b>`;
    case 454:
      return `<br><br>Бітрейт: <b>${bitrate} кбіт/с</b><br>Розмір: <b>${getDocSize(dataSize)}</b>`;
    case 114:
      return `<br><br>Бітрэйт: <b>${bitrate} кбіт/с</b><br>Памер: <b>${getDocSize(dataSize)}</b>`;
    case 2:
      return `<br><br>Бітрейт: <b>${bitrate} кбіт/с</b><br>Розмір: <b>${getDocSize(dataSize)}</b>`;
    case 777:
      return `<br><br>${bitrateText}<br>${sizeText}`;
    case 97:
      return `<br><br>Битрейт: <b>${bitrate} кбит/с</b><br>Көлемі: <b>${getDocSize(dataSize)}</b>`;
    case 100:
      return `<br><br>${bitrateText}<br>${sizeText}`;
    default:
      return `<br><br>Bitrate: <b>${bitrate} kbps</b><br>Size: <b>${getDocSize(dataSize)}</b>`;
  }
};

export default getBitrateSizeLang;
