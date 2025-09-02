const redirectIfNeeded = () => {
  const currentUrl = window.location.href;
  const baseUrl = `https://${vk.__domain || "vk.ru"}/groups`;
  const startsWithId = currentUrl.startsWith(`https://${vk.__domain || "vk.ru"}/groups?id=`);

  if (currentUrl.startsWith(baseUrl) && !currentUrl.startsWith(baseUrl + "/") && !startsWithId) {
    if (!currentUrl.includes("act=recommendations")) {
      const url = new URL(currentUrl);
      url.pathname = "/groups/my_all_groups";
      window.location.href = url.toString();
    }
  }
};

export default redirectIfNeeded;
