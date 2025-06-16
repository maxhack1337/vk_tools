import linkAttachmentWithImage from "../attachments/linkAttachmentWithImage";
import linkAttachmentWithoutImage from "../attachments/linkAttachmentWithoutImage";
import linkAttachmentWithoutTitle from "../attachments/linkAttachmentWithoutTitle";
import getPostAttaches from "../getPostAttaches";

const postLinks = () => {
  let selectorsLinks = [
    `.suggest.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="/away"]:not([class*="vkitLink__secondary"])`,
    `.postponed.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="/away"]:not([class*="vkitLink__secondary"])`,
    `.postponed.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="http"]:not([class*="vkitLink__secondary"])`,
    `.suggest.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="http"]:not([class*="vkitLink__secondary"])`,
  ];
  document.arrive(selectorsLinks.join(", "), { existing: true }, async function (docus) {
    let closestCheck = docus.closest(".vkEnhancerPostponedPostLinks");
    if (!closestCheck) {
      let dataAttachments;
      let postAppendClass = docus.closest(".Post--redesignV3");
      postAppendClass?.classList.add("vkEnhancerPostponedPostLinks");
      try {
        dataAttachments = getPostAttaches(docus.closest('[class^="PostContentContainer__contentContainer"]')!);
      } catch (error) {
        console.log(error);
      }

      let allLinks = docus;
      let count = 0;
      dataAttachments.item.attachments.forEach(async function (linkChip: any) {
        if (linkChip.link) {
          let linkCurrent = linkChip.link;
          let secondaryAttachDoc = document.createElement("div");
          secondaryAttachDoc.classList.add("vkuiDiv", "vkuiRootComponent");
          if (count === 0) {
            secondaryAttachDoc.classList.add("vkuiDiv", "vkuiRootComponent", "vkEnhancerSecondaryAttachFirst");
            count += 1;
          }
          if (!linkCurrent.title) {
            secondaryAttachDoc.style.padding = "0px 20px";
            if (!allLinks?.closest(".wk_content_redesign_v3")) {
              secondaryAttachDoc.style.padding = "0px 0px";
            }
            secondaryAttachDoc.append(linkAttachmentWithoutTitle(linkCurrent));
          } else if (linkCurrent.photo) {
            secondaryAttachDoc.style.padding = "0px 20px";
            secondaryAttachDoc.append(linkAttachmentWithImage(linkCurrent));
          } else {
            secondaryAttachDoc.style.padding = "0px 20px";
            if (!allLinks?.closest(".wk_content_redesign_v3")) {
              secondaryAttachDoc.style.padding = "0px 0px";
            }
            secondaryAttachDoc.append(linkAttachmentWithoutImage(linkCurrent));
          }
          allLinks?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachDoc);
          allLinks?.closest('[class^="vkitChipAttachment__root"]')?.remove();
        }
      });
    }
  });
};

export default postLinks;
