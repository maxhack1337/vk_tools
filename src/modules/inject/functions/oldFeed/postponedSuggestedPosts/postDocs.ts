import documentAttachment from "../attachments/documentAttachment";
import getPostAttaches from "../getPostAttaches";

const postDocs = () => {
  let selectorsDocs = [`.postponed.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="https://vk.com/doc"]`, `.suggest.Post--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="https://vk.com/doc"]`];
  document.arrive(selectorsDocs.join(", "), { existing: true }, async function (docus) {
    let closestCheck = docus.closest(".vkEnhancerPostponedPostDocs");
    if (!closestCheck) {
      let dataAttachments;
      let postAppendClass = docus.closest(".Post--redesignV3");
      postAppendClass?.classList.add("vkEnhancerPostponedPostDocs");
      try {
        dataAttachments = getPostAttaches(docus.closest('[class^="PostContentContainer__contentContainer"]')!);
      } catch (error) {
        console.log(error);
      }
      let allDocs = docus;
      let count = 0;
      dataAttachments.item.attachments.forEach(async function (docu: any) {
        if (docu.doc) {
          let documentCurrent = docu.doc;
          let secondaryAttachDoc = document.createElement("div");
          secondaryAttachDoc.classList.add("vkuiDiv", "vkuiRootComponent", "vkEnhancerSecondaryAttach");
          if (count === 0) {
            secondaryAttachDoc.classList.add("vkuiDiv", "vkuiRootComponent", "vkEnhancerSecondaryAttachFirst");
            count += 1;
          }
          secondaryAttachDoc.style.padding = "0px 8px";
          secondaryAttachDoc.innerHTML = documentAttachment(documentCurrent);
          if (documentCurrent.preview) {
            let fallBack = secondaryAttachDoc.querySelector(".vkuiInternalImage") as HTMLElement;
            fallBack.querySelector(".vkuiImageBase__fallback")?.remove();
            fallBack.style.background = "url(" + documentCurrent.preview.photo.sizes[0].src + ")";
            fallBack.style.backgroundSize = "cover";
          } else {
          }
          allDocs?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachDoc);
        }
      });
    }
  });
};

export default postDocs;
