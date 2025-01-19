      const getMonthNameOnline = (month: number) => {
        let monthNames = [
          getLang?.("month1_of"),
          getLang?.("month2_of"),
          getLang?.("month3_of"),
          getLang?.("month4_of"),
          getLang?.("month5_of"),
          getLang?.("month6_of"),
          getLang?.("month7_of"),
          getLang?.("month8_of"),
          getLang?.("month9_of"),
          getLang?.("month10_of"),
          getLang?.("month11_of"),
          getLang?.("month12_of"),
        ];
        return monthNames[month - 1];
}
      
export default getMonthNameOnline;