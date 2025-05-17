import { appearSimpleLoader, removeSimpleLoader } from "../../components/simpleLoader/simpleLoader";
import convertAudioToMono from "./audioMessageToMono/convertAudioToMono";
import sendAudioMessage from "./sendAudioMessage";

const handleUpload = async () => {
  appearSimpleLoader();
  try {
    const audioFileInput = document.getElementById("audioFileInput") as HTMLInputElement;
    const files = audioFileInput.files || [];
    let file = files[0];
    file = await convertAudioToMono(file);
    await sendAudioMessage(file);
  } catch (e) {
    console.error("[VK Tools voiceMessage Error]", e);
    removeSimpleLoader();
  }
};

export default handleUpload;
