const miniAppAttachmentSecondary = (miniApp: any) => {
    let app = miniApp.app;
    let images = miniApp.images;
    let title = miniApp.title;
    let description = miniApp.description;

    const miniAppsSnippet = document.createElement('div');
    miniAppsSnippet.classList.add('MiniAppsSnippet', 'MiniAppsSnippet--small', 'PostNoBottomSpaceAttach');

    const miniAppsSnippetAnchor = document.createElement('a');
    miniAppsSnippetAnchor.target = "_blank";
    miniAppsSnippetAnchor.href = app.share_url;

    const miniAppsSnippetCover = document.createElement('div');
    miniAppsSnippetCover.classList.add('MiniAppsSnippetCover');
    if (images[0]) miniAppsSnippetCover.style.backgroundImage = `url(${images[0].url})`;
    
    miniAppsSnippetAnchor.append(miniAppsSnippetCover);

    const miniAppsSnippetFields = document.createElement('div');
    miniAppsSnippetFields.classList.add('MiniAppsSnippetFields');

    let miniAppSnippetBottomFieldsTitle = document.createElement('a');
    miniAppSnippetBottomFieldsTitle.href = app.share_url;
    miniAppSnippetBottomFieldsTitle.target = "_blank";

    let h5 = document.createElement('h5');
    h5.classList.add('MiniAppsSnippetBottomFields__title');
    h5.textContent = title;
    
    miniAppSnippetBottomFieldsTitle.append(h5);

    let miniAppSnippetBottomFieldsDescription = document.createElement('a');
    miniAppSnippetBottomFieldsDescription.href = app.share_url;
    miniAppSnippetBottomFieldsDescription.target = "_blank";

    let h6 = document.createElement('h6');
    h6.classList.add('MiniAppsSnippetBottomFields__description');
    h6.textContent = description;
    
    miniAppSnippetBottomFieldsDescription.append(h6);

    let miniAppSnippetBottomFieldsTypeDescription = document.createElement('a');
    miniAppSnippetBottomFieldsTypeDescription.target = 'blank';
    miniAppSnippetBottomFieldsTypeDescription.href = app.share_url;
    miniAppSnippetBottomFieldsTypeDescription.classList.add('MiniAppsSnippetBottomFields__type_description');

    miniAppsSnippetFields.append(miniAppSnippetBottomFieldsTitle, miniAppSnippetBottomFieldsDescription, miniAppSnippetBottomFieldsTypeDescription);

    if (miniApp.button_text) {
        let miniAppSnippetBottomButton = document.createElement('a');
        miniAppSnippetBottomButton.classList.add('FlatButton', 'FlatButton--primary', 'FlatButton--size-s', 'MiniAppsSnippetBottomButton');
        miniAppSnippetBottomButton.href = app.share_url;
        miniAppSnippetBottomButton.target = "_blank";

        let miniAppSnippetBottomButtonIn = document.createElement('span');
        miniAppSnippetBottomButtonIn.classList.add('FlatButton__in');

        let miniAppSnippetBottomButtonInBefore = document.createElement('span');
        miniAppSnippetBottomButtonInBefore.classList.add('FlatButton__before');
        miniAppSnippetBottomButtonInBefore.innerHTML = `<svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M5.4 9c.55 0 .76.06.96.17.2.1.36.27.47.47.11.2.17.4.17.96v1.8c0 .55-.06.76-.17.96s-.27.36-.47.47c-.2.11-.4.17-.96.17H3.6c-.55 0-.76-.06-.96-.17-.2-.1-.36-.27-.47-.47S2 12.96 2 12.4v-1.8c0-.55.06-.76.17-.96.1-.2.27-.36.47-.47.2-.11.4-.17.96-.17zm7 0c.55 0 .76.06.96.17s.36.27.47.47c.11.2.17.4.17.96v1.8c0 .55-.06.76-.17.96-.1.2-.27.36-.47.47-.2.11-.4.17-.96.17h-1.8c-.55 0-.76-.06-.96-.17-.2-.1-.36-.27-.47-.47S9 12.96 9 12.4v-1.8c0-.55.06-.76.17-.96.1-.2.27-.36.47-.47s.4-.17.96-.17zm-.57-7.47c.23.07.4.17.8.57l1.27 1.27c.4.4.5.57.57.8.06.22.06.44 0 .66s-.17.4-.57.8L12.63 6.9c-.4.4-.57.5-.8.57-.22.06-.44.06-.66 0-.23-.07-.4-.17-.8-.57L9.1 5.63c-.4-.4-.5-.57-.57-.8a1.14 1.14 0 0 1 0-.66c.07-.23.17-.4.57-.8l1.27-1.27c.4-.4.57-.5.8-.57s.44-.06.66 0zM5.4 2c.55 0 .76.06.96.17.2.1.36.27.47.47.11.2.17.4.17.96v1.8c0 .55-.06.76-.17.96-.1.2-.27.36-.47.47-.2.11-.4.17-.96.17H3.6c-.55 0-.76-.06-.96-.17-.2-.1-.36-.27-.47-.47-.11-.2-.17-.4-.17-.96V3.6c0-.55.06-.76.17-.96.1-.2.27-.36.47-.47.2-.11.4-.17.96-.17z" fill="currentColor"></path></svg>`;

        let miniAppSnippetBottomButtonInContent = document.createElement('span');
        miniAppSnippetBottomButtonInContent.classList.add('FlatButton__content');
        miniAppSnippetBottomButtonInContent.textContent = miniApp.button_text;


        miniAppSnippetBottomButtonIn.append(miniAppSnippetBottomButtonInBefore, miniAppSnippetBottomButtonInContent);
        miniAppSnippetBottomButton.append(miniAppSnippetBottomButtonIn);
        miniAppsSnippetFields.append(miniAppSnippetBottomButton);
    }

    miniAppsSnippet.append(miniAppsSnippetAnchor, miniAppsSnippetFields);
    return miniAppsSnippet;
}

export default miniAppAttachmentSecondary;