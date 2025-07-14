import { getDocumentsText } from "../../../downloadAttachments/localizationDocs";
import getDocSize from "../../../oldFeed/attachments/getDocSize";
import addBlock from "./addBlock";

interface DocItem {
  id: number;
  owner_id: number;
  title: string;
  size: number;
  ext: string;
  date: number;
  type: number;
  url: string;
  can_manage: boolean;
}

interface DocsResponse {
  count: number;
  items: DocItem[];
}

const docsTab = (docsGetter: DocsResponse, id: number, isOwner: boolean) => {
  const aside = document.createElement("aside");
  aside.setAttribute("aria-label", getDocumentsText(vk.lang));

  if (docsGetter.items.length > 0) {
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("module", "clear", "documents_module", "_module");
    moduleDiv.id = docsGetter.items.length > 0 ? `${docsGetter.items[0].owner_id}` : "";

    const headerRightLink = document.createElement("div");
    headerRightLink.classList.add("header_right_link", "fl_r");
    moduleDiv.appendChild(headerRightLink);

    if (isOwner) {
      const lnk = document.createElement("a");
      lnk.textContent = getLang?.("me_message_edited_label_short").toString() || "ред.";
      lnk.href = `https://vk.com/docs-${id}`;
      headerRightLink.append(lnk);
    }

    const headerLink = document.createElement("a");
    headerLink.classList.add("module_header");
    headerLink.href = `https://vk.com/docs-${id}`;

    const headerTop = document.createElement("div");
    headerTop.classList.add("header_top", "clear_fix");

    const headerLabel = document.createElement("span");
    headerLabel.classList.add("header_label", "fl_l");
    headerLabel.textContent = getDocumentsText(vk.lang);

    const headerCount = document.createElement("span");
    headerCount.classList.add("header_count", "fl_l");
    headerCount.textContent = docsGetter.count.toString();

    headerTop.appendChild(headerLabel);
    headerTop.appendChild(headerCount);
    headerLink.appendChild(headerTop);
    moduleDiv.appendChild(headerLink);

    const moduleBody = document.createElement("div");
    moduleBody.classList.add("module_body", "clear_fix");

    const groupTabFiles = document.createElement("div");
    groupTabFiles.classList.add("group-tab-files");

    docsGetter.items.forEach((doc) => {
      const mediaDesc = document.createElement("div");
      mediaDesc.classList.add("media_desc", "media_desc__doc", "PostMediaRowWithActionStatusBarSeparator");

      const pageDocRow = document.createElement("div");
      pageDocRow.classList.add("page_doc_row");

      const docIcon = document.createElement("a");
      docIcon.classList.add("page_doc_icon", `page_doc_icon${doc.type}`);
      docIcon.href = doc.url;
      docIcon.target = "_blank";
      docIcon.rel = "noopener noreferrer";
      pageDocRow.appendChild(docIcon);

      const docTitle = document.createElement("a");
      docTitle.classList.add("page_doc_title");
      docTitle.href = doc.url;
      docTitle.target = "_blank";
      docTitle.rel = "noopener noreferrer";
      docTitle.textContent = doc.title;
      pageDocRow.appendChild(docTitle);

      const descRow = document.createElement("div");
      descRow.classList.add("page_doc_description_row");

      const sizeDiv = document.createElement("div");
      sizeDiv.classList.add("page_doc_size");
      sizeDiv.textContent = getDocSize(doc.size) + ", " + getSmDate(doc.date);
      descRow.appendChild(sizeDiv);

      const appDiv = document.createElement("div");
      appDiv.classList.add("page_doc_app");
      descRow.appendChild(appDiv);

      pageDocRow.appendChild(descRow);
      mediaDesc.appendChild(pageDocRow);
      groupTabFiles.appendChild(mediaDesc);
    });

    moduleBody.appendChild(groupTabFiles);
    moduleDiv.appendChild(moduleBody);
    aside.appendChild(moduleDiv);
  } else {
    if (isOwner) {
      const addDoc = addBlock("documents", id);
      aside.append(addDoc);
    }
  }

  return aside;
};

export default docsTab;
