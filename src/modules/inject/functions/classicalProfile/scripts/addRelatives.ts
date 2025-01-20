import getTypeName from "./getTypeName";
import getUserDataWithoutOnline from "./getUserDataWithoutOnline";

      const addRelatives = async (userData: { relatives: any; }, moreItemsLoaded: { appendChild: (arg0: HTMLDivElement) => void; }) => {
        let relatives = userData.relatives;
        if (relatives) {
          let relativesByType: { [key: string]: any[] } = {};

          relatives.forEach((relative: { type: string | number; }) => {
            if (relative.type) {
              if (!relativesByType[relative.type]) {
                relativesByType[relative.type] = [];
              }
              relativesByType[relative.type].push(relative);
            }
          });

          Object.keys(relativesByType).forEach(async (type) => {
            let relativesOfType = relativesByType[type];
            let relativesDiv = document.createElement("div");
            relativesDiv.classList.add("label", "fl_l");
            relativesDiv.textContent = `${getTypeName(type)} `;
            let relativesList = document.createElement("div");
            relativesList.classList.add("labeled");
            let isFirst = true;
            relativesOfType.forEach(async (relative) => {
              let relativeLink;
              if (relative.name) {
                let id = relative.id.toString();
                if (id.startsWith("-")) {
                  id = id.substring(1);
                  relativeLink = document.createTextNode(relative.name);
                } else {
                  relativeLink = document.createElement("a");
                  relativeLink.href = `/id${id}`;
                  relativeLink.textContent = relative.name;
                  relativeLink.classList.add(
                    "vkuiLink",
                    "Link-module__link--V7bkY",
                    "ProfileModalInfoLink",
                    "vkuiTappable",
                    "vkuiInternalTappable",
                    "vkuiTappable--hasActive",
                    "vkui-focus-visible"
                  );
                }
              } else if (relative.id) {
                let relativeData = await getUserDataWithoutOnline(relative.id);
                if (relativeData) {
                  let name = `${relativeData.first_name} ${relativeData.last_name}`;
                  let id = relative.id.toString();
                  if (id.startsWith("-")) {
                    id = id.substring(1);
                    relativeLink = document.createTextNode(name);
                  } else {
                    relativeLink = document.createElement("a");
                    relativeLink.href = `/id${id}`;
                    relativeLink.textContent = name;
                    relativeLink.classList.add(
                      "vkuiLink",
                      "Link-module__link--V7bkY",
                      "ProfileModalInfoLink",
                      "vkuiTappable",
                      "vkuiInternalTappable",
                      "vkuiTappable--hasActive",
                      "vkui-focus-visible"
                    );
                    relativeLink.setAttribute("mention_id", `id${id}`);
                    relativeLink.setAttribute(
                      "onmouseover",
                      "mentionOver(this)"
                    );
                  }
                }
              }
              if (relativeLink) {
                if (!isFirst) {
                  relativesList.appendChild(document.createTextNode(", "));
                } else {
                  isFirst = false;
                }
                relativesList.appendChild(relativeLink);
              }
            });
            let relativesRow = document.createElement("div");
            relativesRow.classList.add("clear_fix", "profile_info_row");
            relativesRow.appendChild(relativesDiv);
            relativesRow.appendChild(relativesList);
            moreItemsLoaded.appendChild(relativesRow);
          });
        }
}
      
export default addRelatives;