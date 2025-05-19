const onAttachArticleToPost = () => {
  if (window.cur.wallAddMedia) {
    if (window.cur.postComposer && Composer && window.cur.oid) {
      Composer.reset(window.cur.postComposer);
      window.cur.wallAddMedia.unchooseMedia(undefined, ["photo", "video"]);
    }
    setTimeout(() => {
      window.cur.wallAddMedia.chooseMedia("article", "", window.vkenh.currentArticle);
    }, 100);

    if (cur.articleEditorLayer) cur.articleEditorLayer.hide();
  }
};

export default onAttachArticleToPost;
