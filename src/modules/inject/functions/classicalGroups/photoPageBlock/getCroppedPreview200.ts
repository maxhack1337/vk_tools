const getCroppedPreview200 = async (photoObj: any) => {
  return new Promise((resolve, reject) => {
    if (!photoObj || !photoObj.orig_photo || !photoObj.square_crop) {
      reject(new Error("[VK Tools Error] Неверный объект фото или отсутствуют данные"));
      return;
    }

    const origUrl = photoObj.orig_photo.url;
    const [cropX, cropY, cropSize] = photoObj.square_crop.split(",").map(Number);
    if (cropX == null || cropY == null || cropSize == null) {
      reject(new Error("[VK Tools Error] Неверные параметры square_crop"));
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = origUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");

      ctx?.drawImage(img, cropX, cropY, cropSize, cropSize, 0, 0, 200, 200);

      const resultDataUrl = canvas.toDataURL("image/jpeg", 0.9);
      resolve(resultDataUrl);
    };

    img.onerror = (e) => {
      reject(new Error("[VK Tools Error] Ошибка загрузки изображения: " + e));
    };
  });
};

export default getCroppedPreview200;
