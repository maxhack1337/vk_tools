import { escapeHtml } from "../../../../escapeHtml";
import getLinkImageMaxSizeUrl from "../../../oldFeed/attachments/getLinkImageMaxSizeUrl";
import addBlock from "./addBlock";

interface ArticleItem {
  id: number;
  owner_id: number;
  owner_name: string;
  owner_photo: string;
  title: string;
  subtitle?: string;
  lead_description?: string;
  url: string;
  view_url?: string;
  photo?: {
    sizes: { url: string; width: number; height: number }[];
  };
}

interface ArticlesResponse {
  count: number;
  items: ArticleItem[];
}

const articlesTab = (articlesGetter: ArticlesResponse, id: number, screen_name: string, isOwner: boolean) => {
  const aside = document.createElement("aside");
  aside.setAttribute("aria-label", "Статьи");
  if (articlesGetter.items.length > 0) {
    const moduleDiv = document.createElement("div");
    moduleDiv.classList.add("module", "clear", "articles_module", "_module");
    moduleDiv.id = articlesGetter.items.length > 0 ? `${articlesGetter.items[0].owner_id}` : "";

    const headerRightLink = document.createElement("div");
    headerRightLink.classList.add("header_right_link", "fl_r");
    moduleDiv.appendChild(headerRightLink);

    if (isOwner) {
      const lnk = document.createElement("a");
      lnk.textContent = getLang?.("global_photo_attach_edit").toString().toLowerCase() || "ред.";
      lnk.href = `https://vk.com/@${screen_name}`;
      headerRightLink.append(lnk);
    }

    const headerLink = document.createElement("a");
    headerLink.classList.add("module_header");
    headerLink.href = `https://vk.com/@${screen_name}`;

    const headerTop = document.createElement("div");
    headerTop.classList.add("header_top", "clear_fix");

    const headerLabel = document.createElement("span");
    headerLabel.classList.add("header_label", "fl_l");
    headerLabel.textContent = "Статьи";

    const headerCount = document.createElement("span");
    headerCount.classList.add("header_count", "fl_l");
    headerCount.textContent = articlesGetter.count.toString();

    headerTop.appendChild(headerLabel);
    headerTop.appendChild(headerCount);
    headerLink.appendChild(headerTop);
    moduleDiv.appendChild(headerLink);

    const moduleBody = document.createElement("div");
    moduleBody.classList.add("module_body", "clear_fix");

    articlesGetter.items.forEach((article) => {
      const articleLink = document.createElement("a");
      articleLink.classList.add("article_snippet", "clear_fix");
      articleLink.href = article.url;
      articleLink.setAttribute("data-post-id", "");
      articleLink.setAttribute("onmouseenter", `articlePrepare('${escapeHtml(article.url.replace(/^https?:\/\/vk\.com/, ""))}')`);

      const imageWrap = document.createElement("div");
      imageWrap.classList.add("article_snippet__image_wrap");

      const imageDiv = document.createElement("div");
      imageDiv.classList.add("article_snippet__image");

      if (article.photo?.sizes?.length) {
        const bestImage = getLinkImageMaxSizeUrl(article.photo.sizes);
        imageDiv.style.backgroundImage = `url(${bestImage})`;
      }

      imageWrap.appendChild(imageDiv);
      articleLink.appendChild(imageWrap);

      const fadeDiv = document.createElement("div");
      fadeDiv.classList.add("article_snippet__fade");
      articleLink.appendChild(fadeDiv);

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("article_snippet__info");

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("article_snippet__title");
      titleDiv.textContent = article.title;

      const authorDiv = document.createElement("div");
      authorDiv.classList.add("article_snippet__author");
      authorDiv.textContent = article.owner_name;

      const readBtn = document.createElement("button");
      readBtn.classList.add("article_snippet__read_btn", "flat_button");
      readBtn.textContent = "Читать";

      infoDiv.appendChild(titleDiv);
      infoDiv.appendChild(authorDiv);
      infoDiv.appendChild(readBtn);

      articleLink.appendChild(infoDiv);

      moduleBody.appendChild(articleLink);

      const pageModuleTitle = document.createElement("a");
      pageModuleTitle.classList.add("page_module_article_title");
      pageModuleTitle.href = article.url;
      pageModuleTitle.textContent = article.title;

      moduleBody.appendChild(pageModuleTitle);
    });

    moduleDiv.appendChild(moduleBody);
    aside.appendChild(moduleDiv);
  } else {
    if (isOwner) {
      const addArticle = addBlock("articles", id, screen_name);
      aside.append(addArticle);
    }
  }
  return aside;
};

export default articlesTab;
