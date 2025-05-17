import getDocSize from "../oldFeed/attachments/getDocSize";

const getBitrateSizeDivLang = (lang: number, bitrate: number, dataSize: number) => {
  const bitrateText = `Битрейт: <b>${bitrate} кбит/с</b>`;
  const sizeText = `Размер: <b>${getDocSize(dataSize)}</b>`;

  switch (lang) {
    case 0:
      return `<br><div>${bitrateText}</div><div>${sizeText}</div>`;
    case 1:
      return `<br><div>Бітрейт: <b>${bitrate} кбіт/с</b></div><div>Розмір: <b>${getDocSize(dataSize)}</b></div>`;
    case 454:
      return `<br><div>Бітрейт: <b>${bitrate} кбіт/с</b></div><div>Розмір: <b>${getDocSize(dataSize)}</b></div>`;
    case 114:
      return `<br><div>Бітрэйт: <b>${bitrate} кбіт/с</b></div><div>Памер: <b>${getDocSize(dataSize)}</b></div>`;
    case 2:
      return `<br><div>Бітрейт: <b>${bitrate} кбіт/с</b></div><div>Розмір: <b>${getDocSize(dataSize)}</b></div>`;
    case 777:
      return `<br><div>${bitrateText}</div><div>${sizeText}</div>`;
    case 97:
      return `<br><div>Битрейт: <b>${bitrate} кбит/с</b></div><div>Көлемі: <b>${getDocSize(dataSize)}</b></div>`;
    case 100:
      return `<br><div>${bitrateText}</div><div>${sizeText}</div>`;
    default:
      return `<br><div>Bitrate: <b>${bitrate} kbps</b></div><div>Size: <b>${getDocSize(dataSize)}</b></div>`;
  }
};

export default getBitrateSizeDivLang;
