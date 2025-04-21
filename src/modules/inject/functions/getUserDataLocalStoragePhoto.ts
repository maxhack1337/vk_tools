const getUserDataLocalStoragePhoto = async (objectId: number) => {
  try {
    let response = await vkApi.api("users.get", {
      user_ids: objectId,
      fields: "photo_id,photo_200",
    });
    localStorage.setItem("ownerPhoto200", response[0].photo_200);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default getUserDataLocalStoragePhoto;