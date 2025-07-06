import getGroupIdFromUrl from "../removedMessages/getGroupIdFromUrl";

async function vkApiWithGroup(method: string, params: any = {}) {
  let isGim = Boolean(document?.querySelector(".ConvoList__headerGroup"));
  let group_id = isGim ? getGroupIdFromUrl() : null;
  if (isGim && group_id) {
    params = { ...params, group_id };
  }
  return vkApi.api(method, params);
}

export default vkApiWithGroup;
