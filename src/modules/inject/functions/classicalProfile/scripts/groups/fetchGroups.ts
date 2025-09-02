const fetchGroups = async () => {
  try {
    let objectGroups: any = {};
    const groups = await vkApi.api("groups.get", { user_id: cur.oid, extended: 1 });
    if (groups && groups.items && groups.count > 0) {
      groups.items.forEach((item: any) => {
        objectGroups[item.name] = item.screen_name ? `https://${vk.__domain || "vk.ru"}/${item.screen_name}` : `https://${vk.__domain || "vk.ru"}/club${item.id}`;
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
