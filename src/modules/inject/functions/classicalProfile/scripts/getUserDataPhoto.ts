import getUserDataReact from "./getUserDataReact";

const getUserDataPhoto = async(objectId: any) => {
        try {
          let response = await getUserDataReact();
          return response;
        } catch (error) {
          console.error(error);
          return [];
        }
}
      
export default getUserDataPhoto;