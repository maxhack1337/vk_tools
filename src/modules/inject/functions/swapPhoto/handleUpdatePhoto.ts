import sendUpdatePhoto from "./sendUpdatePhoto";

const handleUpdatePhoto = async() => {
  const filesInputUpdate = document.getElementById("photoUpdateInput") as HTMLInputElement;
  const file = filesInputUpdate.files![0];
  await sendUpdatePhoto(file);
}

export default handleUpdatePhoto;