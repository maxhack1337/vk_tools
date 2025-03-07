import DOMContentLoaded from "../../listeners/DOMContentLoaded";
import listener from "../../oldPosting/listener";
import { DEBUG_MODE } from "./constants";
import waitNav from "./waitNav";

type CallbackFunc = (node: HTMLElement) => void;

const POST_SELECTOR = '.ConvoStack__content .VirtualScrollItem[data-itemkey]:not(.vkToolsOldParsed)'

const interaction = new listener<CallbackFunc>();

const idleCallback = async () => await new Promise<IdleDeadline>((resolve) => requestIdleCallback(resolve));
const reqAnimFrame = async () => await new Promise<DOMHighResTimeStamp>((resolve) => requestAnimationFrame(resolve));

const onCallback = async (el: HTMLElement) => {
  if(DEBUG_MODE) console.log(`[VK Tools] Added element with cmid ${el.getAttribute('data-itemkey')}`);
  for (const callback of interaction.listeners) {
    await idleCallback();
    callback(el);
  }
};


const getMessages = async () => {
  await reqAnimFrame();

  return document.querySelectorAll<HTMLElement>(POST_SELECTOR);
};

const initListener = async (): Promise<void> => {
  const nav = await waitNav();

  nav.onLocationChange(async () => {
    await checkNewMessages();
  });

  await checkNewMessages();
};

const checkNewMessages = async () => {
  const messages = await getMessages();
  const processedMessages = new Set();

  for (const message of messages) {
    if (!processedMessages.has(message) && !message.classList.contains('vkToolsOldParsed')) {
      message.classList.add('vkToolsOldParsed');
      processedMessages.add(message);
      onCallback(message);
    }
  }
};

let inited = false;
const onAddState = (callback: CallbackFunc) => {
  const listener = interaction.addListener(callback);

  DOMContentLoaded(async () => {
    await checkNewMessages();
  });

  if (!inited) {
    inited = true;

    initListener();
  }

  const checkInterval = async () => {
    await checkNewMessages();
    requestAnimationFrame(checkInterval);
  };

  requestAnimationFrame(checkInterval);

  return listener;
};

export default onAddState;
