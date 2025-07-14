import buttonsLang from "./buttonsLang";

const subscribeButton = (id: Number, isClosed: boolean, memberStatus: Number) => {
  let onSubscribeButton = document.createElement("button");
  onSubscribeButton.classList.add("vkToolsButton");
  let defaultListener = true;
  if (!isClosed) onSubscribeButton.textContent = buttonsLang(vk.lang)[0];
  else {
    if (memberStatus !== 4) {
      onSubscribeButton.textContent = buttonsLang(vk.lang)[1];
      defaultListener = false;
      onSubscribeButton.addEventListener("click", async () => {
        onSubscribeButton.innerHTML = '<span class="progress" style="display: block"></span>';
        try {
          await vkApi.api("groups.join", { group_id: id });
          const unsubBtn = subscribeButton(id, isClosed, 4);
          onSubscribeButton.replaceWith(unsubBtn);
        } catch (error) {
          console.error("[VK Tools Error] Ошибка при подаче заявки в сообщество:", error);
          onSubscribeButton.textContent = buttonsLang(vk.lang)[1];
        }
      });
    } else {
      defaultListener = false;
      onSubscribeButton.textContent = buttonsLang(vk.lang)[2];
      onSubscribeButton.addEventListener("click", async () => {
        onSubscribeButton.innerHTML = '<span class="progress" style="display: block"></span>';
        try {
          await vkApi.api("groups.leave", { group_id: id });
          const unsubBtn = subscribeButton(id, isClosed, 0);
          onSubscribeButton.replaceWith(unsubBtn);
        } catch (error) {
          console.error("[VK Tools Error] Ошибка при отмене заявки в сообщество:", error);
          onSubscribeButton.textContent = buttonsLang(vk.lang)[2];
        }
      });
    }
  }
  if (defaultListener) {
    onSubscribeButton.addEventListener("click", async () => {
      onSubscribeButton.innerHTML = '<span class="progress" style="display: block"></span>';
      try {
        await vkApi.api("groups.join", { group_id: id });
        const unsubBtn = await unSubButton(id, isClosed, memberStatus);
        onSubscribeButton.replaceWith(unsubBtn);
      } catch (error) {
        console.error("[VK Tools Error] Ошибка при подписке:", error);
        onSubscribeButton.textContent = buttonsLang(vk.lang)[0];
      }
    });
  }

  return onSubscribeButton;
};

const unSubButton = async (id: Number, isClosed: boolean, memberStatus: Number) => {
  const isHide = window.vkenh.curClassicalGroup;
  const needHide = isHide.is_hidden_from_feed || 0;
  let unSubscribeButton = document.createElement("button");
  unSubscribeButton.classList.add("vkToolsButtonSecondary");
  unSubscribeButton.style.position = "relative";
  unSubscribeButton.style.display = "inline-flex";
  unSubscribeButton.style.alignItems = "center";

  const buttonText = document.createElement("span");
  buttonText.textContent = buttonsLang(vk.lang)[3];
  unSubscribeButton.appendChild(buttonText);

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("display", "block");
  svg.classList.add("vkuiIcon", "vkuiIcon--12", "vkuiIcon--w-12", "vkuiIcon--h-8", "vkuiIcon--dropdown_12");
  svg.setAttribute("width", "12");
  svg.setAttribute("height", "8");
  svg.setAttribute("viewBox", "0 0 12 8");
  svg.setAttribute("fill", "none");
  svg.style.width = "12px";
  svg.style.height = "8px";
  svg.style.marginLeft = "6px";

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("fill", "currentColor");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute("clip-rule", "evenodd");
  path.setAttribute("d", "M2.156 2.295a.75.75 0 0 1 1.051-.137L6 4.306l2.793-2.148a.75.75 0 1 1 .914 1.189l-3.25 2.5a.75.75 0 0 1-.914 0l-3.25-2.5a.75.75 0 0 1-.137-1.052");
  svg.appendChild(path);

  unSubscribeButton.appendChild(svg);

  const dropdown = document.createElement("div");
  dropdown.classList.add("vkToolsDropdown");

  const unsubscribeOption = document.createElement("div");
  unsubscribeOption.textContent = buttonsLang(vk.lang)[4];
  unsubscribeOption.classList.add("vkToolsDropdownOption");
  unsubscribeOption.addEventListener("click", async () => {
    unsubscribeOption.innerHTML = '<span class="progress" style="display: block"></span>';
    try {
      await vkApi.api("groups.leave", { group_id: id });
      const subBtn = subscribeButton(id, isClosed, memberStatus);
      unSubscribeButton.replaceWith(subBtn);
      removeDropdown();
    } catch (error) {
      console.error("[VK Tools Error] Ошибка при отписке:", error);
      unsubscribeOption.innerHTML = buttonsLang(vk.lang)[4];
    }
  });

  const toggleNewsOption = document.createElement("div");
  toggleNewsOption.classList.add("vkToolsDropdownOption");

  function updateToggleNewsOption(needHide: Number) {
    if (needHide === 0) {
      toggleNewsOption.textContent = buttonsLang(vk.lang)[5];
      toggleNewsOption.onclick = async () => {
        toggleNewsOption.innerHTML = '<span class="progress" style="display: block"></span>';
        try {
          await vkApi.api("newsfeed.addBan", { group_ids: id });
          needHide = 1;
          updateToggleNewsOption(needHide);
        } catch (error) {
          console.error("[VK Tools Error] Ошибка при скрытии новостей:", error);
        } finally {
          toggleNewsOption.innerHTML = buttonsLang(vk.lang)[6];
        }
      };
    } else {
      toggleNewsOption.textContent = buttonsLang(vk.lang)[5];
      toggleNewsOption.onclick = async () => {
        toggleNewsOption.innerHTML = '<span class="progress" style="display: block"></span>';
        try {
          await vkApi.api("newsfeed.deleteBan", { group_ids: id });
          needHide = 0;
          updateToggleNewsOption(needHide);
        } catch (error) {
          console.error("[VK Tools Error] Ошибка при показе новостей:", error);
        } finally {
          toggleNewsOption.innerHTML = buttonsLang(vk.lang)[6];
        }
      };
    }
  }

  updateToggleNewsOption(needHide);

  dropdown.appendChild(unsubscribeOption);
  dropdown.appendChild(toggleNewsOption);

  document.body.appendChild(dropdown);

  function positionDropdown() {
    const rect = unSubscribeButton.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.left = `${rect.left + window.scrollX}px`;
  }

  function showDropdown() {
    positionDropdown();
    dropdown.classList.add("show");
  }

  function hideDropdown() {
    dropdown.classList.remove("show");
  }

  function removeDropdown() {
    if (dropdown.parentNode) {
      dropdown.parentNode.removeChild(dropdown);
    }
  }

  unSubscribeButton.addEventListener("mouseenter", showDropdown);
  unSubscribeButton.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!dropdown.matches(":hover") && !unSubscribeButton.matches(":hover")) {
        hideDropdown();
      }
    }, 200);
  });

  dropdown.addEventListener("mouseleave", hideDropdown);

  return unSubscribeButton;
};

export { subscribeButton, unSubButton };
