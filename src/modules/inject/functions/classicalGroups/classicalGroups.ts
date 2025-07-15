import classicalNewInterface from "./classicalNewInterface";
import getGroupProps from "./getGroupProps";
import "./classicalGroups.css";
import classicalOldInterface from "./classicalOldInterface";
import getLocalValue from "../../getLocalValue";

const classicalGroups = () => {
  if (getLocalValue("communitiesOldDesign")) {
    document.arrive("[class*='CommunityHeader__cover'][data-testid='communityheader_cover']:not(:has([data-testid='loading-skeleton']))", { existing: true }, async function (e) {
      document.querySelector("html")!.classList.add("classicalGroup");
      let groupDiv = e.closest(".vkui__root");
      let props = await getGroupProps(groupDiv);
      console.log("[VK Tools] Club fetched", props);
      if (props?.cover) {
        let isCoverEnabled = props.cover.enabled;
        window.vkenh.curClassicalGroup = (await vkApi.api("groups.getById", { group_ids: props.id, fields: "is_hidden_from_feed, links" }))?.groups[0] || {};
        switch (isCoverEnabled) {
          case 0:
            classicalOldInterface(props);
            break;
          case 1:
            classicalNewInterface(props);
            break;
          default:
            break;
        }
      }
    });
  }
};

export default classicalGroups;
