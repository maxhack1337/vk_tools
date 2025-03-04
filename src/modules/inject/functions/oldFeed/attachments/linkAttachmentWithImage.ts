import getLinkImageMaxSizeUrl from "./getLinkImageMaxSizeUrl";

const linkAttachmentWithImage = (linkCurrent: any) => {
    let thumbedLink = document.createElement('div');
    thumbedLink.classList.add('thumbed_link', 'page_media_wrap');

    let thumbedLinkThumb = document.createElement('a');
    thumbedLinkThumb.classList.add('thumbed_link__thumb');
    thumbedLinkThumb.href = linkCurrent.url;
    thumbedLinkThumb.target = "_blank";
    thumbedLinkThumb.rel = "nofollow noopener";
    thumbedLinkThumb.style.backgroundImage = `url(${getLinkImageMaxSizeUrl(linkCurrent.photo.sizes)})`;

    let thumbedLinkLabel = document.createElement('div');
    thumbedLinkLabel.classList.add('thumbed_link__label');

    let thumbedLinkTitle = document.createElement('a');
    thumbedLinkTitle.classList.add('thumbed_link__title');
    thumbedLinkTitle.href = linkCurrent.url;
    thumbedLinkTitle.target = '_blank';
    thumbedLinkTitle.rel = "nofollow noopener";
    thumbedLinkTitle.textContent = linkCurrent.title;

    let thumbedLinkSubtitle = document.createElement('a');
    thumbedLinkSubtitle.classList.add('thumbed_link__subtitle');
    thumbedLinkSubtitle.href = linkCurrent.url;
    thumbedLinkSubtitle.target = '_blank';
    thumbedLinkSubtitle.rel = "nofollow noopener";
    thumbedLinkSubtitle.textContent = linkCurrent.url;

    thumbedLinkLabel.append(thumbedLinkTitle, thumbedLinkSubtitle);
    thumbedLink.append(thumbedLinkThumb, thumbedLinkLabel);

    return thumbedLink;
}

export default linkAttachmentWithImage;