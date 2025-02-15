import postArticle from "./postArticle";
import postAuthor from "./postAuthor";
import postDocs from "./postDocs";
import postLinks from "./postLinks";
import postMusic from "./postMusic";

const postponedSuggestedPosts = () => {
    //postSubtitle();
    postAuthor();
    postDocs();
    postLinks();
    postArticle();
    postMusic();
}

export default postponedSuggestedPosts;