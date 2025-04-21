import getZodiacSigns from "./getZodiacSigns";

const getZodiacIndex = (den: number, month: number) => {
  let value = "";
  den = Number(den);
  month = Number(month);
  switch (month) {
    case 1:
      if (den <= 19) value = getZodiacSigns(vk.lang)[9];
      else value = getZodiacSigns(vk.lang)[10];
      break;
    case 2:
      if (den <= 18) value = getZodiacSigns(vk.lang)[10];
      else value = getZodiacSigns(vk.lang)[11];
      break;
    case 3:
      if (den <= 20) value = getZodiacSigns(vk.lang)[11];
      else value = getZodiacSigns(vk.lang)[0];
      break;
    case 4:
      if (den <= 19) value = getZodiacSigns(vk.lang)[0];
      else value = getZodiacSigns(vk.lang)[1];
      break;
    case 5:
      if (den <= 20) value = getZodiacSigns(vk.lang)[1];
      else value = getZodiacSigns(vk.lang)[2];
      break;
    case 6:
      if (den <= 21) value = getZodiacSigns(vk.lang)[2];
      else value = getZodiacSigns(vk.lang)[3];
      break;
    case 7:
      if (den <= 22) value = getZodiacSigns(vk.lang)[3];
      else value = getZodiacSigns(vk.lang)[4];
      break;
    case 8:
      if (den <= 22) value = getZodiacSigns(vk.lang)[4];
      else value = getZodiacSigns(vk.lang)[5];
      break;
    case 9:
      if (den <= 22) value = getZodiacSigns(vk.lang)[5];
      else value = getZodiacSigns(vk.lang)[6];
      break;
    case 10:
      if (den <= 22) value = getZodiacSigns(vk.lang)[6];
      else value = getZodiacSigns(vk.lang)[7];
      break;
    case 11:
      if (den <= 22) value = getZodiacSigns(vk.lang)[7];
      else value = getZodiacSigns(vk.lang)[8];
      break;
    case 12:
      if (den <= 21) value = getZodiacSigns(vk.lang)[8];
      else value = getZodiacSigns(vk.lang)[9];
      break;
    default:
      value = "Zodiac parsing failed";
  }
  return value;
}

export default getZodiacIndex;