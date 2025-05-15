import getPostIdFromPost from "../oldPosting/getPostIdFromPost";

const handleDateClick = (e: MouseEvent, isModalView: boolean) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }
  cancelEvent(e);
  const postRaw = getPostIdFromPost(target);
  if (e.metaKey || e.ctrlKey || isModalView) {
    return window.open(`/wall${postRaw}`);
  }
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

export default handleDateClick;
