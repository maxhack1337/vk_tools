import createStyle from "../../createStyle";
import waitVK from "../listeners/waitVK";
import onToggleSave from "./onToggleSave";
import toggleInfo from "./toggleInfo";
import toggleShopStyle from "./toggleShopStyle";

const toggleShop = () => {
  document.arrive("[class*='CommunityHeader__cover'][data-testid='communityheader_cover']", { existing: true }, () => {
    let loc = window.location.href;
    if (loc.endsWith("vk.com/club230675154") || loc.endsWith("vk.com/toggle_shop")) {
      document.querySelector("#spa_root > .vkui__root")?.remove();
      createStyle("toggleShop", toggleShopStyle());
      let spa_root = document.querySelector("#spa_root");
      let body = document.createElement("div");
      body.classList.add("page_block", "toggleShop");

      let mainHead = document.createElement("div");
      mainHead.classList.add("toggleShopHeader");

      let head = document.createElement("div");
      head.classList.add("toggleShopHead");
      head.textContent = "VK Tools ToggleShop";

      let button = document.createElement("a");
      button.classList.add("toggleShopAddRuleButton");
      button.textContent = "Добавить/изменить тоггл";
      button.addEventListener("click", () => {
        const box = new showFastBox(
          "Добавление тоггла",
          `
            <b>Тоггл: </b><input class="toggleShopInputKey" value=""/>
            </br>
            <b>Значение: </b> <input class="toggleShopInputVal" value="">
      `,
          `Добавить`,
          () => {
            onToggleSave();
            box.hide();
          },
          `Отмена`
        );
      });

      mainHead.append(head, button);

      let alertHead = document.createElement("div");
      alertHead.classList.add("toggleShopAlert");
      alertHead.innerHTML = `
            <img class="toggleShopAlertButton" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojZmY3OTAwO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojZmZiNTAwO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeGxpbms6aHJlZj0iI2EiIGlkPSJkIiB4MT0iMjMuODY1IiB4Mj0iMjMuOTkxIiB5MT0iMTA0OS4zMzIiIHkyPSIxMDA3LjkxNSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCguOTY1OCAwIDAgLjkwMDYxIC44MzggMTAxLjg3NikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIi8+PGxpbmVhckdyYWRpZW50IHhsaW5rOmhyZWY9IiNhIiBpZD0iYiIgeDE9IjIzLjg2NSIgeDI9IjIzLjk5MSIgeTE9IjEwNDkuMzMyIiB5Mj0iMTAwNy45MTUiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMS43OTMpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIvPjxsaW5lYXJHcmFkaWVudCB4bGluazpocmVmPSIjYSIgaWQ9ImMiIHgxPSIyMy44NjUiIHgyPSIyMy45OTEiIHkxPSIxMDQ5LjMzMiIgeTI9IjEwMDcuOTE1IiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKC0uNzc0IC0yLjIzNSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIi8+PC9kZWZzPjxwYXRoIGQ9Im0yLjMxNyAxMDQ1LjE0MyAxOS43MjctMzUuNDExYzEtMS43OTMgMi44OTYtMS44NiAzLjk0NiAwbDE5LjcyNyAzNC45NTFjLjc1NSAxLjMzOC0uMDMyIDMuNjgtMS45NzMgMy42OEg0LjI5Yy0xLjczNSAwLTIuODc2LTEuNTk4LTEuOTczLTMuMjJ6IiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6dXJsKCNkKTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS45NTgzNTEwMjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIC0xMDA0LjM2MikiLz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjAyMTI3IDAgMCAxIC0uNTEgLTEwMDQuMzIyKSI+PHBhdGggZD0iTTIzLjk5NCAxMDE4LjI2NGguMDEyYzEuMDgyIDAgMS45NTIuODcgMS45NTIgMS45NTJ2MTMuNzJjMCAxLjA4My0uODcgMS45NTMtMS45NTIgMS45NTNoLS4wMTJhMS45NDggMS45NDggMCAwIDEtMS45NTItMS45NTJ2LTEzLjcyYzAtMS4wODIuODctMS45NTMgMS45NTItMS45NTN6IiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2ZmZjtmaWxsLW9wYWNpdHk6MSIvPjxyZWN0IHdpZHRoPSIzLjkxNyIgaGVpZ2h0PSIzLjkxNyIgeD0iMjIuMDQyIiB5PSIxMDM5LjgwNiIgcng9IjE3LjIzMyIgcnk9IjE1LjkwNyIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNmZmY7ZmlsbC1vcGFjaXR5OjEiLz48L2c+PC9zdmc+">
            <div class="toggleShopAlert__text"><b>Внимание! </b>Использование этого функционала может сломать работу сайта vk.com</div>
        `;

      const toggles = localStorage.getItem("vkToolsCustomToggles");

      body.append(mainHead, alertHead);

      if (toggles && Object.entries(JSON.parse(toggles)).length > 0) {
        let toggleShopCustomTogglesHead = document.createElement("div");
        toggleShopCustomTogglesHead.classList.add("toggleShopSubhead");
        toggleShopCustomTogglesHead.textContent = "Кастомные тогглы";

        let toggleShopTogglesBlockCustom = document.createElement("div");
        toggleShopTogglesBlockCustom.classList.add("toggleShopToggles__host");

        let togglesObj = JSON.parse(toggles);

        Object.entries(togglesObj).forEach(([key, value]) => {
          toggleShopTogglesBlockCustom.append(toggleInfo(key, value, true));
        });

        body.append(toggleShopCustomTogglesHead, toggleShopTogglesBlockCustom);
      }

      let toggleShopDefaultTogglesHead = document.createElement("div");
      toggleShopDefaultTogglesHead.classList.add("toggleShopSubhead");
      toggleShopDefaultTogglesHead.textContent = "Активные тогглы";

      let toggleShopTogglesBlock = document.createElement("div");
      toggleShopTogglesBlock.classList.add("toggleShopToggles__host");
      body.append(toggleShopDefaultTogglesHead, toggleShopTogglesBlock);
      waitVK().then(() => {
        Object.entries(vk.pe).forEach(([key, value]) => {
          toggleShopTogglesBlock.append(toggleInfo(key, value, false));
        });
      });

      spa_root?.append(body);
    }
  });
};

export default toggleShop;
