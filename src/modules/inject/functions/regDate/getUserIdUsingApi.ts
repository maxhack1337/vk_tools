const getUserIdUsingApi = async () => {
  const url = window.location.href;
  let parts = url.split("/");
  let username = parts[parts.length - 1];
  if (username.includes("?")) {
    username = username.split("?")[0];
  }
  const url1 = await vkApi.api("users.get", { user_ids: username });
  return url1[0].id || 1;
};

export default getUserIdUsingApi;
