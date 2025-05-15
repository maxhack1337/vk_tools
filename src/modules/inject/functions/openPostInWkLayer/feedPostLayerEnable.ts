import getLocalValue from "../../getLocalValue";
import handleDateClick from "./handleDateClick";
import handlePostBottomClick from "./handlePostBottomClick";
import handleReplyClick from "./handleReplyClick";
import handleTextClick from "./handleTextClick";
import isLinkInComment from "./isLinkInComment";

const feedPostLayerEnable = () => {
  if (getLocalValue("postInWkLayer")) {
    document.arrive('[class^="vkitPostText__root"]', { existing: true }, (postText) => {
      postText.addEventListener("click", (e) => {
        const target = e.target as Element | null;
        if (!target) return;
        const rootElement = target.closest("[data-post-id]") as HTMLElement;
        if (!rootElement) return;
        const isExpanded = !rootElement?.querySelector('[class^="vkitShowMoreText__after"]');
        const parentLink = target.closest("a");
        if (parentLink && rootElement?.contains(parentLink)) return;
        if (isExpanded) {
          e.preventDefault();
          e.stopPropagation();
          handleTextClick(target, rootElement);
        }
      });
    });

    document.arrive(".PostDateBlock__root a[class^='vkitLink__link']", { existing: true }, (postLink) => {
      postLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        let isModalView = window.wkcur?.shown;
        handleDateClick(e as MouseEvent, isModalView);
      });
    });

    document.arrive('[data-task-click="PostBottomAction/comment"]', { existing: true }, (repliesNext) => {
      repliesNext.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        handlePostBottomClick(e as MouseEvent);
      });
    });

    document.arrive('[data-task-click="FeedReplies/showCommentInLayer"]', { existing: true }, (reply) => {
      reply.addEventListener("click", (e) => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) {
          return;
        }
        if (isLinkInComment(target)) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        handleReplyClick(e as MouseEvent);
      });
    });
  }
};

export default feedPostLayerEnable;
