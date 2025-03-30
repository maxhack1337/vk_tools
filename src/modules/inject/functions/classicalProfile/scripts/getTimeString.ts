import getLangTime from "./getLangTime";
import getMonthNameOnline from "./getMonthNameOnline";

      const getTimeString = (onlineInfo: { last_seen: number; }) => {
        let currentTime = Math.floor(Date.now() / 1000); 
        let secondsAgo = currentTime - onlineInfo.last_seen;
        let justNow = getLang?.("global_just_now");
        let secsAgo = getLang?.("global_secs_ago", "raw") || [
    "",
    "%s секунду назад",
    "%s секунды назад",
    "%s секунд назад"
];
        let minsAgo = getLang?.("global_mins_ago", "raw") || [
    "",
    "%s минуту назад",
    "%s минуты назад",
    "%s минут назад"
];
        let hours12345 = getLang?.("global_word_hours_ago", "raw");
        let minutes12345 = getLang?.(
          "mobile_profile_status_word_mins_ago",
          "raw"
        );
        let longAgo = getLang?.("global_short_date_time", "raw");

        if (secondsAgo === 0) {
          return justNow;
        } else if (secondsAgo < 60) {
          let secString = getLangTime(secondsAgo, secsAgo);
          return secString;
        } else if (secondsAgo < 3600) {
          let minutesAgo = Math.floor(secondsAgo / 60);
          let minString;
          if (minutesAgo < 6) {
            minString = minutes12345?.[minutesAgo];
          } else {
            minString = getLangTime(minutesAgo, minsAgo);
          }
          return minString;
        } else if (secondsAgo < 14400) {
          let hourssAgo = Math.floor(secondsAgo / 3600);
          let hourString;
          hourString = hours12345?.[hourssAgo];
          return hourString;
        } else {
  let lastSeenDate = new Date(onlineInfo.last_seen * 1000);
  let day = lastSeenDate.getDate();
  let monthResult = getMonthNameOnline(lastSeenDate.getMonth() + 1) || '';
  let month = Array.isArray(monthResult) ? monthResult.join(", ") : monthResult;
  let hour = lastSeenDate.getHours();
  let minute = lastSeenDate.getMinutes().toString().padStart(2, "0");

  let dateString;
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let yesterday = new Date(today.getTime() - 86400000); 

  if (lastSeenDate >= today) {
    dateString = longAgo?.[3]
      .replace("{hour}", hour.toString())
      .replace("{minute}", minute);
  } else if (lastSeenDate >= yesterday) {
    dateString = longAgo?.[2]
      .replace("{hour}", hour.toString())
      .replace("{minute}", minute);
  } else {
    const longAgoString = longAgo?.[1] || "";
    dateString = longAgoString
      .replace("{day}", day.toString())
      .replace("{month}", month)
      .replace("{hour}", hour.toString())
      .replace("{minute}", minute);
  }

  if (dateString?.includes("{am_pm}")) {
    let am_pm = hour >= 12 ? "PM" : "AM";
    let newHour = hour % 12 || 12; 
    dateString = dateString
      .replace(hour.toString(), newHour.toString())
      .replace("{am_pm}", am_pm);
  }

  return dateString;
}

}
      
export default getTimeString;