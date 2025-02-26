import { getIcon28AlbumOutline } from "../icons/getIcon28AlbumOutline";
import { getIcon24SongOutline } from "../icons/getIcon24SongOutline";
import createStyle from "../../functions/classicalProfile/scripts/createStyle";
import progressSnackStyle from "./progressSnackStyle";

const snackbarTypeIconMap: { [key: string]: string } = {
    album: getIcon28AlbumOutline().icon,
    music: getIcon24SongOutline().icon
};

const progressSnack = (text = '', icon: string, imgurl?: string) => {
    createStyle('progressSnack', progressSnackStyle());

    let snackBar = document.createElement("div");
    snackBar.classList.add("vkToolsSnackbar", "vkToolsSnackbar--ios", "vkToolsSnackbar--desktop", "vkui--vkIOS--light");

    let snackBarIn = document.createElement("div");
    snackBarIn.classList.add("vkToolsSnackbar__in");

    let snackBarBody = document.createElement("div");
    snackBarBody.classList.add("vkToolsSnackbar__body", "vkToolsSnackbar--layout-vertical", "vkToolsSnackbar__snackbar");

    let snackBefore = document.createElement("div");
    snackBefore.classList.add("vkToolsSnackbar__before")
    if (icon === "custom" && imgurl) {
        snackBefore.innerHTML = `<img class="vkToolsImageSnack" src=${imgurl}>`;
    } else {
        snackBefore.innerHTML = snackbarTypeIconMap[icon] ? snackbarTypeIconMap[icon] : '';
    }

    let snackContent = document.createElement('div');
    snackContent.classList.add("vkToolsSnackbar__content");

    let snackContentText = document.createElement('span');
    snackContentText.classList.add("vkToolsTypography", "vkToolsSnackbar__content-text", "vkToolsParagraph");
    snackContentText.textContent = text;

    snackContent.append(snackContentText);
    snackBarBody.append(snackBefore, snackContent);
    snackBarIn.append(snackBarBody);
    snackBar.append(snackBarIn);

    return snackBar;
}

export default progressSnack;