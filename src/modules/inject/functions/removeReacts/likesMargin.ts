const likesMargin = () => {
  if (localStorage.getItem("removePostReactions") === "true") {
    const wallSel = [".PostActionStatusBar--inPost"];
    document.arrive(wallSel[0], { existing: true }, function (e) {
      try {
        let likesInWl = e.querySelector(".ReactionsPreview--isInActionStatusBar");
        let appendHereLikes = e?.closest(".wl_post_actions_wrap")?.querySelector(".like_btns .PostButtonReactionsContainer");
        if (!appendHereLikes) appendHereLikes = e?.closest(".post_info")?.querySelector(".like_btns .PostButtonReactionsContainer");
        if (likesInWl) appendHereLikes?.appendChild(likesInWl);
      } catch (error) {
        console.log(error);
      }
    });
    document.arrive(".post--withPostBottomAction:not(.post--withActionStatusBar)", { existing: true }, function (e) {
      let postId = e.getAttribute("id");
      let postButton = e.querySelector(".PostBottomAction.PostBottomAction--withBg.PostButtonReactions.PostButtonReactions--post");
      if (postButton) {
        postButton.removeAttribute("onmouseenter");
        postButton.removeAttribute("onkeydown");
        postButton.setAttribute("onmouseover", "Likes.showLikes(this, '" + postId?.replace("post", "wall") + "', {isFromReactionsPreview:1})");
      }
    });
  }
};

export default likesMargin;
