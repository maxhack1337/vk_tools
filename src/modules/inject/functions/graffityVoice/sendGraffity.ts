import onClose from "./onClose";
import uploadFile123 from "./uploadFile123";

const sendGraffity = async (fileNameOutput: string | Blob) => {
  const url1 = "https://api.vk.com/method/docs.getMessagesUploadServer?v=5.231&client_id=5776857&access_token=" + localStorage.getItem("vk_enhancer_access_token") + "&type=graffiti";

  fetch(url1)
    .then((response) => response.json())
    .then(async (data) => {
      const uploadUrlGraf = data.response.upload_url;

      let file = await uploadFile123(uploadUrlGraf, fileNameOutput);

      const parsedData = JSON.parse(file);
      console.info("[VK Tools] File uploaded");
      console.log(parsedData["file"]);
      let doc = await vkApi.api("docs.save", { file: parsedData["file"] });
      doc = doc.graffiti;

      let peerId = new URL(window.location.href).pathname.split("/").at(-1);
      await vkApi.api("messages.send", {
        peer_id: peerId,
        attachment: `doc${doc.owner_id}_${doc.id}_${doc.access_key}`,
        random_id: Math.floor(Math.random() * 2147483647),
      });
      onClose();
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
};

export default sendGraffity;
