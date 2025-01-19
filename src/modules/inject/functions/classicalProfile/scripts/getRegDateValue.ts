import formatRegDate from "./formatRegDate";

const getRegDateValue = async(id:number) => {
        const regDateAlready = Number(localStorage.getItem(`regDate_${id}`));
        if (regDateAlready) return formatRegDate(regDateAlready);

        const foafGet = await fetch(`https://vk.com/foaf.php?id=${id}`);
        const response = await foafGet.text();
        const [, regDateReady] =
          response.match(/ya:created dc:date="(.+?)"/) || [];
        if (regDateReady) {
          const regDateReadyUNIX = new Date(regDateReady).getTime();
          localStorage.setItem(`regDate_${id}`, regDateReadyUNIX.toString());
          return formatRegDate(regDateReadyUNIX);
        }
}
      
export default getRegDateValue;