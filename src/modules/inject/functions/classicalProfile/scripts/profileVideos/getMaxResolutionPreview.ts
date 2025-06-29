type PreviewImage = {
  url: string;
  width: number;
  height: number;
};

const getMaxResolutionPreview = (images: PreviewImage[]): PreviewImage | null => {
  if (!images || images.length === 0) return null;

  return images.reduce((maxImg, currentImg) => {
    const maxPixels = maxImg.width * maxImg.height;
    const currentPixels = currentImg.width * currentImg.height;
    return currentPixels > maxPixels ? currentImg : maxImg;
  });
};

export default getMaxResolutionPreview;
