import albumsTab from "./tabs/albumsTab";
import articlesTab from "./tabs/articlesTab";
import audiosTab from "./tabs/audiosTab";
import contactsTab from "./tabs/contactsTab";
import docsTab from "./tabs/docsTab";
import eventsTab from "./tabs/eventsTab";
import linksTab from "./tabs/linksTab";
import organiserTab from "./tabs/organiserTab";
import videosTab from "./tabs/videosTab";

const narrowBlock = async (tabs: any[], isOwner: boolean, id: number, screen_name: string, contacts: any, evOrganiser: any) => {
  const tabsOrder = ["links", "photos", "videos", "audios", "files", "articles", "events"];
  const curClassicalGroup = window.vkenh.curClassicalGroup;
  if (!tabs) {
    tabs = [];
  }
  let extendedTabs = [...tabs];
  if (curClassicalGroup?.links?.length > 0 || isOwner) {
    // if (isOwner) {
    //   ajax.post(
    //     "al_profile.php",
    //     { act: "links", al: 1, al_id: vk.id, __query: screen_name },
    //     {
    //       onDone: (e: any, p: string, t: string) => {
    //         window.vkenh.curClassicalGroup.linksHash = extractExtendObject(t).hash || "null";
    //       },
    //     }
    //   );
    // }
    const linksTabObj = {
      main_type: "links",
      main_type_count: curClassicalGroup?.links?.length || 0,
      name: "links",
    };
    const hasLinksTab = extendedTabs.some((t) => t.main_type === "links" || t.name === "links");
    if (!hasLinksTab) {
      extendedTabs.push(linksTabObj);
    }
  }

  const mainBlock = document.createElement("div");
  mainBlock.classList.add("page_block", "page_block_vktools", "vkToolsNarrowBlock");
  mainBlock.setAttribute("data-group-id", id.toString());

  const tabPromises = tabsOrder.map(async (type) => {
    const tab = extendedTabs.find((t) => t.main_type === type || t.name === type);
    if (!tab) return null;

    if (!(tab.main_type_count > 0 || isOwner)) return null;

    switch (type) {
      case "links":
        return linksTab(isOwner, screen_name, id);
      case "photos": {
        const getAlbums = await vkApi.api("photos.getAlbums", { owner_id: -id });
        return await albumsTab(getAlbums, isOwner);
      }
      case "videos": {
        const getVideos = await vkApi.api("video.get", { owner_id: -id, count: 2 });
        return await videosTab(getVideos, id, isOwner);
      }
      case "audios": {
        const getAudios = await vkApi.api("audio.get", { owner_id: -id, count: 3 });
        return await audiosTab(getAudios, id, isOwner);
      }
      case "files": {
        const getFiles = await vkApi.api("docs.get", { owner_id: -id, count: 3 });
        return await docsTab(getFiles, id, isOwner);
      }
      case "articles":
        const getArticles = await vkApi.api("groups.getContentForTabs", { group_id: id, tabs: "articles", content: "articles", count: 2 });
        return articlesTab(getArticles.articles, id, screen_name, isOwner);
      case "events":
        if (tab.main_type_count > 0 || isOwner) {
          const getEvents = await vkApi.api("groups.getContentForTabs", { group_id: id, tabs: "events", content: "events", fields: "start_date,finish_date", count: 3 });
          return eventsTab(getEvents.events, isOwner);
        } else return null;
    }
  });

  const tabBlocks = await Promise.all(tabPromises);

  tabBlocks.forEach((block) => {
    if (block) mainBlock.appendChild(block);
  });

  if (evOrganiser && evOrganiser.user_id) {
    const organiserBlock = await organiserTab(evOrganiser.user_id, id, isOwner);
    if (organiserBlock) {
      mainBlock.appendChild(organiserBlock);
    }
  }

  if ((Array.isArray(contacts) && contacts.length > 0) || isOwner) {
    const contactsBlock = await contactsTab(contacts, -id, isOwner);
    if (contactsBlock) {
      mainBlock.appendChild(contactsBlock);
    }
  }

  if (mainBlock.innerHTML === "") {
    return false;
  }

  return mainBlock;
};

export default narrowBlock;
