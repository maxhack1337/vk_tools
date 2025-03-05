import { IS_SPA } from "./constants";
import getUserDataReact from "./getUserDataReact";
import getUserDataReactSpa from "./spa/getUserDataReactSpa";

const getUserDataPhoto = async(objectId: any) => {
        try {
          let response = IS_SPA ? await getUserDataReactSpa() : await getUserDataReact();
          return response;
        } catch (error) {
          console.error(error);
          return [];
        }
}
      
export default getUserDataPhoto;