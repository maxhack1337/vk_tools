const fetchGroups = async () => {
  try {
    let objectGroups: any = {};
    const groups = await vkApi.api("groups.get", { user_id: cur.oid, filter: cur.oid === vk.id ? "groups,events" : "groups", extended: 1 });
    if (groups && groups.items && groups.count > 0) {
      groups.items.forEach((item: any) => {
        objectGroups[item.name] = item.screen_name ? `https://vk.com/${item.screen_name}` : `https://vk.com/club${item.id}`;
      });

      return objectGroups;
    } else {
      return {};
    }
  } catch (error) {
    return {};
  }
};

export default fetchGroups;
