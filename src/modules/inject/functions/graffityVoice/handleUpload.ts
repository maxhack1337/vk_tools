import convertAudioToMono from "./audioMessageToMono/convertAudioToMono";
import sendAudioMessage from "./sendAudioMessage";

const handleUpload = async () => {
  const audioFileInput = document.getElementById("audioFileInput") as HTMLInputElement;
  const files = audioFileInput.files || [];
  let file = files[0];
  file = await convertAudioToMono(file);
  await sendAudioMessage(file);
};

export default handleUpload;
