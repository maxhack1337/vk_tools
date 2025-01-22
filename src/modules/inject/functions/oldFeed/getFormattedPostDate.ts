import getLangTime from "../classicalProfile/scripts/getLangTime";
import getMonthNamePost from "./getMonthNamePost";

      const getFormattedPostDate = (onlineInfo: number) => {
        let currentTime = Math.floor(Date.now() / 1000);
        let secondsAgo = currentTime - onlineInfo;
        let justNow = getLang?.("global_just_now");
        let secsAgo = getLang?.("global_secs_ago", "raw");
        let minsAgo = getLang?.("global_mins_ago", "raw");
        let hours12345 = getLang?.("global_word_hours_ago", "raw");
        let minutes12345 = getLang?.(
          "mobile_profile_status_word_mins_ago",
          "raw"
        );
        let longAgo = getLang?.("global_short_date_time", "raw");
		let longAgoYear = getLang?.("global_short_date_year_time", "raw");

        if (secondsAgo <= 0) {
          return justNow;
        } else if (secondsAgo < 60) {
          let secString = getLangTime(secondsAgo, secsAgo!);
          return secString;
        } else if (secondsAgo < 3600) {
          let minutesAgo = Math.floor(secondsAgo / 60);
          let minString;
          if (minutesAgo < 6) {
            minString = minutes12345?.[minutesAgo];
          } else {
            minString = getLangTime(minutesAgo, minsAgo!);
          }
          return minString;
        } else if (secondsAgo < 14400) {
          let hourssAgo = Math.floor(secondsAgo / 3600);
          let hourString;
          hourString = hours12345?.[hourssAgo];
          return hourString;
        } else {
          let lastSeenDate = new Date(onlineInfo * 1000);
          let day = lastSeenDate.getDate();
          let month = getMonthNamePost(lastSeenDate.getMonth() + 1);
          let hour = lastSeenDate.getHours();
		  let nowDate = new Date();
		  let dayNow = nowDate.getDate();
		  let monthNow = nowDate.getMonth() + 1;
		  let monthPost = lastSeenDate.getMonth() + 1;
		  let yearNow = nowDate.getFullYear();
		  let yearNewNew = lastSeenDate.getFullYear();
          let minute = lastSeenDate.getMinutes().toString().padStart(2, "0");

          let dateString;
          if (day === dayNow && monthNow === monthPost && yearNow === yearNewNew) {
            dateString = longAgo?.[3]
              .replace("{hour}", hour.toString())
              .replace("{minute}", minute);
          } else if (dayNow-day === 1 && monthNow === monthPost && yearNow === yearNewNew) {
            dateString = longAgo?.[2]
              .replace("{hour}", hour.toString())
              .replace("{minute}", minute);
          } else if (yearNewNew === yearNow){
            dateString = longAgo?.[1]
              .replace("{day}", day.toString())
              .replace("{month}", month?.toString()!)
              .replace("{hour}", hour.toString())
              .replace("{minute}", minute);
          } else {
            dateString = longAgoYear?.[1]
              .replace("{day}", day.toString())
              .replace("{month}", month?.toString()!)
			  .replace("{year}", yearNewNew?.toString())
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
      
export default getFormattedPostDate;