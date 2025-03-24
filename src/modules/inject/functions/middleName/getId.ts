  const getId = async() => {
    const url = window.location.href;
    var parts = url.split("/");
    var username = parts[parts.length - 1];
    if (username.includes("?")) {
      username = username.split("?")[0];
    }
    const url1 = await vkApi.api('users.get',{user_ids:username});
    return url1[0].id || 1
}
  
export default getId;