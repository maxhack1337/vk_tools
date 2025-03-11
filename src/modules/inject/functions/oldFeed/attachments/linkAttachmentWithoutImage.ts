const linkAttachmentWithoutImage = (linkCurrent: any) => {
    let mediaDescLink = document.createElement('div');
    mediaDescLink.classList.add('media_desc','media_desc--link','PostMediaRowWithActionStatusBarSeparator');

    let mailLink = document.createElement('a');
    mailLink.classList.add('mail_link');
    mailLink.href = linkCurrent.url;
    mailLink.rel = 'nofollow noopener';
    mailLink.target = '_blank';

    let mailLinkTitle = document.createElement('span');
    mailLinkTitle.classList.add('mail_link__title');
    mailLinkTitle.textContent = linkCurrent.title;

    let mailLinkSubtitle = document.createElement('span');
    mailLinkSubtitle.classList.add('mail_link__subtitle');
    mailLinkSubtitle.textContent = linkCurrent.url;
    mailLinkSubtitle.style.display = 'block';
    mailLinkSubtitle.style.width = '100%';
    mailLinkSubtitle.style.overflow = 'hidden';
    mailLinkSubtitle.style.textOverflow = 'ellipsis';

    mailLink.append(mailLinkTitle, mailLinkSubtitle);
    mediaDescLink.append(mailLink);

    return mediaDescLink;
}

export default linkAttachmentWithoutImage;