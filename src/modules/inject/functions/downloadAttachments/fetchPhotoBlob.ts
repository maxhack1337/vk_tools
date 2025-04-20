const fetchPhotoBlob = async (url: string, signal?: AbortSignal): Promise<Blob> => {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Ошибка загрузки ${url}: ${response.statusText}`);
  return await response.blob();
}

export default fetchPhotoBlob;