import { escapeHtml, escapeUrl } from "../../../escapeHtml";

const linkAttachmentWithoutTitle = (linkCurrent: any) => {
    const mediaDesc = document.createElement('div');
    mediaDesc.classList.add('media_desc', 'media_desc__');

    const lnk = document.createElement('a');
    lnk.href = escapeUrl(linkCurrent.url);
    lnk.target = "_blank";
    lnk.rel = "nofollow noopener";

    const b = document.createElement('b');
    b.classList.add('fl_l');

    const a = document.createElement('span');
    a.classList.add('a');
    a.textContent = escapeHtml(linkCurrent.url);

    lnk.append(b, a);
    mediaDesc.append(lnk);
    return mediaDesc;
}

export default linkAttachmentWithoutTitle;