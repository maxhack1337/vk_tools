import fromId from "../../../content/fromId";
import initDownloadAttachesBox from "../downloadAttachments/initDownloadAttachesBox";
import vkApiWithGroup from "../graffityVoice/vkApiWithGroup";
import getBeginChat from "./getBeginChat";
import getDownloadAttachments from "./getDownloadAttachments";
import getPeerProps from "./getPeerProps";
import getReadChat from "./getReadChat";
import vkToolsOnlineBox from "./vkToolsOnlineBox";

interface OnlineUser {}

/*
 * В этот модуль лучше особо не лезть, тут делал Паша какую-то дичь, я пытался рефакторнуть, но очень много всего
 * Напиши Паше если что-то сломается, я так и делал всегда)
 */

const convoButtons = () => {
  document.arrive(".ConvoHeader__controls", { existing: true }, async function (e) {
    let upToButton = document.createElement("button");
    upToButton.classList.add("ConvoHeader__action");
    upToButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2156 12.0544C15.2156 13.8258 13.7764 15.2618 12.001 15.2618C10.2256 15.2618 8.78632 13.8258 8.78632 12.0544C8.78632 10.283 10.2256 8.84698 12.001 8.84698C13.7764 8.84698 15.2156 10.283 15.2156 12.0544ZM12.001 14.1926C13.1846 14.1926 14.1441 13.2353 14.1441 12.0544C14.1441 10.8734 13.1846 9.91611 12.001 9.91611C10.8174 9.91611 9.85787 10.8734 9.85787 12.0544C9.85787 13.2353 10.8174 14.1926 12.001 14.1926Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4516 3.43023C12.1667 3.43017 11.881 3.43628 11.5961 3.42957C11.4497 3.42613 10.9359 3.41402 10.504 3.75935C10.0803 4.09817 9.92244 4.61563 9.82732 4.99591C9.77042 5.22341 9.66028 5.51469 9.51138 5.79361C9.21102 5.91293 8.92139 6.05313 8.64429 6.21236C8.343 6.15214 8.0578 6.05703 7.85155 5.96106C7.49587 5.79556 6.9931 5.59199 6.46192 5.70814C5.92151 5.8263 5.60785 6.23276 5.51857 6.34845C5.35397 6.56175 5.18343 6.77214 5.00895 6.97747C4.91403 7.08917 4.58233 7.47952 4.57906 8.03068C4.57584 8.57215 4.87853 9.02021 5.11465 9.33381C5.25992 9.52675 5.4219 9.80562 5.54639 10.106C5.45667 10.4029 5.38692 10.7084 5.33867 11.0208C5.09846 11.2312 4.83626 11.4064 4.62525 11.514C4.2754 11.6925 3.80622 11.9629 3.57137 12.4515C3.33255 12.9484 3.45945 13.4443 3.49575 13.5862C3.56253 13.8472 3.6235 14.111 3.67792 14.3748C3.70745 14.518 3.81096 15.0199 4.24413 15.3623C4.67023 15.6992 5.21122 15.7366 5.60377 15.7437C5.83588 15.7479 6.14113 15.7889 6.44388 15.8698C6.62622 16.1346 6.82698 16.3856 7.0443 16.6211C7.05447 16.9324 7.02578 17.2368 6.97791 17.4625C6.89657 17.8462 6.81165 18.38 7.04357 18.8695C7.27988 19.3683 7.74628 19.5823 7.87951 19.6434C8.12445 19.7557 8.36795 19.8744 8.60731 19.9982C8.73719 20.0653 9.19384 20.3015 9.73392 20.1802C10.2642 20.0612 10.6335 19.6646 10.8857 19.3645C11.0397 19.1813 11.2723 18.9631 11.5342 18.7755C11.8429 18.7967 12.159 18.7967 12.4677 18.7755C12.7296 18.9631 12.9622 19.1813 13.1162 19.3645C13.3685 19.6646 13.7377 20.0612 14.268 20.1802C14.8081 20.3015 15.2647 20.0653 15.3946 19.9982C15.634 19.8744 15.8775 19.7558 16.1224 19.6434C16.2557 19.5823 16.7221 19.3683 16.9584 18.8695C17.1903 18.38 17.1054 17.8462 17.024 17.4625C16.9762 17.2368 16.9475 16.9324 16.9576 16.6211C17.1749 16.3856 17.3757 16.1346 17.558 15.8698C17.8608 15.7889 18.166 15.7479 18.3982 15.7437C18.7907 15.7366 19.3317 15.6992 19.7578 15.3623C20.191 15.0199 20.2945 14.5181 20.324 14.3748C20.3784 14.111 20.4394 13.8472 20.5062 13.5862C20.5425 13.4443 20.6694 12.9484 20.4306 12.4515C20.1957 11.9629 19.7265 11.6925 19.3767 11.514C19.1657 11.4064 18.9035 11.2312 18.6633 11.0208C18.615 10.7084 18.5453 10.4029 18.4555 10.106C18.58 9.80562 18.742 9.52675 18.8873 9.33381C19.1234 9.02021 19.4261 8.57215 19.4229 8.03068C19.4196 7.47952 19.0879 7.08917 18.993 6.97746C18.8185 6.77213 18.6479 6.56175 18.4834 6.34845C18.3941 6.23276 18.0804 5.8263 17.54 5.70814C17.0088 5.59199 16.5061 5.79556 16.1504 5.96106C15.9441 6.05703 15.6589 6.15214 15.3576 6.21236C15.0805 6.05313 14.7909 5.91293 14.4905 5.79361C14.3417 5.51469 14.2315 5.22341 14.1746 4.99591C14.0832 4.63046 13.937 4.15753 13.5737 3.82428C13.148 3.43376 12.6467 3.43123 12.4672 3.43032L12.4516 3.43023ZM15.6276 18.6942L14.9481 19.0254C14.6084 19.191 14.4385 19.2738 13.9372 18.6775C13.6562 18.3431 13.2162 17.9541 12.7349 17.6753C12.2544 17.7374 11.7476 17.7374 11.2671 17.6753C10.7858 17.9541 10.3458 18.3431 10.0647 18.6775C9.56342 19.2738 9.39355 19.191 9.05382 19.0254L8.37434 18.6942C8.0346 18.5285 7.86473 18.4457 8.02627 17.6838C8.11524 17.2641 8.15142 16.6911 8.08009 16.1489C7.71605 15.8005 7.3984 15.404 7.13733 14.9697C6.62333 14.7768 6.05396 14.6825 5.62318 14.6747C4.84406 14.6606 4.80154 14.4766 4.71651 14.1084L4.54645 13.3722C4.46142 13.0041 4.41891 12.82 5.113 12.466C5.5005 12.2683 5.97627 11.9295 6.35549 11.5258C6.40173 11.027 6.51264 10.547 6.67976 10.0941C6.51655 9.56053 6.23511 9.04193 5.97138 8.69166C5.50281 8.06933 5.62175 7.92253 5.85963 7.62892L6.33539 7.0417C6.57327 6.74809 6.69221 6.60129 7.39866 6.93C7.78581 7.11015 8.33263 7.27352 8.87449 7.32688C9.29254 7.05018 9.74942 6.82739 10.2352 6.66841C10.5407 6.21002 10.7621 5.6742 10.867 5.25479C11.056 4.49918 11.245 4.49918 11.623 4.49918L12.4437 4.49933C12.7792 4.50179 12.9571 4.54363 13.1349 5.25479C13.2398 5.6742 13.4612 6.21002 13.7667 6.66841C14.2525 6.82739 14.7094 7.05018 15.1274 7.32688C15.6693 7.27352 16.2161 7.11015 16.6033 6.93C17.3097 6.60129 17.4287 6.74809 17.6665 7.0417L18.1423 7.62892C18.3802 7.92253 18.4991 8.06933 18.0305 8.69166C17.7668 9.04193 17.4854 9.56053 17.3222 10.0941C17.4893 10.547 17.6002 11.027 17.6464 11.5258C18.0257 11.9295 18.5014 12.2683 18.8889 12.466C19.583 12.82 19.5405 13.0041 19.4555 13.3722L19.2854 14.1084C19.2004 14.4766 19.1579 14.6606 18.3787 14.6747C17.948 14.6825 17.3786 14.7768 16.8646 14.9697C16.6035 15.404 16.2859 15.8005 15.9218 16.1489C15.8505 16.6911 15.8867 17.2641 15.9757 17.6838C16.1372 18.4457 15.9673 18.5285 15.6276 18.6942Z" fill="currentColor"/>
<path d="M12.4516 3.43023C12.4565 3.43027 12.4617 3.43029 12.4672 3.43032M12.4516 3.43023L12.4672 3.43032M12.4516 3.43023C12.1667 3.43017 11.881 3.43628 11.5961 3.42957C11.4497 3.42613 10.9359 3.41402 10.504 3.75935C10.0803 4.09817 9.92244 4.61563 9.82732 4.99591C9.77042 5.22341 9.66028 5.51469 9.51138 5.79361C9.21102 5.91293 8.92139 6.05313 8.64429 6.21236C8.343 6.15214 8.0578 6.05703 7.85155 5.96106C7.49587 5.79556 6.9931 5.59199 6.46192 5.70814C5.92151 5.8263 5.60785 6.23276 5.51857 6.34845C5.35397 6.56175 5.18343 6.77214 5.00895 6.97747C4.91403 7.08917 4.58233 7.47952 4.57906 8.03068C4.57584 8.57215 4.87853 9.02021 5.11465 9.33381C5.25992 9.52675 5.4219 9.80562 5.54639 10.106C5.45667 10.4029 5.38692 10.7084 5.33867 11.0208C5.09846 11.2312 4.83626 11.4064 4.62525 11.514C4.2754 11.6925 3.80622 11.9629 3.57137 12.4515C3.33255 12.9484 3.45945 13.4443 3.49575 13.5862C3.56253 13.8472 3.6235 14.111 3.67792 14.3748C3.70745 14.518 3.81096 15.0199 4.24413 15.3623C4.67023 15.6992 5.21122 15.7366 5.60377 15.7437C5.83588 15.7479 6.14113 15.7889 6.44388 15.8698C6.62622 16.1346 6.82698 16.3856 7.0443 16.6211C7.05447 16.9324 7.02578 17.2368 6.97791 17.4625C6.89657 17.8462 6.81165 18.38 7.04357 18.8695C7.27988 19.3683 7.74628 19.5823 7.87951 19.6434C8.12445 19.7557 8.36795 19.8744 8.60731 19.9982C8.73719 20.0653 9.19384 20.3015 9.73392 20.1802C10.2642 20.0612 10.6335 19.6646 10.8857 19.3645C11.0397 19.1813 11.2723 18.9631 11.5342 18.7755C11.8429 18.7967 12.159 18.7967 12.4677 18.7755C12.7296 18.9631 12.9622 19.1813 13.1162 19.3645C13.3685 19.6646 13.7377 20.0612 14.268 20.1802C14.8081 20.3015 15.2647 20.0653 15.3946 19.9982C15.634 19.8744 15.8775 19.7558 16.1224 19.6434C16.2557 19.5823 16.7221 19.3683 16.9584 18.8695C17.1903 18.38 17.1054 17.8462 17.024 17.4625C16.9762 17.2368 16.9475 16.9324 16.9576 16.6211C17.1749 16.3856 17.3757 16.1346 17.558 15.8698C17.8608 15.7889 18.166 15.7479 18.3982 15.7437C18.7907 15.7366 19.3317 15.6992 19.7578 15.3623C20.191 15.0199 20.2945 14.5181 20.324 14.3748C20.3784 14.111 20.4394 13.8472 20.5062 13.5862C20.5425 13.4443 20.6694 12.9484 20.4306 12.4515C20.1957 11.9629 19.7265 11.6925 19.3767 11.514C19.1657 11.4064 18.9035 11.2312 18.6633 11.0208C18.615 10.7084 18.5453 10.4029 18.4555 10.106C18.58 9.80562 18.742 9.52675 18.8873 9.33381C19.1234 9.02021 19.4261 8.57215 19.4229 8.03068C19.4196 7.47952 19.0879 7.08917 18.993 6.97746C18.8185 6.77213 18.6479 6.56175 18.4834 6.34845C18.3941 6.23276 18.0804 5.8263 17.54 5.70814C17.0088 5.59199 16.5061 5.79556 16.1504 5.96106C15.9441 6.05703 15.6589 6.15214 15.3576 6.21236C15.0805 6.05313 14.7909 5.91293 14.4905 5.79361C14.3417 5.51469 14.2315 5.22341 14.1746 4.99591C14.0832 4.63046 13.937 4.15753 13.5737 3.82428C13.148 3.43376 12.6467 3.43123 12.4672 3.43032M14.9481 19.0254L15.6276 18.6942C15.9673 18.5285 16.1372 18.4457 15.9757 17.6838C15.8867 17.2641 15.8505 16.6911 15.9218 16.1489C16.2859 15.8005 16.6035 15.404 16.8646 14.9697C17.3786 14.7768 17.948 14.6825 18.3787 14.6747C19.1579 14.6606 19.2004 14.4766 19.2854 14.1084L19.4555 13.3722C19.5405 13.0041 19.583 12.82 18.8889 12.466C18.5014 12.2683 18.0257 11.9295 17.6464 11.5258C17.6002 11.027 17.4893 10.547 17.3222 10.0941C17.4854 9.56053 17.7668 9.04193 18.0305 8.69166C18.4991 8.06933 18.3802 7.92253 18.1423 7.62892L17.6665 7.0417C17.4287 6.74809 17.3097 6.60129 16.6033 6.93C16.2161 7.11015 15.6693 7.27352 15.1274 7.32688C14.7094 7.05018 14.2525 6.82739 13.7667 6.66841C13.4612 6.21002 13.2398 5.6742 13.1349 5.25479C12.9571 4.54363 12.7792 4.50179 12.4437 4.49933L11.623 4.49918C11.245 4.49918 11.056 4.49918 10.867 5.25479C10.7621 5.6742 10.5407 6.21002 10.2352 6.66841C9.74942 6.82739 9.29254 7.05018 8.87449 7.32688C8.33263 7.27352 7.78581 7.11015 7.39866 6.93C6.69221 6.60129 6.57327 6.74809 6.33539 7.0417L5.85963 7.62892C5.62175 7.92253 5.50281 8.06933 5.97138 8.69166C6.23511 9.04193 6.51655 9.56053 6.67976 10.0941C6.51264 10.547 6.40173 11.027 6.35549 11.5258C5.97627 11.9295 5.5005 12.2683 5.113 12.466C4.41891 12.82 4.46142 13.0041 4.54645 13.3722L4.71651 14.1084C4.80154 14.4766 4.84406 14.6606 5.62318 14.6747C6.05396 14.6825 6.62333 14.7768 7.13733 14.9697C7.3984 15.404 7.71605 15.8005 8.08009 16.1489C8.15142 16.6911 8.11524 17.2641 8.02627 17.6838C7.86473 18.4457 8.0346 18.5285 8.37434 18.6942L9.05382 19.0254C9.39355 19.191 9.56342 19.2738 10.0647 18.6775C10.3458 18.3431 10.7858 17.9541 11.2671 17.6753C11.7476 17.7374 12.2544 17.7374 12.7349 17.6753C13.2162 17.9541 13.6562 18.3431 13.9372 18.6775C14.4385 19.2738 14.6084 19.191 14.9481 19.0254ZM12.001 15.2618C13.7764 15.2618 15.2156 13.8258 15.2156 12.0544C15.2156 10.283 13.7764 8.84698 12.001 8.84698C10.2256 8.84698 8.78632 10.283 8.78632 12.0544C8.78632 13.8258 10.2256 15.2618 12.001 15.2618ZM14.1441 12.0544C14.1441 13.2353 13.1846 14.1926 12.001 14.1926C10.8174 14.1926 9.85787 13.2353 9.85787 12.0544C9.85787 10.8734 10.8174 9.91611 12.001 9.91611C13.1846 9.91611 14.1441 10.8734 14.1441 12.0544Z" stroke="currentColor" stroke-width="0.5"/>
</svg>
`;
    let ActionEnhancerMenu = document.createElement("div");
    ActionEnhancerMenu.classList.add("ActionsMenu", "ConvoMainActionsMenu", "vkToolsActionMenu");
    ActionEnhancerMenu.innerHTML = `
  <button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular vkEnUp">
  <i class="ActionsMenuAction__icon">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
<path d="M13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19L11 7.41421L6.70711 11.7071C6.31658 12.0976 5.68342 12.0976 5.29289 11.7071C4.90237 11.3166 4.90237 10.6834 5.29289 10.2929L11.2929 4.29289C11.6834 3.90237 12.3166 3.90237 12.7071 4.29289L18.7071 10.2929C19.0976 10.6834 19.0976 11.3166 18.7071 11.7071C18.3166 12.0976 17.6834 12.0976 17.2929 11.7071L13 7.41421L13 19Z" fill="currentColor"/>
</svg></i>
  <span class="ActionsMenuAction__title">${getBeginChat(vk.lang)}</span>
  </button>
  
  
  <button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular vkToolsDownloadAttachmentsInitBox">
  <i class="ActionsMenuAction__icon">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path d="M10.9375 2.1875C10.9375 1.66973 10.5178 1.25 10 1.25C9.48223 1.25 9.0625 1.66973 9.0625 2.1875V10.5492L6.28791 7.77459C5.9218 7.40847 5.3282 7.40847 4.96209 7.77459C4.59597 8.1407 4.59597 8.7343 4.96209 9.10041L9.33709 13.4754C9.5129 13.6512 9.75136 13.75 10 13.75C10.2486 13.75 10.4871 13.6512 10.6629 13.4754L15.0379 9.10041C15.404 8.7343 15.404 8.1407 15.0379 7.77459C14.6718 7.40847 14.0782 7.40847 13.7121 7.77459L10.9375 10.5492V2.1875Z" fill="currentColor"/>
<path d="M3.4375 15.625C2.91973 15.625 2.5 16.0447 2.5 16.5625C2.5 17.0803 2.91973 17.5 3.4375 17.5H16.5625C17.0803 17.5 17.5 17.0803 17.5 16.5625C17.5 16.0447 17.0803 15.625 16.5625 15.625H3.4375Z" fill="currentColor"/>
  </svg></i>
  <span class="ActionsMenuAction__title">${getDownloadAttachments(vk.lang)}</span>
  </button>
  
  <button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular vkEnAttaches">
  <i class="ActionsMenuAction__icon">
  <svg style = "padding-top: 1px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
 <path style="scale:1.2;" fill="currentColor" fill-rule="evenodd" d="M14.95 3.801a2.72 2.72 0 0 0-3.857 0L5.56 9.35a4.49 4.49 0 0 0 0 6.338 4.46 4.46 0 0 0 6.317 0l.002-.002 2.88-2.86a.75.75 0 0 1 1.057 1.064l-2.877 2.857-.002.002a5.96 5.96 0 0 1-8.439-.001 5.99 5.99 0 0 1 0-8.458l5.534-5.548a4.22 4.22 0 0 1 5.981 0 4.244 4.244 0 0 1 0 5.991l-5.534 5.548a2.486 2.486 0 0 1-3.521 0 2.497 2.497 0 0 1 0-3.525l.002-.002 3.102-3.083a.75.75 0 0 1 1.058 1.064l-3.1 3.08-.001.002a.997.997 0 0 0 0 1.405.986.986 0 0 0 1.398 0l5.534-5.548a2.744 2.744 0 0 0 0-3.873" clip-rule="evenodd"></path></svg></i>
  <span class="ActionsMenuAction__title">${getLang?.("me_convo_action_attach")}</span></button>

    <button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular vkToolsRead">
  <i class="ActionsMenuAction__icon">
 <svg aria-hidden="true" display="block" class="vkuiIcon vkuiIcon--20 vkuiIcon--w-20 vkuiIcon--h-20 vkuiIcon--message_check_outline_20" width="20" height="20" viewBox="0 0 20 20" style="width: 20px; height: 20px; margin-left: 1px;">
 <g fill="currentColor"><path d="M13.78 7.72a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.47-3.47a.75.75 0 0 1 1.06 0"></path><path fill-rule="evenodd" d="M3.242 18.5a1.203 1.203 0 0 1-1.101-1.767c.644-1.216 1.016-2.14 1.121-2.73A7 7 0 0 1 2 10c0-4.17 3.681-7.5 8.25-7.5S18.5 5.83 18.5 10s-3.681 7.5-8.25 7.5a9 9 0 0 1-2.66-.393c-.996.881-2.456 1.336-4.348 1.393m3.586-2.749a.75.75 0 0 1 .821-.206A7.5 7.5 0 0 0 10.25 16c3.772 0 6.75-2.694 6.75-6s-2.978-6-6.75-6S3.5 6.694 3.5 10c0 1.21.4 2.367 1.14 3.349a.75.75 0 0 1 .15.49c-.04.756-.403 1.785-1.085 3.135 1.483-.116 2.514-.534 3.123-1.222" clip-rule="evenodd"></path></g>
 </svg>
  </i>
  <span class="ActionsMenuAction__title">${getReadChat(vk.lang)}</span></button>
  
  <div role="separator" aria-orientation="horizontal" class="ActionsMenuAction__separator vkEnOnlineSeparator"></div>

    <button class="ActionsMenuAction ActionsMenuAction--secondary ActionsMenuAction--size-regular vkEnOnline">
  <i class="ActionsMenuAction__icon">
  <svg width="21" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 9.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75z" fill="currentColor"></path><path d="M11 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.99 3.99A8.48 8.48 0 0 1 10 1.5c2.35 0 4.47.95 6.01 2.49A8.48 8.48 0 0 1 18.5 10a8.48 8.48 0 0 1-2.49 6.01A8.48 8.48 0 0 1 10 18.5a8.48 8.48 0 0 1-6.01-2.49A8.48 8.48 0 0 1 1.5 10c0-2.35.95-4.47 2.49-6.01zM10 3a6.98 6.98 0 0 0-4.95 2.05A6.98 6.98 0 0 0 3 10c0 1.93.78 3.68 2.05 4.95A6.98 6.98 0 0 0 10 17a6.97 6.97 0 0 0 4.95-2.05A6.97 6.97 0 0 0 17 10a6.98 6.98 0 0 0-2.05-4.95A6.98 6.98 0 0 0 10 3z" fill="currentColor"></path></svg>
  </i><span class="ActionsMenuAction__title">${getLang?.("mail_im_mention_online")}</span></button>
  </div>`;
    ActionEnhancerMenu.style.position = "absolute";
    ActionEnhancerMenu.style.top = "40px";
    ActionEnhancerMenu.style.right = "20px";
    ActionEnhancerMenu.style.padding = "4px";
    ActionEnhancerMenu.style.opacity = "0";
    ActionEnhancerMenu.style.pointerEvents = "none";
    ActionEnhancerMenu.style.transition = "opacity 0.3s ease";

    upToButton.addEventListener("mouseover", function () {
      if (ActionEnhancerMenu.style.opacity === "0") {
        ActionEnhancerMenu.style.pointerEvents = "auto";
        ActionEnhancerMenu.style.opacity = "1";
      }
    });

    upToButton.addEventListener("mouseout", function () {
      if (ActionEnhancerMenu.style.opacity === "1") {
        ActionEnhancerMenu.style.pointerEvents = "none";
        ActionEnhancerMenu.style.opacity = "0";
      }
    });

    upToButton.prepend(ActionEnhancerMenu);
    let onlineArr: OnlineUser[] = [];
    try {
      let onlineUsersOf = getPeerProps(e.parentElement!).convo.peerId;
      let onlUsersRes = await vkApi.api("messages.getConversationMembers", {
        peer_id: onlineUsersOf,
        fields: "online_info, photo_50",
        extended: 1,
      });
      let countOnl = 0;
      let ita = 0;
      for (const o of onlUsersRes.profiles) {
        if (o.online_info.is_online) {
          countOnl++;
          onlineArr[ita] = [o.first_name + " " + o.last_name, o.id, o.photo_50];
          ita += 1;
        }
      }
      // let onlUsDiv = document.createElement("div");
      // onlUsDiv.classList.add("vkenhancerUsersOnline");
      if (countOnl > 1 && onlineUsersOf > 2000000000) {
        //   onlUsDiv.textContent = "​ - " + countOnl + ` ` + getLang?.("global_user_is_online");
        //   e.parentElement?.querySelector(".ConvoHeader__status")?.appendChild(onlUsDiv);
        //   let displayElement = e.parentElement?.querySelector(".ConvoHeader__status") as HTMLElement;
        //   displayElement.style.display = "flex";
      } else {
        let displayElement = ActionEnhancerMenu.querySelector(".vkEnOnline") as HTMLElement;
        let displayElSeparator = ActionEnhancerMenu.querySelector(".vkEnOnlineSeparator") as HTMLElement;
        displayElement.style.display = "none";
        displayElSeparator.style.display = "none";
      }
    } catch (error) {}
    ActionEnhancerMenu.querySelector(".vkEnOnline")?.addEventListener("click", async function () {
      let styleElement = fromId("vkenOnline");
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "vkenOnline";
        document.head.appendChild(styleElement);
      }
      styleElement.innerHTML = `
		.arrLen{color:var(--vkui--color_text_secondary); padding-left:6px;}
		::-webkit-scrollbar { background-color: var(--scrollbar_background, var(--vkui--color_background_content)); width: 16px; } ::-webkit-scrollbar-track { background-color: var(--scrollbar_background, var(--vkui--color_background_content)); } ::-webkit-scrollbar-thumb { background-color: var(--scrollbar_thumb, var(--vkui--color_icon_tertiary)); border-radius: 16px; border: 4px solid var(--scrollbar_background, var(--vkui--color_background_content)); } ::-webkit-scrollbar-button { display: none; }
		.vkEnBgWhiteOnline {
		border-radius: 8px;
		border: 1px solid var(--vkui--color_separator_primary);
		background-color: var(--vkui--color_background_modal);
		}
		.vkEnhancerModalPageHeader{
		background-color:var(--vkui--color_background_tertiary)!important; border-radius:8px 8px 0 0!important;
		} .vkEnhancerSeparator
		{ display:none!important; }
		.vkEnhancerModalPage__header
		{ border-bottom:1px solid var(--vkui--color_separator_primary)!important; }
		.vkEnhancerPanelHeader__in
		{ justify-content:flex-start!important; }
		.vkEnhancerPanelHeader__content-in
		{ font-family: var(--palette-vk-font,-apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',Geneva,"Noto Sans Armenian","Noto Sans Bengali","Noto Sans Cherokee","Noto Sans Devanagari","Noto Sans Ethiopic","Noto Sans Georgian","Noto Sans Hebrew","Noto Sans Kannada","Noto Sans Khmer","Noto Sans Lao","Noto Sans Osmanya","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Thai",arial,Tahoma,verdana,sans-serif)!important; padding-left: 12px!important; font-size: 14px!important; color: var(--vkui--color_text_primary)!important; overflow: hidden!important; text-overflow: ellipsis!important; white-space: nowrap!important; font-weight:400!important; }
		.vkEnhancerTappable { background:var(--vkui--color_background_secondary)!important; border-radius:0px!important; --vkui_internal--icon_color:var(--vkui--color_text_link)!important; color:var(--vkui--color_text_link)!important; }
		.vkEnhancerTappable:hover { background: var(--vkui--color_background_secondary_alpha)!important;}
		.vkEnhancerDiv { padding:0!important; }
		div:has(>.vkEnhancerModalPage__in-wrap) { display:flex; justify-content:center; align-items: center; height:100%; inline-size: 100%; block-size: 100%; overflow: hidden; position: absolute; box-sizing: border-box; }
		.vkEnhancerModalPage__in-wrap { font-family:var(--vkui--font_family_base); max-inline-size: var(--vkui--size_popup_medium--regular); position: relative; align-items: initial; margin-block: 32px; margin-inline: 56px; block-size: auto; max-block-size: 640px; opacity: 0; transform: none; transition: opacity 340ms var(--vkui--animation_easing_platform); inline-size: 100%; inset-inline: 0; inset-block-end: 0; display: flex; }
		.vkEnhancerModalPage__in { block-size: auto; box-shadow: var(--vkui--elevation3); border-end-end-radius: var(--vkui--size_border_radius_paper--regular); border-end-start-radius: var(--vkui--size_border_radius_paper--regular); }
		.vkEnhancerModalPage__in { background-color: var(--vkui--color_background_modal); overflow: visible; position: relative; box-sizing: border-box; inline-size: 100%; display: flex; flex-direction: column; border-start-end-radius: var(--vkui--size_border_radius_paper--regular); border-start-start-radius: var(--vkui--size_border_radius_paper--regular); --vkui_internal--background: var(--vkui--color_background_modal); }
		.vkEnhancerModalPage__header { inline-size: 100%; }
		.vkEnhancerModalPageHeader { padding-inline: 8px; --vkui_internal--safe_area_inset_top: 0; }
		.vkEnhancerPanelHeader { position: relative; } .vkEnhancerPanelHeader__in { display:flex; justify-content:center; }
		.vkEnhancerPanelHeader__content { text-align: center; opacity: 1; transition: opacity .3s var(--vkui--animation_easing_platform); }
		.vkEnhancerPanelHeader__content-in { font-size:18px; color: var(--vkui--color_text_primary); font-weight: 500; font-family: var(--vkui--font_family_accent); user-select:none; }
		.vkEnhancerSeparator { color: var(--vkui--color_separator_primary); }
		.vkEnhancerSeparator__in { block-size: var(--vkui--size_border--regular); margin: 0; background: currentColor; color: inherit; border: 0; transform-origin: center top; }
		.vkEnhancerModalPage__content-wrap { position: relative; display: flex; block-size: 100%; flex-direction: column; overflow: hidden; border-end-start-radius: inherit; border-end-end-radius: inherit; }
		.vkEnhancerModalPage__content { overflow-y: auto; -webkit-overflow-scrolling: touch; block-size: 100%; overflow-x: hidden; box-sizing: border-box; }
		.vkEnhancerModalPage__content-in { block-size:100%; }
		.vkEnhancerDiv { padding-block: var(--vkui--size_base_padding_vertical--regular); padding-inline: var(--vkui--size_base_padding_horizontal--regular); }
		.vkEnhancerSpacing { position: relative; box-sizing: border-box; }
		.vkEnhancerTappable { min-height: 22px; --vkui_internal--icon_color: var(--vkui--color_icon_accent); color: var(--vkui--color_text_accent); justify-content: center; text-align: center; box-sizing: border-box; text-decoration: none; margin: 0; border: 0; inline-size: 100%; background: rgba(0,0,0,0); padding-block: 0; min-block-size: 44px; display: flex; align-items: center; white-space: nowrap; padding-inline: var(--vkui--size_base_padding_horizontal--regular); isolation: isolate; position: relative; border-radius: var(--vkui--size_border_radius--regular); cursor: pointer; --vkui_internal--outline_width: 2px; transition: background-color .15s ease-out; } .vkEnhancerSimpleCell__before { padding-block: 4px; flex-grow: initial; max-inline-size: initial; display: flex; align-items: center; padding-inline-end: 12px; color: var(--vkui_internal--icon_color, var(--vkui--color_icon_accent)); position: relative; z-index: var(--vkui_internal--z_index_tappable_element); } .vkEnhancerSimpleCell__middle { flex-grow: initial; max-inline-size: initial; display: flex; flex-direction: column; justify-content: center; padding-block: 10px; min-inline-size: 0; overflow: hidden; position: relative; z-index: var(--vkui_internal--z_index_tappable_element); } .vkEnhancerSimpleCell__content { justify-content: flex-start; display: flex; align-content: flex-start; align-items: center; max-inline-size: 100%; } .vkEnhancerTypography { font-weight: var(--vkui--font_weight_accent3); font-size: var(--vkui--font_headline1--font_size--compact); line-height: var(--vkui--font_headline1--line_height--compact); color: inherit; text-overflow: ellipsis; overflow: hidden; display: block; margin: 0; padding: 0; } .vkEnhancerVisuallyHidden { position: absolute !important; block-size: 1px !important; inline-size: 1px !important; padding: 0 !important; margin: -1px !important; white-space: nowrap !important; clip: rect(0, 0, 0, 0) !important; clip-path: inset(50%); overflow: hidden !important; border: 0 !important; opacity: 0; } .vkEnhancerTappable:hover{ background-color:var(--vkui--color_transparent--hover); } .vkEnhancerGraffitiList { display: grid; gap: 4px; grid-template-columns: repeat(4,1fr); } .vkEnhancerGraffitiList__item { height: 158px; width: 158px; align-items: center; background-color: var(--vkui--color_transparent--hover); border-radius: 10px; cursor: pointer; display: flex; justify-content: center; transition: all .15s ease; vertical-align: bottom; } .vkEnhancerGraffitiList__item:hover { background-color: var(--vkui--color_transparent--active); } .vkEnhancerGraffitiList__item--doc { background-position: 50%; background-repeat: no-repeat; background-size: contain; border-radius: 10px; height: 158px; width: 158px; } .vkEnhancerCloseButton { position: absolute; justify-content: center; inset-block-start: 0; inset-inline-end: -56px; inline-size: 56px; block-size: 56px; padding: 18px; box-sizing: border-box; color: var(--vkui--color_icon_contrast); transition: opacity .15s ease-out; isolation: isolate; border-radius: var(--vkui--size_border_radius--regular); cursor: pointer; --vkui_internal--outline_width: 2px; } .vkEnhancerCloseButton:before { display: block; content: ""; inset: 14px; background: var(--vkui--color_overlay_primary); border-radius: 50%; position: absolute; } .vkEnhancerCloseButton:hover:before { background:var(--vkui--color_overlay_primary--hover); } .vkEnhancerVisuallyHidden { position: absolute !important; block-size: 1px !important; inline-size: 1px !important; padding: 0 !important; margin: -1px !important; white-space: nowrap !important; clip: rect(0, 0, 0, 0) !important; clip-path: inset(50%); overflow: hidden !important; border: 0 !important; opacity: 0; z-index: var(--vkui_internal--z_index_tappable_element); }`;

      await vkToolsOnlineBox(onlineArr);
    });
    let memoizedPeer = getPeerProps(e.parentElement!).peer.id;
    ActionEnhancerMenu.querySelector(".vkToolsDownloadAttachmentsInitBox")?.addEventListener("click", () => {
      initDownloadAttachesBox(memoizedPeer);
    });
    ActionEnhancerMenu.querySelector(".vkEnAttaches")?.addEventListener("click", async function () {
      await stManager.add(["post.css"]);
      window.showWiki({ w: `history${memoizedPeer}_photo` }, null, {});
      if (ActionEnhancerMenu.style.opacity === "1") {
        ActionEnhancerMenu.style.pointerEvents = "none";
        ActionEnhancerMenu.style.opacity = "0";
      }
    });
    let cmid = 1;
    try {
      let reoo = await vkApiWithGroup("messages.getHistory", {
        count: 1,
        peer_id: memoizedPeer,
        rev: 1,
      });
      cmid = reoo.items[0].conversation_message_id;
    } catch (error) {
      cmid = 1;
    }
    ActionEnhancerMenu.querySelector(".vkEnUp")?.addEventListener("click", function () {
      let urlS1 = window.location.href;
      if (urlS1.includes("?")) {
        nav.go(`${urlS1}&cmid=${cmid}`);
      } else {
        nav.go(`${urlS1}?cmid=${cmid}`);
      }
      if (ActionEnhancerMenu.style.opacity === "1") {
        ActionEnhancerMenu.style.pointerEvents = "none";
        ActionEnhancerMenu.style.opacity = "0";
      }
    });

    ActionEnhancerMenu.querySelector(".vkToolsRead")?.addEventListener("click", () => {
      vkApiWithGroup("messages.markAsRead", { peer_id: memoizedPeer, mark_conversation_as_read: 1 });
      if (ActionEnhancerMenu.style.opacity === "1") {
        ActionEnhancerMenu.style.pointerEvents = "none";
        ActionEnhancerMenu.style.opacity = "0";
      }
    });

    try {
      e.prepend(upToButton);
    } catch (error) {}
  });
};

export default convoButtons;
