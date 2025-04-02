import getDetermineText from "../../regDate/getDetermineText";
import getRegDateLabel from "./getRegDateLabel";

const createRegDateInfoRow = () => {
  let clearFix = document.createElement("div");
  clearFix.classList.add("clear_fix", "profile_info_row");
  let labelDiv = document.createElement("div");
  labelDiv.classList.add("label", "fl_l");
  const labelText = getRegDateLabel(vk.lang);
  labelDiv.textContent = labelText; 
  let captchaRequired = document.createElement("a");
  captchaRequired.innerText = getDetermineText(vk.lang);
  captchaRequired.classList.add("captcha_vktools");
  clearFix.appendChild(labelDiv);
  clearFix.appendChild(captchaRequired);
  return clearFix;
}
        
export default createRegDateInfoRow;