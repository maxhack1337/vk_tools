import postArticle from "./postArticle";
import postAuthor from "./postAuthor";
import postDocs from "./postDocs";
import postLinks from "./postLinks";
import postMusic from "./postMusic";
import postPlist from "./postPlist";

const postponedSuggestedPosts = () => {
  //postSubtitle();
  postDocs();
  postLinks();
  postArticle();
  postMusic();
  postPlist();
  postAuthor();
};

export default postponedSuggestedPosts;
