const articleAttachment = (articleInfo: any) => {
return `
				<div class="article_snippet__image_wrap">
    <div class="article_snippet__image"></div>
  </div>
  <div class="article_snippet__fade"></div>
  <div class="article_snippet__info">

    <div class="article_snippet__deleted_text">Статья удалена</div>
    <div class="article_snippet__title">${articleInfo.title}</div>
    <div class="article_snippet__author">${articleInfo.owner_name}<span class=""></span></div>
    <button style="display:none;" class="PageSnippetFaveButton PageSnippetFaveButton--white" data-state="" data-add="${getLang?.('fave_add')}" data-remove="${getLang?.('fave_delete')}" onmouseover="bookmarkTooltip(this)" onclick="bookmarkArticle(event, this, ${articleInfo.owner_id}, ${articleInfo.id}, 'article', '${articleInfo.access_key}', false, true)">
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" d="M11.08 3h1.84c1.05 0 1.9 0 2.59.06.7.05 1.31.17 1.88.46.9.46 1.63 1.2 2.09 2.1.29.56.4 1.17.46 1.87.06.69.06 1.54.06 2.6v7.6c0 .78 0 1.42-.05 1.92-.04.5-.14 1.03-.48 1.46-.46.58-1.15.92-1.9.93-.54 0-1.02-.24-1.44-.5-.42-.27-.93-.66-1.55-1.13l-1.61-1.24c-.61-.47-.72-.53-.8-.55a.66.66 0 0 0-.34 0c-.08.02-.19.08-.8.55l-1.61 1.24c-.62.47-1.13.86-1.55 1.13-.42.26-.9.5-1.45.5a2.46 2.46 0 0 1-1.9-.93 2.68 2.68 0 0 1-.47-1.46C4 19.11 4 18.47 4 17.7v-7.62c0-1.05 0-1.9.06-2.59.05-.7.17-1.31.46-1.88.46-.9 1.2-1.63 2.1-2.09.56-.29 1.17-.4 1.87-.46C9.18 3 10.03 3 11.1 3zM8.64 4.85c-.6.05-.94.14-1.2.28-.57.28-1.03.74-1.31 1.3-.14.27-.23.62-.28 1.21-.05.6-.05 1.38-.05 2.48v7.53c0 .83 0 1.4.04 1.8.04.41.1.5.1.5.12.16.3.25.5.25 0 0 .12 0 .47-.22.34-.22.79-.56 1.45-1.07l1.58-1.2.1-.09c.44-.33.85-.65 1.32-.78.42-.1.86-.1 1.28 0 .47.13.88.45 1.32.78l.1.08 1.58 1.21c.66.5 1.1.85 1.45 1.07.35.22.46.22.46.22.2 0 .39-.1.5-.25 0 0 .07-.09.11-.5.04-.4.04-.97.04-1.8v-7.53c0-1.1 0-1.88-.05-2.48-.05-.6-.14-.94-.28-1.2a2.99 2.99 0 0 0-1.3-1.31 3.17 3.17 0 0 0-1.21-.28 33.8 33.8 0 0 0-2.48-.05h-1.76c-1.1 0-1.88 0-2.48.05z" fill="currentColor" fill-rule="evenodd"></path>
      </svg>
    </button>
    <div class="article_snippet__buttons">
      <button class="article_snippet__action_btn article_snippet__action_btn--read flat_button">
        <div class="article_snippet__action_btn_icon article_snippet__action_btn_icon--read"></div>
        <div class="article_snippet__action_btn_text">Читать</div>
      </button>
    </div>
  </div>
				`;
}

export default articleAttachment;