import formatRegDate from "./formatRegDate";

const getRegDateValue = async(id:number) => {
        const regDateAlready = Number(localStorage.getItem(`regDate_${id}`));
        if (regDateAlready) return formatRegDate(regDateAlready);

        const foafGet = await fetch(`https://api.vkenhancer.ru/vktools.getUserRegistrationDate?id=${id}`);
        const response = await foafGet.json();
        const regDateReady =
          response.vk_tools_registration_date || 'error';
        if (regDateReady && regDateReady !== 'error') {
          const regDateReadyUNIX = new Date(regDateReady).getTime();
          localStorage.setItem(`regDate_${id}`, regDateReadyUNIX.toString());
          return formatRegDate(regDateReadyUNIX);
        }
}
      
export default getRegDateValue;