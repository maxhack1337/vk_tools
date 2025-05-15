import getPostIdFromPost from "../oldPosting/getPostIdFromPost";

const handleTextClick = (target: any, rootElement: HTMLElement) => {
  if (!(target instanceof HTMLElement)) {
    return;
  }
  const postRaw = getPostIdFromPost(target);
  if (!target || window.getSelection()?.toString()) return;
  if (target.tagName === "A") return;
  if (window.wkcur?.shown) return;
  showWiki(
    {
      w: `wall${postRaw}`,
    },
    false,
    undefined,
    {
      trackCode: "vkTools",
      source: "date_link",
    }
  );
};

export default handleTextClick;
