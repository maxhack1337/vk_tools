import getMonthNameOnline from "./getMonthNameOnline";

        const formatRegister = (bdate: string) => {
          if (!bdate) return null;
          let parts = bdate.split(".");
          let day = parts[0];
          let month = getMonthNameOnline(Number(parts[1]));
          let year = parts[2];
          let formattedDate = `${day} ${month}`;
          let yearLink = year;
          if (year) {
            formattedDate += ` ${yearLink}`;
          }
          return `${formattedDate}`;
}
        
export default formatRegister;