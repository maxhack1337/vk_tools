import uploadFile from "./uploadFile";

const sendAudioMessage = async(fileNameOutput: string | Blob) => {
      const uploadUrl1 = await vkApi.api("docs.getMessagesUploadServer", {
        peer_id: vk.id,
        type: "audio_message",
      });
      const uploadUrl = uploadUrl1["upload_url"];

      let file = await uploadFile(uploadUrl, fileNameOutput);

      const data = JSON.parse(file);
      console.info("[VK Tools] File uploaded:", data["file"]);
      let doc = await vkApi.api("docs.save", { file: data["file"] });
      doc = doc.audio_message;

      let peerId = new URL(window.location.href).pathname.split("/").at(-1);
      await vkApi.api("messages.send", {
        peer_id: peerId,
        attachment: `doc${doc.owner_id}_${doc.id}_${doc.access_key}`,
        random_id: Math.floor(Math.random() * 2147483647),
      });
}
    
export default sendAudioMessage;