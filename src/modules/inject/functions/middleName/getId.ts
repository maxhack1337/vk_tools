  const getId = async() => {
    const url = window.location.href;
    var parts = url.split("/");
    var username = parts[parts.length - 1];
    if (username.includes("?")) {
      username = username.split("?")[0];
    }
    const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
    try {
      const response = await fetch(url1);
      const data = await response.json();
      return data.response.object_id;
    } catch (error) {
      console.error(error);
      return 1;
    }
}
  
export default getId;