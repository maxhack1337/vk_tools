import getUserDataReactSpa from "./spa/getUserDataReactSpa";

const getUserDataPhoto = async (objectId: any) => {
  try {
    let response = await getUserDataReactSpa();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getUserDataPhoto;
