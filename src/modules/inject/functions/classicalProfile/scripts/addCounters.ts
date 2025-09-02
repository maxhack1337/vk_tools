import formatCounterValue from "./formatCounterValue";
import formatValueInt from "./formatValueInt";
import getCounterLabel from "./getCounterLabel";
import sortObject from "./sortObject";

const addCounters = (userData: { can_access_closed: any; id: any }, countersData: { [x: string]: any }) => {
  let countsModule = document.createElement("div");
  countsModule.classList.add("counts_module");
  let order = ["mutual_friends", "friends", "followers", "photos", "user_photos", "videos", "audios", "posts"];
  if (countersData) {
    countersData = sortObject(countersData, order);
  } else {
    return;
  }
  for (let counterType in countersData) {
    let value = countersData[counterType];
    if (value !== 0) {
      let formValue = formatCounterValue(value);
      let counterDiv = document.createElement("a");
      counterDiv.classList.add("counter");
      value = formatValueInt(value);
      let valueDiv = document.createElement("div");
      valueDiv.classList.add("value");
      valueDiv.textContent = formValue;
      counterDiv.appendChild(valueDiv);

      let labelDiv = document.createElement("div");
      labelDiv.classList.add("label");

      if (labelDiv) labelDiv.textContent = getCounterLabel(counterType, value) || "";
      if (labelDiv.textContent !== "") {
        counterDiv.appendChild(labelDiv);
        countsModule.appendChild(counterDiv);
      }
      let labelHref;
      let labelOnclick;
      let labelClass;
      switch (counterType) {
        case "photos":
          labelClass = "vkenhancerCounterPhoto";
          if (userData.can_access_closed) {
            labelHref = `https://${vk.__domain || "vk.ru"}/albums${userData.id}?profile=1`;
            labelOnclick = `return showAlbums(${userData.id}, {noHistory: true}, event);`;
          }
          break;
        case "audios":
          labelClass = "vkenhancerCounterAudios";
          if (userData.can_access_closed) {
            labelHref = `https://${vk.__domain || "vk.ru"}/audios${userData.id}`;
            labelOnclick = `return page.showPageAudios(event, ${userData.id});`;
          }
          break;
        case "followers":
          labelClass = "vkenhancerCounterFollowers";
          if (userData.can_access_closed) {
            labelHref = `https://${vk.__domain || "vk.ru"}/friends?id=${userData.id}&section=subscribers`;
            labelOnclick = `return page.showPageMembers(event, ${userData.id}, 'followers');`;
          }
          break;
        case "friends":
          labelClass = "vkenhancerCounterFriends";
          if (userData.can_access_closed) {
            labelHref = `https://${vk.__domain || "vk.ru"}/friends?id=${userData.id}&section=friends`;
            labelOnclick = `return page.showPageMembers(event, ${userData.id}, 'friends');`;
          }
          break;
        case "user_photos":
          labelClass = "vkenhancerCounterUserPhotos";
          if (userData.can_access_closed) {
            labelHref = `https://${vk.__domain || "vk.ru"}/tag${userData.id}`;
            labelOnclick = `return showPhotoTags(${userData.id}, {noHistory: true}, event);`;
          }
          break;
        case "mutual_friends":
          labelClass = "vkenhancerCounterMutual";
          labelHref = `https://${vk.__domain || "vk.ru"}/friends?id=${userData.id}&section=common`;
          labelOnclick = `return page.showPageMembers(event, ${userData.id}, 'common');`;
          break;
        case "videos":
          labelClass = "vkenhancerCounterVideos";
          if (userData.can_access_closed) {
            labelHref = `https://${vk.__domain || "vk.ru"}/videos${userData.id}`;
            labelOnclick = `return page.showPageVideos(event, ${userData.id});`;
          }
          break;
        case "posts":
          labelClass = "vkenhancerCounterPages";
          counterDiv.classList.add(labelClass);
          break;
      }
      if (labelHref && counterDiv) {
        counterDiv.href = labelHref;
        counterDiv.classList.add(labelClass || "");
        counterDiv.setAttribute("onclick", labelOnclick || "");
      }
      if (counterType === "posts" && userData.can_access_closed) {
        try {
          countsModule?.querySelector(".vkenhancerCounterPages")?.remove();
        } catch (error) {}
      }
    }
  }

  let pageCounter = document.createElement("a");
  pageCounter.classList.add("page_counter");
  pageCounter.appendChild(countsModule);

  if (countsModule.children.length > 0) {
    let countsContainer = document.querySelector(".ProfileInfo");
    countsContainer?.appendChild(pageCounter);
  }
};

export default addCounters;
