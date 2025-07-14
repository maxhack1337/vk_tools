const messagesButton = (id: Number) => {
  let messageButton = document.createElement("button");
  messageButton.classList.add("vkToolsButton");
  messageButton.textContent = getLang?.("global_write_msg").toString() || "Написать сообщение";
  messageButton.addEventListener("click", () => {
    showWriteMessageBox(this, -id);
  });

  return messageButton;
};

export default messagesButton;
