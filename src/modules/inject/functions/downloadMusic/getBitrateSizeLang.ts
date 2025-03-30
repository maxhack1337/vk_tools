import getDocSize from "../oldFeed/attachments/getDocSize";

const getBitrateSizeLang = (lang: number, bitrate: number, dataSize: number) => {
    const bitrateText = `Битрейт: <b>${bitrate} кбит/с</b>`;
    const sizeText = `Размер: <b>${getDocSize(dataSize)}</b>`;

    switch (lang) {
        case 0: // Русский
            return `<br><br>${bitrateText}<br>${sizeText}`;
        case 1: // Украинский
            return `<br><br>Бітрейт: <b>${bitrate} кбіт/с</b><br>Розмір: <b>${getDocSize(dataSize)}</b>`;
        case 454: // Украинский (другой вариант)
            return `<br><br>Бітрейт: <b>${bitrate} кбіт/с</b><br>Розмір: <b>${getDocSize(dataSize)}</b>`;
        case 114: // Белорусский
            return `<br><br>Бітрэйт: <b>${bitrate} кбіт/с</b><br>Памер: <b>${getDocSize(dataSize)}</b>`;
        case 2: // Другой вариант украинского
            return `<br><br>Бітрейт: <b>${bitrate} кбіт/с</b><br>Розмір: <b>${getDocSize(dataSize)}</b>`;
        case 777: // Русский (другой вариант)
            return `<br><br>${bitrateText}<br>${sizeText}`;
        case 97: // Казахский
            return `<br><br>Битрейт: <b>${bitrate} кбит/с</b><br>Көлемі: <b>${getDocSize(dataSize)}</b>`;
        case 100: // Русский (другой вариант)
            return `<br><br>${bitrateText}<br>${sizeText}`;
        default:
            return `<br><br>Bitrate: <b>${bitrate} kbps</b><br>Size: <b>${getDocSize(dataSize)}</b>`;
    }
};

export default getBitrateSizeLang;
