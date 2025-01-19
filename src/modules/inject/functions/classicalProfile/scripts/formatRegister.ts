import getMonthNameOnline from "./getMonthNameOnline";

        const formatRegister = (bdate: string) => {
          if (!bdate) return null;
          var parts = bdate.split(".");
          var day = parts[0];
          var month = getMonthNameOnline(Number(parts[1]));
          var year = parts[2];
          var formattedDate = `${day} ${month}`;
          var yearLink = year;
          if (year) {
            formattedDate += ` ${yearLink}`;
          }
          return `${formattedDate}`;
}
        
export default formatRegister;