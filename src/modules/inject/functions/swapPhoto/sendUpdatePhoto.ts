import uploadUpdatePhoto from "./uploadUpdatePhoto";

const sendUpdatePhoto = async(fileNameOutput: string | Blob) => {
  const uploadUrl1 = await vkApi.api("photos.getPhotoEditorUploadServer", {});
  const uploadUrl = uploadUrl1["upload_url"];

  let file = await uploadUpdatePhoto(uploadUrl, fileNameOutput);
  
  const data = JSON.parse(file);
  let photoId = cur.pvCurPhoto.id;
  let doc = await vkApi.api("photos.savePhotoEditor", {
    response_json: file,
    photo: photoId,
  });
  nav.reload();
}

export default sendUpdatePhoto;