import postArticle from "./postArticle";
import postAuthor from "./postAuthor";
import postDocs from "./postDocs";
import postLinks from "./postLinks";
import postMusic from "./postMusic";
import postSubtitle from "./postSubtitle";
import postText from "./postText";

const postponedSuggestedPosts = () => {
    postText();
    postSubtitle();
    postAuthor();
    postDocs();
    postLinks();
    postArticle();
    postMusic();
}

export default postponedSuggestedPosts;