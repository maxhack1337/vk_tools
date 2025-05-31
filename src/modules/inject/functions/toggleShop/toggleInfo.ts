import onToggleRemove from "./onToggleRemove";
import onToggleSave from "./onToggleSave";

const toggleInfo = (featureFlag: string, value: any, canEditRemove: boolean) => {
  let toggleInfoHost = document.createElement("div");
  toggleInfoHost.classList.add("toggleShopCell__host");

  let toggleInfoToggle = document.createElement("div");
  toggleInfoToggle.classList.add("toggleShopCell__content");
  toggleInfoToggle.textContent = featureFlag;

  let toggleInfoIconAhter = document.createElement("div");
  toggleInfoIconAhter.classList.add("toggleShopCell__after");
  toggleInfoIconAhter.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.125C6.20304 3.125 3.125 6.20304 3.125 10C3.125 13.797 6.20304 16.875 10 16.875C13.797 16.875 16.875 13.797 16.875 10C16.875 6.20304 13.797 3.125 10 3.125ZM1.25 10C1.25 5.16751 5.16751 1.25 10 1.25C14.8325 1.25 18.75 5.16751 18.75 10C18.75 14.8325 14.8325 18.75 10 18.75C5.16751 18.75 1.25 14.8325 1.25 10Z" fill="currentColor"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5C10.5178 5 10.9375 5.41973 10.9375 5.9375L10.9375 10.3125C10.9375 10.8303 10.5178 11.25 10 11.25C9.48223 11.25 9.0625 10.8303 9.0625 10.3125L9.0625 5.9375C9.0625 5.41973 9.48223 5 10 5Z" fill="currentColor"/>
        <path d="M11.125 13.875C11.125 14.4963 10.6213 15 9.99997 15C9.37865 15 8.87497 14.4963 8.87497 13.875C8.87497 13.2537 9.37865 12.75 9.99997 12.75C10.6213 12.75 11.125 13.2537 11.125 13.875Z" fill="currentColor"/>
    </svg>
    `;

  if (!canEditRemove) {
    toggleInfoHost.append(toggleInfoToggle, toggleInfoIconAhter);
    toggleInfoHost.addEventListener("click", () => {
      showFastBox(
        "Информация о тоггле",
        `
            <b>${featureFlag}</b>
            </br>
            <b>Значение: </b> ${value}
            `
      );
    });
  } else {
    let removeButton = document.createElement("div");
    removeButton.classList.add("toggleShopCell__remove");
    removeButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.81745 6.7868C7.42357 6.80868 7.122 7.14572 7.14389 7.5396L7.50103 13.9682C7.52291 14.3621 7.85996 14.6636 8.25384 14.6417C8.64772 14.6199 8.94928 14.2828 8.9274 13.8889L8.57026 7.46036C8.54838 7.06648 8.21133 6.76491 7.81745 6.7868Z" fill="#E64646"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1824 6.7868C12.5763 6.80868 12.8779 7.14572 12.856 7.5396L12.4988 13.9682C12.4769 14.3621 12.1399 14.6636 11.746 14.6417C11.3521 14.6199 11.0506 14.2828 11.0725 13.8889L11.4296 7.46036C11.4515 7.06648 11.7885 6.76491 12.1824 6.7868Z" fill="#E64646"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.49993 3.57141C2.10544 3.57141 1.78564 3.89121 1.78564 4.2857C1.78564 4.68019 2.10544 4.99998 2.49993 4.99998H3.28285L4.20965 14.159C4.26238 14.6802 4.30608 15.1121 4.36959 15.4635C4.4358 15.8298 4.53207 16.1636 4.71858 16.4734C5.00947 16.9567 5.43688 17.343 5.94697 17.5838C6.27403 17.7382 6.61579 17.8003 6.98689 17.8293C7.34291 17.8571 7.77703 17.8571 8.30092 17.8571H11.6989C12.2228 17.8571 12.657 17.8571 13.013 17.8293C13.3841 17.8003 13.7258 17.7382 14.0529 17.5838C14.563 17.343 14.9904 16.9567 15.2813 16.4734C15.4678 16.1636 15.5641 15.8298 15.6303 15.4635C15.6938 15.1121 15.7375 14.6802 15.7902 14.159L16.717 4.99998H17.4999C17.8944 4.99998 18.2142 4.68019 18.2142 4.2857C18.2142 3.89121 17.8944 3.57141 17.4999 3.57141H13.1346C12.8098 2.13999 11.5296 1.07141 9.99993 1.07141C8.47022 1.07141 7.1901 2.13999 6.86529 3.57141H2.49993ZM5.62817 13.9875C5.68441 14.5433 5.72298 14.9194 5.77539 15.2094C5.82623 15.4907 5.88136 15.6351 5.94253 15.7367C6.08798 15.9783 6.30168 16.1715 6.55673 16.2919C6.66401 16.3425 6.81317 16.3828 7.09815 16.4051C7.39194 16.428 7.77001 16.4286 8.32866 16.4286H11.6712C12.2298 16.4286 12.6079 16.428 12.9017 16.4051C13.1867 16.3828 13.3359 16.3425 13.4431 16.2919C13.6982 16.1715 13.9119 15.9783 14.0573 15.7367C14.1185 15.6351 14.1736 15.4907 14.2245 15.2094C14.2769 14.9194 14.3154 14.5433 14.3717 13.9875L15.2811 4.99998H4.71871L5.62817 13.9875ZM9.99993 2.49998C9.26767 2.49998 8.63836 2.94073 8.3628 3.57141H11.6371C11.3615 2.94073 10.7322 2.49998 9.99993 2.49998Z" fill="#E64646"/>
      </svg>
    `;
    removeButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const box = new showFastBox(
        "Внимание!",
        `
            Вы действительно хотите удалить тоггл <b>${featureFlag}</b>?
      `,
        `Да`,
        () => {
          onToggleRemove(featureFlag);
          box.hide();
        },
        `Нет`
      );
    });
    toggleInfoHost.append(toggleInfoToggle, removeButton);
    toggleInfoHost.addEventListener("click", () => {
      const box = new showFastBox(
        "Редактирование тоггла",
        `
            <b>Тоггл: </b><input class="toggleShopInputKey" value="${featureFlag}"/>
            </br>
            <b>Значение: </b> <input class="toggleShopInputVal" value="${value}">
      `,
        `Сохранить`,
        () => {
          onToggleSave();
          box.hide();
        },
        `Отмена`
      );
    });
  }

  return toggleInfoHost;
};

export default toggleInfo;
