export const getExtensionFromMimeType = (mimeType: string, mimeTypes: any): string | undefined => {
  const mimeTypeData = (mimeTypes as any)[mimeType];
  return mimeTypeData?.extensions?.[0];
};

export default getExtensionFromMimeType;
