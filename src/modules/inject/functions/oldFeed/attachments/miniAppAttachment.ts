const miniAppAttachment = (miniApp:any) => {
    let app = miniApp.app;
    let images = miniApp.images;
    let title = miniApp.title;
    let description = miniApp.description;

    let miniAppAnchor = document.createElement('a');
    miniAppAnchor.href = app.share_url;
    miniAppAnchor.target = "_blank";
    miniAppAnchor.style.textDecoration = "none";

    let miniAppObject = document.createElement('object');

    let miniAppSnippet = document.createElement('div');
    miniAppSnippet.classList.add('MiniAppsSnippet', 'MiniAppsSnippet--big', 'PostNoBottomSpaceAttach');
    if (images[0]) miniAppSnippet.style.backgroundImage = `url(${images[0].url})`;
    miniAppSnippet.style.marginTop = "0px";
    miniAppSnippet.style.borderRadius = "4px";
    miniAppSnippet.style.boxShadow = "0 0 0 1px var(--vkui--vkontakte_color_snippet_border_alpha) inset";

    let miniAppSnippetBottom = document.createElement('div');
    miniAppSnippetBottom.classList.add('MiniAppsSnippetBottom');

    let miniAppSnippetBottomFields = document.createElement('div');
    miniAppSnippetBottomFields.classList.add('MiniAppsSnippetBottomFields');

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
    miniAppSnippetBottomFields.append(miniAppSnippetBottomFieldsTitle, miniAppSnippetBottomFieldsDescription);
    miniAppSnippetBottom.append(miniAppSnippetBottomFields);
    

    if (miniApp.button_text) {
        let miniAppSnippetBottomButton = document.createElement('a');
        miniAppSnippetBottomButton.classList.add('FlatButton', 'FlatButton--primary', 'FlatButton--size-s', 'MiniAppsSnippetBottomButton');
        miniAppSnippetBottomButton.href = app.share_url;
        miniAppSnippetBottomButton.target = "_blank";

        let miniAppSnippetBottomButtonIn = document.createElement('span');
        miniAppSnippetBottomButtonIn.classList.add('FlatButton__in');

        let miniAppSnippetBottomButtonInBefore = document.createElement('span');
        miniAppSnippetBottomButtonInBefore.classList.add('FlatButton__before');
        miniAppSnippetBottomButtonInBefore.innerHTML = `<svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M8 3.5H6c-3.75 0-5 3-5 6 0 1.75.5 3.5 2 3.5.65 0 1.02-.52 1.44-1.11.54-.77 1.15-1.64 2.56-1.64h2c1.4 0 2.02.87 2.56 1.64.42.59.79 1.11 1.44 1.11 1.5 0 2-1.75 2-3.5 0-3-1.25-6-5-6zm2 4c0-.28.22-.5.5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-6-1a.5.5 0 0 1 1 0V7h.5a.5.5 0 0 1 0 1H5v.5a.5.5 0 0 1-1 0V8h-.5a.5.5 0 0 1 0-1H4z" fill="currentColor" fill-rule="evenodd"></path></svg>`;

        let miniAppSnippetBottomButtonInContent = document.createElement('span');
        miniAppSnippetBottomButtonInContent.classList.add('FlatButton__content');
        miniAppSnippetBottomButtonInContent.textContent = miniApp.button_text;


        miniAppSnippetBottomButtonIn.append(miniAppSnippetBottomButtonInBefore, miniAppSnippetBottomButtonInContent);
        miniAppSnippetBottomButton.append(miniAppSnippetBottomButtonIn);
        miniAppSnippetBottom.append(miniAppSnippetBottomButton);
    }
    miniAppSnippet.append(miniAppSnippetBottom);
    miniAppObject.append(miniAppSnippet);
    miniAppAnchor.append(miniAppObject);

    return miniAppAnchor;
}

export default miniAppAttachment;