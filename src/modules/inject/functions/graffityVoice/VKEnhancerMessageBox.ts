import handleUpload from "./handleUpload";

const VKEnhancerMessageBox = async(
      title: any,
      content: string,
      buttonCont: string,
      buttonCont2: string,
      color: any,
      color2: any,
      callback: () => void
    ) => {
      var i = new MessageBox();
      i.addButton(
        buttonCont,
        function () {
          if (callback) {
            callback();
          }
        },
        color
      );
      i.addButton(buttonCont2, !1, color2);
      i.setOptions({
        title: title,
        bodyStyle:
          "overflow: hidden; text-overflow: ellipsis; color: var(--vkenhancer)",
      });
      i.content(content);
      i.show();
      const appendHere = document.querySelector(
        '.box_body[style="overflow: hidden; text-overflow: ellipsis; color: var(--vkenhancer);"]'
      );
      var inputWrap = document.createElement("a");
      inputWrap.innerHTML =
        '<input style="display:none;" type="file" id="audioFileInput" accept="audio/mp3,audio/ogg,audio/wav">';
      appendHere?.appendChild(inputWrap);
      const audioFileInput = document.getElementById("audioFileInput") as HTMLInputElement;
    audioFileInput?.addEventListener("change", function () {
        const length = audioFileInput.files?.length || 0;
        if (length > 0) {
          handleUpload();
          i.hide();
        }
      });
}
    
export default VKEnhancerMessageBox;