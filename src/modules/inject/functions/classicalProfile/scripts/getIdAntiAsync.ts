const getIdAntiAsync = () => {
  const url = window.location.href;
  let parts = url.split("/");
  let username = parts[parts.length - 1];
  if (username.includes("?")) {
    username = username.split("?")[0];
  }

  return vkApi.api('users.get', { user_ids: username })
    .then((response: { id: number; }[]) => {
      return response[0].id || 1;
    })
    .catch((error: any) => {
      console.error(error);
      return 1;
    });
}

export default getIdAntiAsync;
