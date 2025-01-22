	const getMonthNamePost = (month: number) => {
        var monthNames = [
          getLang?.("month1sm_of"),
          getLang?.("month2sm_of"),
          getLang?.("month3sm_of"),
          getLang?.("month4sm_of"),
          getLang?.("month5sm_of"),
          getLang?.("month6sm_of"),
          getLang?.("month7sm_of"),
          getLang?.("month8sm_of"),
          getLang?.("month9sm_of"),
          getLang?.("month10sm_of"),
          getLang?.("month11sm_of"),
          getLang?.("month12sm_of"),
        ];
        return monthNames[month - 1];
}
      
export default getMonthNamePost;