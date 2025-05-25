import fromId from "../../../content/fromId";
import deferredCallback from "../../defferedCallback";
import getLocalValue from "../../getLocalValue";
import getUserMiddleNameSpa from "../classicalProfile/scripts/spa/getUserMiddleNameSpa";
import getId from "./getId";
import getMiddleLang from "./getMiddleLang";

const middleName = () => {
  if (getLocalValue("isMiddleName")) {
    document.arrive("#pedit_general", { existing: true }, async function (e) {
      let pedit_middle = document.createElement("div");
      pedit_middle.classList.add("pedit_row");
      pedit_middle.classList.add("clear_fix");
      pedit_middle.style.paddingTop = "20px";
      pedit_middle.innerHTML = `
        <div class="pedit_label">${getMiddleLang(vk.lang)}</div>
        <div class="pedit_labeled"><input type="text" class="dark" id="pedit_middle_name"></div>
`;
      let sep = document.createElement("div");
      sep.classList.add("pedit_separator");
      deferredCallback(
        async (_vk: any) => {
          let curmid = await vkApi.api("users.get", {
            fields: "nickname",
            id: vk.id,
          });
          if (pedit_middle) {
            let valueMiddle = pedit_middle.querySelector("#pedit_middle_name") as HTMLInputElement;
            if (valueMiddle) valueMiddle.value = curmid[0].nickname;
          }
        },
        { variable: "vkApi" }
      );
      deferredCallback(
        async (_nav: any) => {
          if (!_nav?.objLoc?.act) {
            e.prepend(sep);
            e.prepend(pedit_middle);
          }
        },
        { variable: "nav" }
      );
    });

    document.arrive("#owner_page_name", { existing: true }, async function (e) {
      let styleElement = fromId("vken_expand_username");
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "vken_expand_username";
        styleElement.innerHTML = `.OwnerPageName{width:300px!important;max-width:300px!important;}`;
        document.head.appendChild(styleElement);
      }
      styleElement.id = "vken_expand_username";
      let objectId = await getId();
      let userDataMiddle = await getUserMiddleNameSpa(objectId);
      if (typeof userDataMiddle === "string" && userDataMiddle && userDataMiddle !== "") {
        let ownerNameElement = document.querySelector(".OwnerPageName");
        let ownerName = ownerNameElement?.firstChild?.textContent?.trim();
        let nickname = userDataMiddle.trim();

        if (ownerName?.includes(" ")) {
          let lastNameIndex = ownerName.lastIndexOf(" ");
          let firstName = ownerName.substring(0, lastNameIndex);
          let lastName = ownerName.substring(lastNameIndex + 1);
          if (ownerNameElement) {
            let child = ownerNameElement.firstChild;
            if (child) {
              child.textContent = `${firstName} ${nickname} ${lastName}`;
            }
          }
        } else {
          let antiIcons = document.querySelector(".OwnerPageName__noWrapText");
          if (antiIcons) {
            let antiIconsText = antiIcons?.textContent?.trim();
            let lastNameIndex = antiIconsText?.lastIndexOf(" ");
            let firstName = antiIconsText?.substring(0, lastNameIndex);
            let lastName = antiIconsText?.substring(lastNameIndex || 0 + 1);
            if (antiIcons?.textContent?.trim().includes(" ")) {
              antiIcons.textContent = "";
              if (ownerNameElement) {
                let child = ownerNameElement.firstChild;
                if (child) {
                  child.textContent = `${firstName} ${nickname} ${lastName}`;
                }
              }
            } else {
              if (ownerNameElement) {
                let child = ownerNameElement.firstChild;
                if (child) {
                  child.textContent += ` ${nickname} ​`;
                }
              }
            }
          } else {
            if (ownerNameElement) {
              let child = ownerNameElement.firstChild;
              if (child) {
                child.textContent += ` ${nickname} ​`;
              }
            }
          }
        }
      }
    });
  }
};

export default middleName;
