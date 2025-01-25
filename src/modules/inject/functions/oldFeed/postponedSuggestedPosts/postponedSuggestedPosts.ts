import postArticle from "./postArticle";
import postAuthor from "./postAuthor";
import postDocs from "./postDocs";
import postLinks from "./postLinks";
import postMusic from "./postMusic";
import postSubtitle from "./postSubtitle";

const postponedSuggestedPosts = () => {
    postSubtitle();
    postAuthor();
    postDocs();
    postLinks();
    postArticle();
    postMusic();
}

export default postponedSuggestedPosts;