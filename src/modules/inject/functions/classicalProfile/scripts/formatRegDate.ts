import padZero from "./padZero";

      const formatRegDate = (unixTimestamp: string | number | Date) => {
        const date = new Date(unixTimestamp);
        const formattedDate = [
          `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
          `(${padZero(date.getHours())}:${padZero(date.getMinutes())})`,
        ];
        return formattedDate;
}
      
export default formatRegDate;