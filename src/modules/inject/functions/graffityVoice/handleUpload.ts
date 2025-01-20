import sendAudioMessage from "./sendAudioMessage";

const handleUpload = async() => {
    const audioFileInput = document.getElementById("audioFileInput") as HTMLInputElement;
    const files = audioFileInput.files || [];
      const file = files[0];
      await sendAudioMessage(file);
}
    
export default handleUpload;