const refreshFeed = () => {
  if (localStorage.getItem("refreshFeed") === "true") {
    const tabsSelectors = ["#wall_tabs.ui_tabs .ui_tabs_right_section"];
    document.arrive(tabsSelectors.join(", "), { existing: true }, function (e) {
      if (!document.querySelector(".ui_tab_vktools_wallui_tab_vktools_wall")) {
        let updateBtn = document.createElement("div");
        updateBtn.classList.add("ui_tab_search_wrap", "ui_tab_item");
        updateBtn.innerHTML = `
	<a class="ui_tab_plain ui_tab_plain_new ui_tab_vktools_wall ui_tab_search" onclick="cur.wallNextFrom = 0; Wall.showMore(0);"><span class="ui_tab_search_icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="currentColor"><path d="M11.7422 3.21838C10.1412 2.65442 8.40531 2.59833 6.77131 3.05777C5.66909 3.36769 4.64943 3.902 3.7732 4.62084H4.87502C5.49634 4.62084 6.00002 5.12452 6.00002 5.74584C6.00002 6.36716 5.49634 6.87084 4.87502 6.87084L1.70519 6.87085C1.61913 6.87091 1.49731 6.871 1.38711 6.86199C1.25501 6.8512 1.04417 6.82206 0.819035 6.70735C0.536792 6.56354 0.307321 6.33407 0.163511 6.05182C0.0487986 5.82669 0.0196589 5.61585 0.00886567 5.48375C-0.000138422 5.37354 -5.10709e-05 5.25173 1.07093e-05 5.16567L2.03652e-05 2C2.03652e-05 1.37868 0.5037 0.875 1.12502 0.875C1.74634 0.875 2.25002 1.37868 2.25002 2V2.96111C3.38657 2.00587 4.71877 1.29764 6.16229 0.891762C8.24222 0.306941 10.4519 0.378336 12.4897 1.0962C14.5276 1.81406 16.2943 3.1434 17.5489 4.90275C18.8034 6.6621 19.4847 8.76577 19.4998 10.9267C19.5149 13.0876 18.863 15.2006 17.6331 16.9773C16.4033 18.754 14.6553 20.1079 12.6276 20.8541C10.6 21.6004 8.39155 21.7026 6.30367 21.1469C4.6601 20.7095 3.11556 19.8787 1.86301 18.7255C1.40593 18.3047 1.37655 17.5929 1.79739 17.1359C2.21824 16.6788 2.92994 16.6494 3.38703 17.0702C4.36132 17.9673 5.57811 18.6255 6.88238 18.9726C8.52263 19.4092 10.2576 19.3289 11.8505 18.7426C13.4435 18.1563 14.8168 17.0927 15.7831 15.6967C16.7495 14.3007 17.2617 12.6404 17.2498 10.9424C17.238 9.24439 16.7026 7.59142 15.7169 6.20907C14.7312 4.82672 13.3431 3.78234 11.7422 3.21838Z"></path></svg></span></a>
	`;
        updateBtn.style.scale = "0.75";
        updateBtn.style.marginLeft = "16px";
        e.appendChild(updateBtn);
      }
    });
  }
};

export default refreshFeed;
