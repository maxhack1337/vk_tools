      const getIdAntiAsync = () => {
        const url = window.location.href;
        let parts = url.split("/");
        let username = parts[parts.length - 1];
        if (username.includes("?")) {
          username = username.split("?")[0];
        }
        const url1 = `https://vkenhancer-api.vercel.app/getId?username=${username}`;
        return fetch(url1)
          .then((response) => response.json())
          .then((data) => data.response.object_id)
          .catch((error) => {
            console.error(error);
            return 1;
          });
}
      
export default getIdAntiAsync;