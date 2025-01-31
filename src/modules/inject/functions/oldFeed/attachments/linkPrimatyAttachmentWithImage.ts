const linkPrimatyAttachmentWithImage = (linkCurrent: any) => {
    let mediaLinkWide = document.createElement('div');
    mediaLinkWide.classList.add('media_link', 'media_link--sized', 'media_link--photo', 'media_link--wide');
    mediaLinkWide.style.marginTop = "0px";

    let mediaLinkMedia = document.createElement('a');
    mediaLinkMedia.classList.add('media_link__media');
    mediaLinkMedia.href = linkCurrent.url;
    mediaLinkMedia.rel = 'nofollow noopener';
    mediaLinkMedia.target = '_blank';
    mediaLinkMedia.style.paddingTop = '0px';

    let mediaLinkPhoto = document.createElement('img');
    mediaLinkPhoto.src = linkCurrent.photo.sizes.at(-1).url;
    mediaLinkPhoto.alt = linkCurrent.title;

    mediaLinkMedia.append(mediaLinkPhoto);

    let mediaLinkLabel = document.createElement('div');
    mediaLinkLabel.classList.add('media_link__label');

    let mediaLinkInfo = document.createElement('div');
    mediaLinkInfo.classList.add('media_link__info');

    let mediaLinkTitle = document.createElement('a');
    mediaLinkTitle.classList.add('media_link__title');
    mediaLinkTitle.title = linkCurrent.title;
    mediaLinkTitle.href = linkCurrent.url;
    mediaLinkTitle.rel = 'nofollow noopener';
    mediaLinkTitle.target = '_blank';
    mediaLinkTitle.textContent = linkCurrent.title;

    let mediaLinkSubtitle = document.createElement('a');
    mediaLinkSubtitle.classList.add('media_link__subtitle');
    mediaLinkSubtitle.href = linkCurrent.url;
    mediaLinkSubtitle.rel = 'nofollow noopener';
    mediaLinkSubtitle.target = '_blank';
    mediaLinkSubtitle.textContent = linkCurrent.url;

    mediaLinkInfo.append(mediaLinkTitle, mediaLinkSubtitle);
    mediaLinkLabel.append(mediaLinkInfo);
    mediaLinkWide.append(mediaLinkMedia, mediaLinkLabel);

    return mediaLinkWide;
}

export default linkPrimatyAttachmentWithImage;