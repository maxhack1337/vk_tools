import showSnackbar from "../../components/snackbar/snackbar";
import tooltip from "../../components/tooltip/tooltip";
import createStyle from "../../createStyle";
import getLocalValue from "../../getLocalValue";
import getId from "../middleName/getId";
import getCopyIdText from "./getCopyIdText";
import getCopyMessage from "./getCopyMessage";

const renderId = () => {
  if (getLocalValue("enterProfileGroupID")) {
    const style = `
            #profile_redesigned .vkToolsIdBlock:first-child {
                margin-top: 0px!important;
            }
        `;

    createStyle("vkTIDBlock", style);

    const appendSelectorsForId = ["#profile_redesigned", ".group-redesigned-narrow#narrow_column"];
    document.arrive(
      appendSelectorsForId.join(","),
      {
        existing: true,
      },
      async (e) => {
        stManager.add("page.css", "module.css");
        if (e.id === "profile_redesigned") {
          if (e.querySelector(".ScrollStickyWrapper > div")) {
            e = e.querySelector(".ScrollStickyWrapper > div") as HTMLElement;
          } else {
            let scrollSticky2 = document.createElement("div");
            scrollSticky2.classList.add("ScrollStickyWrapper");
            scrollSticky2.style.width = "345px";

            let stickyInnerDiv = document.createElement("div");
            stickyInnerDiv.style.width = "345px";

            scrollSticky2.append(stickyInnerDiv);

            let spIn = document.querySelector(".vkuiSplitLayout__inner:has(>.Profile__column)");
            if (spIn) {
              e = stickyInnerDiv;
              spIn.append(scrollSticky2);
            }
          }
        }
        if (!e.querySelector(".vkToolsIdBlock")) {
          let id: string | number;
          try {
            id = await getId();
          } catch (error) {
            const url = window.location.href;
            let parts = url.split("/");
            let gsn = parts[parts.length - 1];
            if (gsn.includes("?")) {
              gsn = gsn.split("?")[0];
            }
            let gid;
            try {
              gid = await vkApi.api("groups.getById", {
                group_ids: gsn,
              });
            } catch (error) {}
            id = -gid?.groups[0]?.id || "null";
          }

          if (id && id !== "null") {
            let pageBlock = document.createElement("div");
            pageBlock.classList.add("page_block", "vkToolsIdBlock");
            pageBlock.style.padding = "8px";

            let pageActionCell = document.createElement("div");
            pageActionCell.classList.add("PageActionCell", "PageActionCell--md-primary", "PageActionCell--non-clickable");
            pageActionCell.style.cssText = `
                padding: 12px;
                border-radius: 8px;
                box-sizing: border-box;
                min-height: 40px;
                margin: 0;
            `;

            let pageActionCellIcon = document.createElement("div");
            pageActionCellIcon.classList.add("PageActionCell__icon");
            pageActionCellIcon.setAttribute("aria-hidden", "true");
            pageActionCellIcon.style.display = "flex";
            pageActionCellIcon.style.justifyContent = "center";
            pageActionCellIcon.style.alignItems = "center";
            pageActionCellIcon.style.color = "var(--vkui--color_icon_accent)";

            let svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgIcon.setAttribute("width", "25");
            svgIcon.setAttribute("height", "24");
            svgIcon.setAttribute("viewBox", "0 0 25 24");
            svgIcon.setAttribute("fill", "none");

            let rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect1.setAttribute("x", "7.29276");
            rect1.setAttribute("y", "3.5");
            rect1.setAttribute("width", "1.90132");
            rect1.setAttribute("height", "17");
            rect1.setAttribute("rx", "0.950658");
            rect1.setAttribute("fill", "currentColor");

            let rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect2.setAttribute("x", "20.5461");
            rect2.setAttribute("y", "14.7969");
            rect2.setAttribute("width", "1.90132");
            rect2.setAttribute("height", "17");
            rect2.setAttribute("rx", "0.950658");
            rect2.setAttribute("transform", "rotate(90 20.5461 14.7969)");
            rect2.setAttribute("fill", "currentColor");

            let rect3 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect3.setAttribute("x", "20.5461");
            rect3.setAttribute("y", "7.30078");
            rect3.setAttribute("width", "1.90132");
            rect3.setAttribute("height", "17");
            rect3.setAttribute("rx", "0.950658");
            rect3.setAttribute("transform", "rotate(90 20.5461 7.30078)");
            rect3.setAttribute("fill", "currentColor");

            let rect4 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect4.setAttribute("x", "16.7434");
            rect4.setAttribute("y", "20.5");
            rect4.setAttribute("width", "1.90132");
            rect4.setAttribute("height", "17");
            rect4.setAttribute("rx", "0.950658");
            rect4.setAttribute("transform", "rotate(-180 16.7434 20.5)");
            rect4.setAttribute("fill", "currentColor");

            svgIcon.append(rect1, rect2, rect3, rect4);

            pageActionCellIcon.append(svgIcon);

            let pageActionCellIn = document.createElement("span");
            pageActionCellIn.classList.add("PageActionCell__in");

            let pageActionCellLabel = document.createElement("span");
            pageActionCellLabel.classList.add("PageActionCell__label");
            pageActionCellLabel.textContent = `ID: ${id}`;
            pageActionCellLabel.style.fontSize = "14px";
            pageActionCellLabel.style.lineHeight = "20px";

            pageActionCellIn.append(pageActionCellLabel);

            let copyActionCell = document.createElement("a");
            copyActionCell.classList.add("PageActionCell");
            copyActionCell.style.position = "absolute";
            copyActionCell.style.right = "28px";
            copyActionCell.style.padding = "8px";
            copyActionCell.style.width = "18px";
            copyActionCell.style.height = "18px";
            copyActionCell.style.borderRadius = "8px";
            const copyIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 18C2.89451 17.9946 2 17.0968 2 15.99V5.5175C2 3.57484 3.57484 2 5.5175 2H15.99C17.0968 2 17.9946 2.89451 18 4H6.76375C5.23737 4 4 5.23737 4 6.76375V18ZM8.01 6H19.99C21.1001 6 22 6.89991 22 8.01V19.99C22 21.1001 21.1001 22 19.99 22H8.01C6.89991 22 6 21.1001 6 19.99V8.01C6 6.89991 6.89991 6 8.01 6ZM9 8C8.44772 8 8 8.44772 8 9V19C8 19.5523 8.44772 20 9 20H19C19.5523 20 20 19.5523 20 19V9C20 8.44772 19.5523 8 19 8H9Z" fill="currentColor"></path></svg>`;
            const checkIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.2071 6.29289C20.5976 6.68342 20.5976 7.31658 20.2071 7.70711L9.70711 18.2071C9.31658 18.5976 8.68342 18.5976 8.29289 18.2071L4.29289 14.2071C3.90237 13.8166 3.90237 13.1834 4.29289 12.7929C4.68342 12.4024 5.31658 12.4024 5.70711 12.7929L9 16.0858L18.7929 6.29289C19.1834 5.90237 19.8166 5.90237 20.2071 6.29289Z" fill="currentColor"/></svg>`;

            copyActionCell.innerHTML = copyIcon;

            copyActionCell.addEventListener("mouseenter", (e: MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              const tooltipText = getCopyIdText(vk.lang);
              const tooltipElement = tooltip({
                style: "black",
                elem: copyActionCell,
                text: tooltipText,
              });
              document.body.appendChild(tooltipElement);
              tooltipElement.style.transform = "scale(0)";
              tooltipElement.style.opacity = "0";
              tooltipElement.style.visibility = "visible";
              setTimeout(() => {
                tooltipElement.style.transform = "scale(1)";
                tooltipElement.style.opacity = "1";
              }, 10);
            });

            copyActionCell.addEventListener("mouseleave", (e: MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              const tooltipElement = document.querySelector(".vkToolsTooltipBase") as HTMLElement;
              if (tooltipElement) {
                tooltipElement.style.transform = "scale(0)";
                tooltipElement.style.opacity = "0";
                setTimeout(() => {
                  if (document.querySelector(".vkToolsTooltipBase")) {
                    document.querySelectorAll(".vkToolsTooltipBase").forEach((el) => el.remove());
                  }
                }, 100);
              }
            });

            copyActionCell.addEventListener("click", async () => {
              try {
                const tooltipElement = document.querySelector(".vkToolsTooltipBase") as HTMLElement;
                if (tooltipElement) {
                  tooltipElement.style.transform = "scale(0)";
                  tooltipElement.style.opacity = "0";
                  setTimeout(() => {
                    if (document.querySelector(".vkToolsTooltipBase")) {
                      document.querySelectorAll(".vkToolsTooltipBase").forEach((el) => el.remove());
                    }
                  }, 100);
                }
                await navigator.clipboard.writeText(id.toString());
                copyActionCell.innerHTML = checkIcon;
                showSnackbar({
                  text: getCopyMessage(vk.lang),
                  timeout: 4000,
                  icon: "ok",
                });
                setTimeout(() => {
                  copyActionCell.innerHTML = copyIcon;
                }, 4000);
              } catch (error) {}
            });

            pageActionCell.append(pageActionCellIcon, pageActionCellIn, copyActionCell);
            pageBlock.append(pageActionCell);

            if (document.querySelector("#profile_redesigned")) {
              let sepaSibling = document.createElement("div");
              sepaSibling.classList.add("vkToolsSeparatorSibling");
              sepaSibling.style.paddingBottom = "calc(var(--vkui--spacing_size_2xl) / 2)";
              sepaSibling.style.paddingTop = "calc(var(--vkui--spacing_size_2xl) / 2)";
              e.prepend(sepaSibling);
            }
            e.prepend(pageBlock);
          }
        }
      }
    );

    document.arrive(".groups_blocked_about", { existing: true }, async (e) => {
      let id: number | string;
      const url = window.location.href;
      let parts = url.split("/");
      let gsn = parts[parts.length - 1];
      if (gsn.includes("?")) {
        gsn = gsn.split("?")[0];
      }
      let gid;
      try {
        gid = await vkApi.api("groups.getById", {
          group_ids: gsn,
        });
      } catch (error) {}
      id = -gid?.groups[0]?.id || "null";

      let blockedEl = document.createElement("div");
      blockedEl.classList.add("groups_blocked_text");
      blockedEl.textContent = `ID: ${id}`;
      e.append(blockedEl);
    });
  }
};

export default renderId;
