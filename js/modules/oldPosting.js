const fromId = document.getElementById.bind(document);

function deferredCallback(callback, opt) {
  let { variable, element } = opt;
  let updated = variable ? window[variable] : document.querySelector(element);
  if (!updated) {
    setTimeout(() => {
      deferredCallback(callback, opt);
    }, 0);
  } else {
    callback(updated);
  }
}

function refreshButtonTextLang(lang) {
  switch (lang) {
    case 0:
      return ['Не удалось включить старый редактор постов','Попробуйте нажать на кнопку "Подгрузить старый постинг"','Подгрузить старый постинг'];
      break;
    case 1:
      return ['Не вдалося включити старий редактор постів','Спробуйте натиснути кнопку "Підвантажити старий постінг"','Підвантажити старий постінг'];
      break;
    case 454:
      return ['Не вдалося включити старий редактор постів','Спробуйте натиснути кнопку "Підвантажити старий постінг"','Підвантажити старий постінг'];
      break;
    case 114:
      return ['Не атрымалася ўлучыць стары рэдактар ​​пастоў','Паспрабуйце націснуць на кнопку "Падгрузіць стары постынга"','Падгрузіць стары постынга'];
      break;
    case 2:
      return ['Не атрымалася ўлучыць стары рэдактар ​​пастоў','Паспрабуйце націснуць на кнопку "Падгрузіць стары постынга"','Падгрузіць стары постынга'];
      break;
    case 777:
      return ['Не удалось включить старый редактор постов','Попробуйте нажать на кнопку "Подгрузить старый постинг"','Подгрузить старый постинг'];
      break;
    case 97:
      return ['Ескі хабарлама өңдегішін қосу мүмкін болмады','"Ескі хабарламаны жүктеу" түймесін басып көріңіз','Ескі хабарламаны жүктеу'];
      break;
    case 100:
      return ['Не удалось включить старый редакторъ постовъ','Попробуйте нажать на кнопку "​Подгрузить​ старый ​постингъ​"','​Подгрузить​ старый ​постингъ​']; 
      break;
    default:
      return ['Failed to enable old post editor','Try clicking on the "Load old posting" button','Load old posting'];
      break;
  }
}

window.addEventListener('load', (e) => {
	if(localStorage.getItem('old_post_design') == 'false') return;
	if(document.querySelector('.PostingReactBlock__root')) {
		window.Notifier.showEvent({
			title: refreshButtonTextLang(vk.lang)[0],
			text: refreshButtonTextLang(vk.lang)[1]
		});
		let append = document.querySelector('.PostingReactBlock__root');
		if(append) append.appendChild(appendRefreshButton());
	}
});

function appendRefreshButton() {
	const div = document.createElement('div');
	div.classList.add('flat_button','secondary','vkEnhancerReloadWallBtn','_ui_load_more_btn','with_arrow');
	div.style.width = "100%";
	const span = document.createElement('span');
	span.classList.add('ui_load_more_btn_label');
	span.textContent = refreshButtonTextLang(vk.lang)[2];
		
	div.append(span);
		
	div.addEventListener('click', () => {
		nav.reload();
	});
	return div;
}

deferredCallback(
  async (_wall) => {
	if(localStorage.getItem('old_post_design') == 'false') return;
	window.vk?.pe && (delete window.vk.pe.posting_web_react_form,
    delete window.vk.pe.posting_hide_copyright_button_web)
	styleForEditPost();
  },
  { variable: "vk" }
);

deferredCallback(
  (_vk) => {
    nav.subscribeOnModuleEvaluated(() => {
      window.dispatchEvent(new CustomEvent("vkNav"));
      if(localStorage.getItem('old_post_design') == 'false') return;
	  window.vk?.pe && (delete window.vk.pe.posting_web_react_form,
	  delete window.vk.pe.posting_hide_copyright_button_web)
	  styleForEditPost();
	  console.info('[VKENH] Navigation event intercepted. Toggles removed');
    });
  },
  { variable: "nav" }
);

function styleForEditPost() {
	let styleElement = fromId("wpeOld");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "wpeOld";
      document.head.appendChild(styleElement);
    }
	styleElement.innerHTML = `
		.wall_module .Post--redesignV3 .wall_text:has(.wpe_text_cont) {
			padding: 8px 20px 20px!important;
		}
	`;
}

deferredCallback(
  async (_wall) => {
	let module = "web/page.js";
    await window.stManager.add([window.jsc(module)]);
  },
  { variable: "stManager" }
);

deferredCallback(
  async (_wall) => {
	let origInit = _wall.init;
	let origWall = _wall;
	_wall.init = async (...n) => {
		await exportVars(n[0].wall_oid,n[0].public_link,n[0].loc,n[0].owner,n[0].wall_tpl,n[0]);
		origInit.apply(origWall, n);
	}
  },
  { variable: "Wall" }
);

async function exportVars(wall_oid,public_link,loc,owner,wall_tpl,wallData) {
	if(localStorage.getItem('old_post_design') == 'false') return;
	console.info('[VKENH] Wall data fetched');
	console.log({wall_oid,public_link,loc,owner,wall_tpl,wallData});
	let newPostingBlock = document.querySelector('#page_block_submit_post.new_posting');
	let isFeedBlock = document.querySelector('#main_feed');
	let isWallModule = cur.module == 'wall';
	let isElseProfile = document.querySelector('.ui_tabs_right_section > .PostingReactBlock__root');
	if (document.querySelector('#submit_post_field')) return;
	if (!isFeedBlock && !newPostingBlock && !isElseProfile && !isWallModule) return;

	const [ownerId, ownerPhoto, ownerHref, ownerName] = wallData?.ownerData || [];
	const [profileId, profilePhoto, profileHref] = wallData?.profileData || [];
	let photoApi;
	let notMineWall;
	if(vk.id != owner?.id && owner?.id > 0) {
		notMineWall = await vkApi.api('users.get',{'user': vk.id,'fields': 'photo_200'});
		notMineWall = notMineWall[0].photo_200
	}
	if(!(ownerPhoto || owner?.photo || profilePhoto)) {
		photoApi = await vkApi.api('users.get',{'user': vk.id,'fields': 'photo_200'});
		photoApi = photoApi[0].photo_200
	}
	if (!window.templates) {
		window.templates = {};
	}

	if (!window.templates['primary_attachments_view_template']) {
		window.templates['primary_attachments_view_template'] =
			`<div class="post_action_btn primary_attachments_view" id=\'primary_attachments_view_btn%link_id%\' style=\'display: none;\'>\n  <div class="post_action_btn_layout">\n    <span class="post_action_btn_text" role="button" aria-label="${getLang?.('wall_posting_grid_view') || 'Сетка'}">${getLang?.('wall_posting_grid_view') || 'Сетка'}</span>\n    <span class="post_action_image_btn"><svg fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z" fill="currentColor" fill-rule="evenodd"/></svg></span>\n    <div class="post_action_tt_content">\n      <div class="FancyElementTT__item radiobtn" role="radio" aria-label=\'${getLang?.('wall_posting_grid_view') || 'Сетка'}\' data-value=\'grid\'>\n  \n  <div class="FancyElementTT__itemLabel">${getLang?.('wall_posting_grid_view') || 'Сетка'}</div>\n</div><div class="FancyElementTT__item radiobtn" role="radio" aria-label=\'${getLang?.('wall_posting_carousel_view') || 'Карусель'}\' data-value=\'carousel\'>\n  \n  <div class="FancyElementTT__itemLabel">${getLang?.('wall_posting_carousel_view') || 'Карусель'}</div>\n</div>\n    </div>\n  </div>\n</div>`;
	}
	const oid = wall_oid || ownerId || profileId;
	const isMyWall = vk.id == wall_oid?.valueOf();
	const submitPostBlock = postingBlock({
		isSuggested: wall_oid !== (ownerId || profileId) && (oid < 0) && wallData.suggesting,
		oid,
		fromOid: oid,
		ownerHref: ownerHref || public_link || loc || (owner?.id ? `id${owner.id}` : undefined) || profileHref,
		ownerPhoto: notMineWall || wall_tpl?.ownerData?.at(1) || ownerPhoto || owner?.photo || profilePhoto || photoApi,
		ownerName,
		onlyOfficial: wallData.only_official?.valueOf(),
		isMyWall
	});
	if (newPostingBlock) {
		newPostingBlock.parentElement.insertBefore(submitPostBlock, newPostingBlock);
		newPostingBlock.remove();
	}
	if (isFeedBlock) {
		isFeedBlock.parentElement.prepend(submitPostBlock);
		let newFeedPostingBlock = document.querySelector('.PostingReactBlock__root');
		if (newFeedPostingBlock) newFeedPostingBlock.remove();
	}
	if (isElseProfile) {
		isElseProfile.closest('.WallLegacy').prepend(submitPostBlock);
		let newElsePostingBlock = document.querySelector('.PostingReactBlock__root');
		if (newElsePostingBlock) newElsePostingBlock.remove();
	}
	if (isWallModule) {
		document.querySelector('.PostingReactBlock__root')?.parentElement.prepend(submitPostBlock);
		let newWallPostingBlock = document.querySelector('.PostingReactBlock__root');
		if (newWallPostingBlock) newWallPostingBlock.remove();
	}
}

function postingBlock({
	oid,
	fromOid,
	ownerName,
	ownerPhoto,
	ownerHref,
	isSuggested,
	onlyOfficial,
	isMyWall
}) {
	
	const isUser = oid ? (oid > 0) : true;
	const pageBlock = document.createElement('div');
	pageBlock.classList.add('page_block');
	pageBlock.id = 'page_block_submit_post';

	if (!isUser) {
		pageBlock.setAttribute('data-tooltip-id', 'business_groups_web:make_post');
	}

	const postingBlockMainRoot = postingBlockDataRoot({
		oid,
		fromOid,
		ownerName,
		ownerPhoto,
		ownerHref,
	});

	postingBlockMainRoot.append(
		postingBlockErrorOnPosting(),
		postingBlockAvatar({ ownerHref, ownerPhoto }),
		postingWrap(isSuggested, onlyOfficial),
		postingMediaPreview(),
		postingMediaInfo(),
		postingActionButtons(isUser, isMyWall),
		postingSubmitBlock(!isUser, isSuggested, onlyOfficial)
	);

	pageBlock.appendChild(postingBlockMainRoot);

	return pageBlock;
}

function postingBlockDataRoot({
	oid,
	fromOid,
	ownerName = '',
	ownerPhoto = '',
	ownerHref = '',
}){
	const postingBlockMainRoot = document.createElement('div');
	postingBlockMainRoot.id = 'submit_post_box';
	postingBlockMainRoot.classList.add('submit_post_box','clear_fix','_submit_post_box');
	postingBlockMainRoot.setAttribute('data-from-oid', String(fromOid) || '');
	postingBlockMainRoot.setAttribute('data-oid', String(oid) || '');
	postingBlockMainRoot.setAttribute('data-owner-name', ownerName);
	postingBlockMainRoot.setAttribute('data-owner-photo', ownerPhoto);
	postingBlockMainRoot.setAttribute('data-owner-href', ownerHref);
	postingBlockMainRoot.setAttribute(
		'onclick',
		"if(domClosest('article_snippet', event.target)) return;return cancelEvent(event)"
	);

	if (oid > 0) {
		postingBlockMainRoot.classList.add('submit_post_box_with_sitposting');
	}
	return postingBlockMainRoot;
}

function postingBlockErrorOnPosting() {
	const postingErrorBlock = document.createElement('div');
	postingErrorBlock.id = 'submit_post_error';
	postingErrorBlock.classList.add('error');

	return postingErrorBlock;
}

function postingBlockAvatar({ ownerHref = '', ownerPhoto = '' }) {
	const postingAvatarElement = document.createElement('a');
	postingAvatarElement.href = ownerHref;
	postingAvatarElement.classList.add('post_field_user_link','_post_field_author');
	postingAvatarElement.setAttribute(
		'onclick',
		'if (!checkEvent(event)) return nav.go(this, event); event.cancelBubble = true;'
	);

	const avatarImage = avatarImageInBlock(ownerPhoto);
	postingAvatarElement.appendChild(avatarImage);

	const avatarImageUnderlay = avatarImageInBlock(ownerPhoto);
	avatarImageUnderlay.classList.add('post_field_image_secondary');
	postingAvatarElement.appendChild(avatarImageUnderlay);

	return postingAvatarElement;
}

function postingWrap(isSuggested, onlyOfficial) {
	const postingWrapElement = document.createElement('div');
	postingWrapElement.classList.add('post_field_wrap','_emoji_field_wrap');

	const emojiAddButton = createEmojiSmileWrap();

	postingWrapElement.appendChild(emojiAddButton);

	const postFooter = postingFooterBlock(isSuggested, onlyOfficial);

	postingWrapElement.appendChild(postFooter);

	postingWrapElement.appendChild(postingWarningTooMuchSymbols());

	return postingWrapElement;
}

function createEmojiSmileWrap() {
	const emojiWrap = document.createElement('div');
	emojiWrap.classList.add('emoji_smile_wrap','_emoji_wrap');

	const emojiButton = document.createElement('div');
	emojiButton.classList.add('emoji_smile','_emoji_btn');
	emojiButton.role = 'button';
	emojiButton.title = getLang?.('wall_reply_emoji_hint') || 'Используйте TAB, чтобы быстрее открывать смайлы';
	emojiButton.setAttribute('onmouseenter', 'return Emoji.show(this, event);');
	emojiButton.setAttribute('onmouseleave', 'return Emoji.hide(this, event);');
	emojiButton.setAttribute('onclick', 'return cancelEvent(event);');
	emojiButton.setAttribute('aria-label', 'Add emoji or sticker');

	const emojiIcon = document.createElement('div');
	emojiIcon.classList.add('emoji_smile_icon_inline_svg','emoji_smile_icon');

	const emojiSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	emojiSvg.classList.add('vkuiIcon', 'vkuiIcon--24', 'vkuiIcon--w-24', 'vkuiIcon--h-24', 'vkuiIcon--smile_outline_24');
	emojiSvg.style.width = "24px";
	emojiSvg.style.height = "24px";
	emojiSvg.setAttribute('width', '24');
	emojiSvg.setAttribute('height', '24');
	emojiSvg.setAttribute('viewBox', '0 0 24 24');
	emojiSvg.setAttribute('fill', 'currentColor');

	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('fill', 'currentColor');
	path.setAttribute('d', 'M8.438 14.297a.9.9 0 0 1 1.259.133c.013.016.196.223.53.432.383.24.97.488 1.773.488a3.3 3.3 0 0 0 1.773-.488c.191-.12.382-.26.53-.432a.9.9 0 0 1 1.4 1.132 4 4 0 0 1-.976.826A5.1 5.1 0 0 1 12 17.15a5.1 5.1 0 0 1-2.727-.762 4 4 0 0 1-.976-.826.9.9 0 0 1 .14-1.265Zm1.812-4.047a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0M15 11.5A1.25 1.25 0 1 0 15 9a1.25 1.25 0 0 0 0 2.5m-3-9.4c-5.468 0-9.9 4.432-9.9 9.9s4.432 9.9 9.9 9.9 9.9-4.432 9.9-9.9-4.432-9.9-9.9-9.9M3.9 12a8.1 8.1 0 1 1 16.2 0 8.1 8.1 0 0 1-16.2 0');
	path.setAttribute('clip-rule', 'evenodd');

	emojiSvg.appendChild(path);

	emojiIcon.appendChild(emojiSvg);
	emojiButton.appendChild(emojiIcon);
	emojiWrap.appendChild(emojiButton);

	return emojiWrap;
}

function postingFooterLangWhatsNew(lang) {
  switch (lang) {
    case 0:
      return "Что у вас нового?";
      break;
    case 1:
      return "Що маєте нового?";
      break;
    case 454:
      return "Що маєте нового?";
      break;
    case 114:
      return "Што ў вас новага?";
      break;
    case 2:
      return "Што ў вас новага?";
      break;
    case 777:
      return "Что у вас нового, товарищ?";
      break;
    case 97:
      return "Сізде не жаңалық?";
      break;
    case 100:
      return "Что у Васѣ новаго?";
      break;
    default:
      return "What's new?";
      break;
  }
}

function postingFooterLangSuggest(lang) {
  switch (lang) {
    case 0:
      return "Предложите новость";
      break;
    case 1:
      return "Запропонуйте новину";
      break;
    case 454:
      return "Запропонуйте новину";
      break;
    case 114:
      return "Прапануйце навіна";
      break;
    case 2:
      return "Прапануйце навіна";
      break;
    case 777:
      return "Предложите новость, товарищ!";
      break;
    case 97:
      return "Жаңалық ұсыныңыз";
      break;
    case 100:
      return "Предложите новасть";
      break;
    default:
      return "Suggest a post";
      break;
  }
}

function postingFooterBlock(isSuggested, onlyOfficial) {
	const getLabel = () => {
		if (onlyOfficial == false) {
			return getLang?.('profile_enter_post') || 'Напишите что-нибудь...';
		}

		if (isSuggested) {
			return postingFooterLangSuggest(vk.lang);
		}

		return postingFooterLangWhatsNew(vk.lang);
	};
	const postFooter = document.createElement('div');
	postFooter.id = 'post_field';
	postFooter.classList.add('submit_post_field');

	postFooter.setAttribute('onkeyup', 'Wall && Wall.postChanged()');
	postFooter.setAttribute('onkeydown', 'onCtrlEnter(event, wall.sendPost)');
	postFooter.setAttribute('onfocus', 'wall && wall.showEditPost()');

	const label = getLabel();

	postFooter.setAttribute('placeholder', label);
	postFooter.setAttribute('contenteditable', 'true');
	postFooter.setAttribute('role', 'textbox');
	postFooter.setAttribute('aria-multiline', 'true');
	postFooter.setAttribute('aria-label', label);

	return postFooter;
}

function postingWarningTooMuchSymbols() {
	const postingWarnOfSymbols = document.createElement('span');
	postingWarnOfSymbols.classList.add('post_field_warning');

	return postingWarnOfSymbols;
}

function postingMediaPreview() {
	const mediaPreview = document.createElement('div');
	mediaPreview.id = 'media_preview';
	mediaPreview.classList.add('clear_fix','media_preview','wall_post_media_preview');

	return mediaPreview;
}

function postingMediaInfo() {
	const mediaInfo = document.createElement('div');
	mediaInfo.id = 'media_info';
	mediaInfo.classList.add('media_info');

	return mediaInfo;
};

function postingActionButtons(isUser, isMyWall) {
	const postingActionButtonsList = document.createElement('div');
	postingActionButtonsList.classList.add('post_actions_btns');
	postingActionButtonsList.id = 'post_actions_btns';

	if (isUser && isMyWall) {
		const postingButtonFriends = document.createElement('div');
		postingButtonFriends.classList.add('post_action_btn','post_available');
		postingButtonFriends.id = 'post_visibility_btn';
		const postingActionsBtnsLayout = document.createElement('div');
		postingActionsBtnsLayout.classList.add('post_action_btn_layout');

		postingActionsBtnsLayout.append(
			actionButtonText(),
			actionButtonImageBefore(),
			actionDropdown()
		);
		postingButtonFriends.appendChild(postingActionsBtnsLayout);

		postingActionButtonsList.appendChild(postingButtonFriends);
	}

	return postingActionButtonsList;
}

function actionButtonTextLang(lang) {
  switch (lang) {
    case 0:
      return "Видно всем";
      break;
    case 1:
      return "Видно всім";
      break;
    case 454:
      return "Видно всім";
      break;
    case 114:
      return "Відаць усім";
      break;
    case 2:
      return "Відаць усім";
      break;
    case 777:
      return "Видно всем";
      break;
    case 97:
      return "Барлығына көрінеді";
      break;
    case 100:
      return "Видно ​всѣмъ​";
      break;
    default:
      return "Visible to everyone";
      break;
  }
}

function actionButtonText() {
	const buttonText = document.createElement('span');
	buttonText.classList.add('post_action_btn_text');
	buttonText.setAttribute('role', 'button');
	buttonText.setAttribute('aria-label', actionButtonTextLang(vk.lang));
	buttonText.textContent = actionButtonTextLang(vk.lang);

	return buttonText;
}

function actionButtonImageBefore() {
	const buttonImageBefore = document.createElement('span');
	buttonImageBefore.classList.add('post_action_image_btn');

	const buttonImageSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	buttonImageSVG.setAttribute('height', '8');
	buttonImageSVG.setAttribute('width', '12');
	buttonImageSVG.setAttribute('viewBox', '0 0 12 8');
	buttonImageSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	buttonImageSVG.setAttribute('fill', 'currentColor');

	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('clip-rule', 'evenodd');
	path.setAttribute('d', 'M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z');
	path.setAttribute('fill', 'currentColor');
	path.setAttribute('fill-rule', 'evenodd');

	buttonImageSVG.appendChild(path);

	buttonImageBefore.appendChild(buttonImageSVG);

	return buttonImageBefore;
}

function postingActionDropdownLangFriends(lang) {
  switch (lang) {
    case 0:
      return "Видно друзьям";
      break;
    case 1:
      return "Видно друзям";
      break;
    case 454:
      return "Видно друзям";
      break;
    case 114:
      return "Відаць сябрам";
      break;
    case 2:
      return "Відаць сябрам";
      break;
    case 777:
      return "Видно товарищам";
      break;
    case 97:
      return "Достарға көрінеді";
      break;
    case 100:
      return "Видно друзьямъ";
      break;
    default:
      return "Visible to friends";
      break;
  }
}

function actionDropdown() {
	const actionDropdownElement = document.createElement('div');
	actionDropdownElement.classList.add('post_action_tt_content');
	actionDropdownElement.id = 'post_visibility_tt_content';

	actionDropdownElement.append(
		dropdownActionSingle({
			id: 'no_friends_only',
			value: 0,
			checked: true,
			label: actionButtonTextLang(vk.lang),
			onclick: `Wall.togglePostVisibilityAccess(event.target, 0, '')`,
		}),
		dropdownActionSingle({
			id: 'friends_only',
			value: 1,
			checked: false,
			label: postingActionDropdownLangFriends(vk.lang),
			onclick: `Wall.togglePostVisibilityAccess(event.target, 1, '')`,
		}),
		dropdownActionSingle({
			id: 'best_friends_only',
			value: 2,
			checked: false,
			label: bestFriendsDropdown(),
			onclick: `Wall.togglePostVisibilityAccess(event.target, 2, '')`,
		})
	);

	return actionDropdownElement;
}

function dropdownActionSingle({ id, value, checked, label, onclick }) {
	const dropdownActionSingleElement = document.createElement('div');
	dropdownActionSingleElement.classList.add('FancyElementTT__item','radiobtn');
	dropdownActionSingleElement.role = 'radio';
	dropdownActionSingleElement.setAttribute('data-value', String(value));
	dropdownActionSingleElement.setAttribute('aria-checked', checked ? '1' : '');

	if (onclick) {
		dropdownActionSingleElement.setAttribute('onclick', onclick);
	}

	if (id) {
		dropdownActionSingleElement.id = id;
		dropdownActionSingleElement.classList.add(`name_${id}`);
		dropdownActionSingleElement.setAttribute('name', id);
	}

	if (typeof label === 'string') {
		dropdownActionSingleElement.setAttribute('aria-label', label);
	}

	if (checked) {
		dropdownActionSingleElement.classList.add('on');

		const checkedIcon = document.createElement('span');
		checkedIcon.classList.add('FancyElementTT__checkIcon');

		const checkedIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		checkedIconSVG.classList.add('vkuiIcon', 'vkuiIcon--16', 'vkuiIcon--w-16', 'vkuiIcon--h-16', 'vkuiIcon--check_outline_16');
		checkedIconSVG.setAttribute('width', '16');
		checkedIconSVG.setAttribute('height', '16');
		checkedIconSVG.setAttribute('viewBox', '0 0 16 16');
		checkedIconSVG.style.width = '16px';
		checkedIconSVG.style.height = '16px';
		checkedIconSVG.setAttribute('fill', 'currentColor');

		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('fill-rule', 'evenodd');
		path.setAttribute('d', 'M12.782 4.721a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 0 1-1.06 0l-2.502-2.5A.75.75 0 0 1 4.28 8.22l1.971 1.97 5.47-5.469a.75.75 0 0 1 1.06 0Z');
		path.setAttribute('clip-rule', 'evenodd');
		path.setAttribute('fill', 'currentColor');

		checkedIconSVG.appendChild(path);
		checkedIcon.appendChild(checkedIconSVG);

		dropdownActionSingleElement.appendChild(checkedIcon);
	}

	const dropdownActionSingleElementText = document.createElement('div');
	dropdownActionSingleElementText.classList.add('FancyElementTT__itemLabel');

	if (typeof label === 'string') {
		dropdownActionSingleElementText.textContent = label;
	} else if (label instanceof HTMLElement) {
		dropdownActionSingleElementText.appendChild(label);
	}

	dropdownActionSingleElement.appendChild(dropdownActionSingleElementText);

	return dropdownActionSingleElement;
}

function bestFriendsDropdown() {
	const bestFriendsDropdownElement = document.createElement('div');
	bestFriendsDropdownElement.classList.add('PostVisibilityBestFriendsOnlyOption');

	const bfDropdownElementText = document.createTextNode(getLang?.('wall_best_friends_only') || 'Для близких друзей');

	const bfEditList = document.createElement('span');
	bfEditList.classList.add('PostVisibilityBestFriendsOnlyOption__info');

	const editLink = document.createElement('span');
	editLink.classList.add('PostVisibilityBestFriendsOnlyOption__editLink');
	editLink.setAttribute('role', 'button');
	editLink.textContent = getLang?.('global_edit') || 'Редактировать';

	bfEditList.appendChild(editLink);

	bestFriendsDropdownElement.appendChild(bfDropdownElementText);
	bestFriendsDropdownElement.appendChild(bfEditList);

	return bestFriendsDropdownElement;
}

function postingSubmitBlock(isGroup, isSuggested, onlyOfficial) {
	const postingSubmitBlockElement = document.createElement('div');
	postingSubmitBlockElement.id = 'submit_post';
	postingSubmitBlockElement.classList.add('submit_post','clear_fix');
	postingSubmitBlockElement.setAttribute(
		'onclick',
		"if(domClosest('article_snippet', event.target)) return;event.cancelBubble=true;"
	);

	postingSubmitBlockElement.append(postingButtonPost(isSuggested), postingSettingsDropdown(isGroup, isSuggested, onlyOfficial));

	if (isSuggested) {
		postingSubmitBlockElement.appendChild(clubPostingSignSettings());
	}

	const msItems = document.createElement('div');
	msItems.id = 'page_add_media';
	msItems.classList.add('page_add_media');
	msItems.setAttribute('onclick', 'wall && wall.showEditPost()');
	postingSubmitBlockElement.appendChild(msItems);

	return postingSubmitBlockElement;
}

function clubPostingSignSettingsLang(lang) {
  switch (lang) {
    case 0:
      return "Убирать подпись при редактировании записи";
      break;
    case 1:
      return "Прибирати підпис під час редагування запису";
      break;
    case 454:
      return "Прибирати підпис під час редагування запису";
      break;
    case 114:
      return "Прыбіраць подпіс пры рэдагаванні запісу";
      break;
    case 2:
      return "Прыбіраць подпіс пры рэдагаванні запісу";
      break;
    case 777:
      return "Убирать подпись при редактировании записи";
      break;
    case 97:
      return "Жазбаны өңдеу кезінде қолтаңбаны алып тастаңыз";
      break;
    case 100:
      return "Убирать подпись при редактированіи записи";
      break;
    default:
      return "Remove signature when editing a post";
      break;
  }
}

function clubPostingSignSettings() {
	const signSettingElement = document.createElement('div');
	signSettingElement.classList.add('checkbox_pic','check_sign_pic','PostOption');
	signSettingElement.id = 'check_sign';
	signSettingElement.setAttribute('onclick', 'Wall && Wall.saveCheckSign(this)');
	signSettingElement.setAttribute('onmouseover', 'showTitle(this, false, [10,10], {noZIndex: true});');
	signSettingElement.setAttribute('role', 'checkbox');
	signSettingElement.setAttribute('aria-checked', 'false');
	signSettingElement.setAttribute('tabindex', '0');
	signSettingElement.setAttribute('data-title', getLang?.('wall_check_sign_disabled') || 'Подпись останется при редактировании записи');
	signSettingElement.setAttribute('aria-label', getLang?.('wall_check_sign_enabled') || 'Подпись будет скрыта при редактировании записи');

	const signHint = document.createElement('span');
	signHint.classList.add('blind_label');
	signHint.textContent = clubPostingSignSettingsLang(vk.lang);

	const signIcon = document.createElement('span');
	signIcon.classList.add('PostOption__iconWrapper');
	
	const signIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	signIconSVG.setAttribute('height', 20);
	signIconSVG.setAttribute('width', 20);
	signIconSVG.setAttribute('viewBox', '0 0 20 20');
	signIconSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	signIconSVG.setAttribute('fill', 'currentColor');

	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute(
		'd',
		'M12.5 5C12.5 3.61859 11.3814 2.5 10 2.5C8.61859 2.5 7.5 3.61859 7.5 5C7.5 6.38141 8.61859 7.5 10 7.5C11.3814 7.5 12.5 6.38141 12.5 5ZM14 5C14 7.20984 12.2098 9 10 9C7.79016 9 6 7.20984 6 5C6 2.79016 7.79016 1 10 1C12.2098 1 14 2.79016 14 5ZM4 15.5C4 16.2152 4.35765 16.5 5 16.5H15C15.6423 16.5 16 16.2152 16 15.5C16 13.1666 13.4334 12 10 12C6.56661 12 4 13.1666 4 15.5ZM2.5 15.5C2.5 12.0152 5.83339 10.5 10 10.5C14.1666 10.5 17.5 12.0152 17.5 15.5C17.5 17.1283 16.4053 18 15 18H5C3.59467 18 2.5 17.1283 2.5 15.5Z'
	);
	path.setAttribute('fill', 'currentColor');

	signIconSVG.appendChild(path);

	signIcon.appendChild(signIconSVG);


	signSettingElement.append(signHint, signIcon);

	return signSettingElement;
}

function postingButtonPostSuggestLang(lang) {
    switch (lang) {
    case 0:
      return "Предложить новость";
      break;
    case 1:
      return "Запропонувати новину";
      break;
    case 454:
      return "Запропонувати новину";
      break;
    case 114:
      return "Прапанаваць навіна";
      break;
    case 2:
      return "Прапанаваць навіна";
      break;
    case 777:
      return "Предложить новость";
      break;
    case 97:
      return "Жаңалық ұсыныңыз";
      break;
    case 100:
      return "Предложить новасть";
      break;
    default:
      return "Suggest a post";
      break;
  }
}

function postingButtonPost(isSuggested) {
	const postingButtonPostElement = document.createElement('div');
	postingButtonPostElement.classList.add('addpost_button_wrap');

	const postingButtonPostButton = document.createElement('button');
	postingButtonPostButton.classList.add('FlatButton','FlatButton--primary','FlatButton--size-m','addpost_button');
	postingButtonPostButton.type = 'button';
	postingButtonPostButton.id = 'send_post';
	postingButtonPostButton.setAttribute('onclick', 'wall.sendPost()');

	const postingButtonPostInner = document.createElement('span');
	postingButtonPostInner.classList.add('FlatButton__in');

	const postingButtonPostText = document.createElement('span');
	postingButtonPostText.classList.add('FlatButton__content');
	postingButtonPostText.textContent = isSuggested ? postingButtonPostSuggestLang(vk.lang) : (getLang?.('global_post') || 'Опубликовать');

	postingButtonPostInner.appendChild(postingButtonPostText);
	postingButtonPostButton.appendChild(postingButtonPostInner);
	postingButtonPostElement.appendChild(postingButtonPostButton);

	return postingButtonPostElement;
}

function postingSettingsDropdown(isGroup, isSuggested, onlyOfficial) {
	const postingSettingsDropdownElement = document.createElement('div');
	postingSettingsDropdownElement.classList.add('post_settings','PostSettings');
	postingSettingsDropdownElement.id = 'post_settings_btn';

	if (!isSuggested) {
		postingSettingsDropdownElement.appendChild(postingButtonWithDD());
	}

	postingSettingsDropdownElement.appendChild(postingButtonSettingsList(isGroup, onlyOfficial));

	return postingSettingsDropdownElement;
}

function postingButtonWithDDLang(lang) {
    switch (lang) {
    case 0:
      return "Настройки публикации";
      break;
    case 1:
      return "Налаштування публікації";
      break;
    case 454:
      return "Налаштування публікації";
      break;
    case 114:
      return "Налады публікацыі";
      break;
    case 2:
      return "Налады публікацыі";
      break;
    case 777:
      return "Настройки публикации";
      break;
    case 97:
      return "Жариялау параметрлері";
      break;
    case 100:
      return "Настройки публикаціи";
      break;
    default:
      return "Publishing settings";
      break;
  }
}

function postingButtonWithDD() {
	const postingButtonWithDDElement = document.createElement('span');
	postingButtonWithDDElement.setAttribute('onmouseover', 'Wall && Wall.showPostSettings(this, event);');
	postingButtonWithDDElement.id = 'post_button_gear_settings';
	postingButtonWithDDElement.classList.add('PostOption','PostSettings__gear');
	postingButtonWithDDElement.setAttribute('role', 'button');
	postingButtonWithDDElement.setAttribute('tabindex', '0');
	postingButtonWithDDElement.setAttribute('aria-label', postingButtonWithDDLang(vk.lang));

	const postingButtonWithDDIcon = document.createElement('span');
	postingButtonWithDDIcon.classList.add('PostOption__iconWrapper');
	postingButtonWithDDIcon.id = 'post_icon_gear_settings';
	
	const postingButtonWithDDSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	postingButtonWithDDSVG.setAttribute('height', 20);
	postingButtonWithDDSVG.setAttribute('width', 20);
	postingButtonWithDDSVG.style.width = '20px';
	postingButtonWithDDSVG.style.height = '20px';
	postingButtonWithDDSVG.setAttribute('viewBox', '0 0 20 20');
	postingButtonWithDDSVG.setAttribute('fill', 'currentColor');
	postingButtonWithDDSVG.classList.add('vkuiIcon', 'vkuiIcon--20', 'vkuiIcon--w-20', 'vkuiIcon--h-20', 'vkuiIcon--gear_outline_20');

	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('fill-rule', 'evenodd');
	path.setAttribute(
		'd',
		'M7.22176 3.37826L7.2313 3.34537C7.2754 3.1953 7.32478 3.05406 7.37982 2.92175C7.38717 2.90408 7.39463 2.88656 7.40218 2.86921C7.75981 2.04778 8.34587 1.58432 9.25627 1.50926L9.42194 1.5L10.6305 1.50075C11.6814 1.53329 12.3649 2.10837 12.7252 3.19249L12.7823 3.37788L12.8264 3.54386C12.8425 3.60779 12.8625 3.67585 12.8859 3.74653L12.9358 3.88444L12.9654 3.89915L13.0254 3.87942L13.1417 3.83513L13.2773 3.77643C13.3338 3.75028 13.3897 3.72555 13.4449 3.70226L13.4812 3.68716C13.6052 3.63607 13.7262 3.59225 13.8444 3.55576C13.8648 3.54948 13.885 3.54342 13.9052 3.53758C14.8374 3.26744 15.5903 3.4618 16.2244 4.15476L16.3333 4.28009L17.0469 5.15975C17.6829 5.99255 17.6636 6.88269 17.0432 7.84345L16.9343 8.00423L16.8324 8.14281C16.7917 8.1966 16.7502 8.25622 16.7089 8.32028L16.6473 8.41954L16.618 8.46922L16.6215 8.48653L16.7013 8.53886L16.8114 8.60499L16.9448 8.67711C18.1535 9.29057 18.6523 10.0973 18.4599 11.218L18.4277 11.3803L18.2153 12.296C18.0777 12.8887 17.9697 13.1692 17.5446 13.5542C17.237 13.8328 16.8971 13.9895 16.4863 14.0725L16.4753 14.0747C16.3379 14.1019 16.1926 14.121 16.038 14.1338L15.8466 14.1461L15.674 14.1516C15.6571 14.1519 15.6399 14.1524 15.6224 14.1531L15.6163 14.1533C15.5663 14.1553 15.5139 14.1589 15.4598 14.1639L15.3025 14.1824L15.3139 14.3057L15.3255 14.3886L15.3536 14.5432C15.4221 14.8646 15.4551 15.1606 15.4515 15.4326L15.4514 15.4447C15.437 16.2843 15.0719 16.8944 14.32 17.3141L14.1727 17.3914L13.1504 17.8852C12.2487 18.2885 11.4277 18.119 10.6664 17.4179C10.644 17.3972 10.6215 17.3761 10.5992 17.3545C10.5734 17.3296 10.5477 17.304 10.5221 17.2779L10.3891 17.1362L10.2762 17.0062C10.2322 16.9542 10.1826 16.9 10.1285 16.845L10.0442 16.7621L10.001 16.7223L9.92123 16.7978L9.82987 16.8913L9.72749 17.0062C8.89874 17.9873 8.02405 18.3395 6.96387 17.9293L6.81114 17.8655L5.89632 17.4233L5.62456 17.285C5.21034 17.0601 4.9779 16.8446 4.75075 16.3675C4.595 16.0404 4.53387 15.7171 4.54221 15.3561L4.54262 15.3405C4.54801 15.1519 4.57214 14.953 4.61147 14.7379L4.65012 14.5432L4.65108 14.5387C4.66452 14.475 4.6763 14.4061 4.68618 14.3334L4.70212 14.185L4.69864 14.1816L4.60843 14.1696L4.48097 14.1582L4.32967 14.1516C4.0124 14.1459 3.72535 14.1138 3.46764 14.0539L3.45635 14.0512C2.6186 13.8534 2.09275 13.3603 1.84763 12.5266L1.80499 12.3665L1.55128 11.2647C1.34675 10.239 1.75641 9.4473 2.73744 8.85424L2.90622 8.75723L3.0589 8.67711C3.11874 8.64674 3.18179 8.61152 3.24666 8.57227L3.38132 8.4848L3.3848 8.46835L3.33038 8.37499L3.26006 8.26667L3.17133 8.14281C3.13254 8.09155 3.09539 8.0406 3.05988 7.98994C2.9962 7.89912 2.9378 7.80924 2.88468 7.72024C2.34416 6.81451 2.35129 5.99911 2.93068 5.19712L3.0313 5.06512L3.74805 4.18795C4.43486 3.39611 5.31429 3.2298 6.38816 3.63354L6.56894 3.7061L6.72642 3.77643C6.78566 3.80386 6.85049 3.83088 6.91948 3.85693L7.03745 3.89829L7.06877 3.88358L7.09803 3.80687L7.13726 3.68749L7.17731 3.54386C7.19147 3.48754 7.20628 3.43234 7.22176 3.37826ZM11.4623 4.21897C11.4665 4.23163 11.4708 4.24424 11.4754 4.25678L11.5253 4.39469C11.6565 4.75748 11.9225 5.05575 12.2679 5.22753L12.2975 5.24225C12.6508 5.41792 13.059 5.44734 13.4338 5.32413L13.4939 5.3044C13.5159 5.29716 13.5378 5.2894 13.5594 5.28114L13.6757 5.23685C13.6965 5.22893 13.7171 5.22055 13.7375 5.21172L13.8731 5.15302C13.8847 5.14803 13.8961 5.14289 13.9075 5.1376C13.9489 5.11847 13.9888 5.10082 14.0274 5.08456C14.138 5.03794 14.2362 5.00337 14.3227 4.9783C14.5914 4.90042 14.7298 4.91843 14.7935 4.93526C14.8501 4.95021 14.9536 4.99136 15.1067 5.15546L15.1843 5.24479L15.8658 6.08472C16.0036 6.26993 16.0166 6.38018 16.0162 6.44399C16.0157 6.52789 15.9867 6.7108 15.7911 7.01732L15.7087 7.13886L15.6293 7.24692C15.5656 7.33163 15.505 7.41942 15.4481 7.50772L15.4349 7.52853L15.3732 7.62779L15.3652 7.64086L15.3543 7.65916L15.3251 7.70883C15.138 8.02696 15.0747 8.40289 15.1474 8.76471L15.1509 8.78202C15.2299 9.17529 15.4632 9.52053 15.7986 9.74061L15.8783 9.79295C15.895 9.80387 15.9118 9.81447 15.9289 9.82473L16.039 9.89085C16.0585 9.90256 16.0782 9.91382 16.0982 9.92462L16.2317 9.99674C16.243 10.0029 16.2544 10.0088 16.2659 10.0147C16.7224 10.2464 16.8858 10.4364 16.9424 10.5306C16.9782 10.5901 17.0255 10.6925 16.9842 10.9481L16.961 11.0647L16.7541 11.9571C16.6878 12.2424 16.6587 12.3072 16.6494 12.3257C16.6494 12.3257 16.6481 12.329 16.6399 12.3392C16.629 12.3527 16.6009 12.3851 16.5377 12.4424C16.4564 12.516 16.3718 12.566 16.1836 12.6033C16.115 12.6169 16.0311 12.6289 15.9269 12.6378L15.7744 12.6477L15.6356 12.6521L15.5645 12.6542C15.4836 12.6573 15.4024 12.6628 15.322 12.6702C15.3093 12.6714 15.2967 12.6727 15.2841 12.6742L15.1267 12.6928C14.3184 12.7881 13.7336 13.5107 13.8089 14.3212L13.8203 14.4444C13.8225 14.4676 13.8252 14.4907 13.8284 14.5137L13.84 14.5966C13.8428 14.6166 13.846 14.6366 13.8496 14.6565L13.8777 14.8112C13.8804 14.8261 13.8834 14.841 13.8865 14.8558C13.9369 15.0921 13.9535 15.2748 13.9517 15.413C13.949 15.6191 13.9064 15.7145 13.8785 15.761C13.8508 15.8071 13.7852 15.8923 13.6029 15.9964L13.4977 16.0517L12.5212 16.5232C12.3173 16.6115 12.2039 16.6052 12.1395 16.5928C12.0627 16.578 11.9107 16.5247 11.6826 16.3145C11.6569 16.2909 11.6305 16.2655 11.6033 16.2381L11.5027 16.1308L11.4146 16.0294C11.3453 15.9478 11.2722 15.8687 11.1977 15.793L11.1802 15.7755L11.0959 15.6926C11.0842 15.6811 11.0723 15.6697 11.0602 15.6586L11.017 15.6188C10.437 15.0848 9.54259 15.091 8.96997 15.6328L8.89022 15.7083C8.87605 15.7217 8.86214 15.7354 8.8485 15.7494L8.75713 15.8428C8.74097 15.8594 8.72518 15.8763 8.7098 15.8936L8.60742 16.0085C8.59869 16.0183 8.59009 16.0282 8.58162 16.0382C8.26729 16.4103 8.04995 16.5341 7.93629 16.5739C7.8632 16.5995 7.75271 16.6232 7.52056 16.5363L7.42705 16.4972L6.56296 16.0795L6.32484 15.9583C6.26624 15.926 6.23252 15.9042 6.21307 15.8904C6.20303 15.8833 6.19728 15.8786 6.19451 15.8763C6.19192 15.8741 6.19077 15.8729 6.19077 15.8729C6.19077 15.8729 6.18977 15.8719 6.18781 15.8695C6.18578 15.8669 6.18151 15.8614 6.17503 15.8516C6.16171 15.8315 6.13834 15.7925 6.10507 15.7227C6.05964 15.6272 6.03757 15.5386 6.04201 15.3833C6.04459 15.293 6.05668 15.1758 6.08513 15.018L6.11961 14.8444C6.14108 14.7421 6.15852 14.6384 6.17249 14.5357C6.17439 14.5217 6.1761 14.5077 6.17761 14.4936L6.19354 14.3452C6.24216 13.8926 6.08258 13.4423 5.75974 13.1214L5.75626 13.1179C5.52369 12.8867 5.22175 12.738 4.89666 12.6947L4.80645 12.6827C4.78494 12.6798 4.76336 12.6774 4.74174 12.6755L4.61428 12.6641C4.5917 12.6621 4.56907 12.6606 4.54643 12.6596L4.39513 12.653C4.38231 12.6525 4.36948 12.6521 4.35665 12.6518C4.1222 12.6476 3.94253 12.6243 3.80703 12.5928C3.59247 12.5429 3.50228 12.4769 3.46085 12.4379C3.42088 12.4003 3.3522 12.3185 3.29134 12.119L3.26103 12.0051L3.01886 10.9534C2.97695 10.7287 3.01336 10.6243 3.0423 10.5663C3.08043 10.4898 3.18847 10.3367 3.50083 10.1456L3.62874 10.0721L3.74798 10.0095C3.84162 9.96161 3.93388 9.90966 4.02319 9.85562C4.03685 9.84736 4.05037 9.83888 4.06376 9.83018L4.19842 9.74271C4.53228 9.52584 4.76623 9.18516 4.84874 8.79571L4.85223 8.77926C4.92944 8.41485 4.86829 8.03474 4.68069 7.71292L4.62626 7.61956C4.61419 7.59885 4.60162 7.57842 4.58856 7.55831L4.51825 7.44999C4.50574 7.43071 4.49279 7.41173 4.4794 7.39304L4.39067 7.26919C4.38308 7.2586 4.37535 7.24811 4.36749 7.23772C4.06016 6.83156 3.9982 6.59144 3.98901 6.48421C3.98322 6.41664 3.98539 6.30313 4.13715 6.08871L4.20887 5.99461L4.89325 5.15707C5.04688 4.98428 5.15513 4.94599 5.22388 4.93191C5.31225 4.91381 5.50255 4.90523 5.84644 5.03243L5.98353 5.08745L6.10656 5.1424C6.19952 5.1851 6.29471 5.2244 6.38973 5.26027C6.40084 5.26446 6.412 5.26852 6.4232 5.27245L6.54117 5.31381C6.91213 5.44387 7.31932 5.42311 7.67512 5.256L7.70645 5.24128C8.05803 5.07615 8.33185 4.78108 8.47028 4.41815L8.49954 4.34144C8.5079 4.31952 8.51575 4.29741 8.52307 4.27512L8.5623 4.15574C8.5694 4.13412 8.57602 4.11233 8.58213 4.09041L8.62218 3.94678C8.62563 3.9344 8.62893 3.92198 8.63206 3.90953C8.64241 3.86835 8.65301 3.8289 8.66383 3.79111C8.70048 3.66307 8.739 3.55638 8.77749 3.46798C8.87742 3.23844 8.96892 3.14896 9.01982 3.11092C9.06389 3.07799 9.15434 3.02511 9.36308 3.00563L9.46335 3.00003L10.603 3.00074C10.8374 3.01092 10.9357 3.07138 10.9885 3.11448C11.0562 3.16969 11.1809 3.30857 11.297 3.65151L11.3401 3.7915L11.3745 3.92077C11.4001 4.02129 11.4299 4.12133 11.4623 4.21897Z'
	);
	path.setAttribute('clip-rule', 'evenodd');
	
	const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path2.setAttribute('fill-rule', 'evenodd');
	path2.setAttribute(
		'd',
		'M10 11.5C10.8284 11.5 11.5 10.8284 11.5 10C11.5 9.17157 10.8284 8.5 10 8.5C9.17157 8.5 8.5 9.17157 8.5 10C8.5 10.8284 9.17157 11.5 10 11.5ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z'
	);
	path2.setAttribute('clip-rule', 'evenodd');

	postingButtonWithDDSVG.append(path,path2);

	
	postingButtonWithDDIcon.appendChild(postingButtonWithDDSVG);

	postingButtonWithDDElement.appendChild(postingButtonWithDDIcon);

	return postingButtonWithDDElement;
}

function postingButtonSettingsListSignLang(lang) {
  switch (lang) {
    case 0:
      return "Подпись";
      break;
    case 1:
      return "Підпис";
      break;
    case 454:
      return "Підпис";
      break;
    case 114:
      return "Подпіс";
      break;
    case 2:
      return "Подпіс";
      break;
    case 777:
      return "Подпись";
      break;
    case 97:
      return "Қолтаңба";
      break;
    case 100:
      return "Подпись";
      break;
    default:
      return "Signature";
      break;
  }
}

function postingButtonSettingsListNotifyLang(lang) {
  switch (lang) {
    case 0:
      return "Не отправлять уведомления";
      break;
    case 1:
      return "Не надсилати повідомлення";
      break;
    case 454:
      return "Не надсилати повідомлення";
      break;
    case 114:
      return "Не адпраўляць апавяшчэння";
      break;
    case 2:
      return "Не адпраўляць апавяшчэння";
      break;
    case 777:
      return "Не отправлять извещения";
      break;
    case 97:
      return "Хабарландыруларды жібермеңіз";
      break;
    case 100:
      return "Не отправлять увѣдомленія ";
      break;
    default:
      return "Don't send notification";
      break;
  }
}

function postingButtonSettingsList(isGroup, onlyOfficial) {
	const postingButtonSettingsListElement = document.createElement('div');
	postingButtonSettingsListElement.classList.add('_post_settings_items');

	const closeComments = document.createElement('div');
	closeComments.classList.add('checkbox');
	closeComments.id = 'close_comments';
	closeComments.setAttribute('onclick', 'checkbox(this)');
	closeComments.textContent = getLang?.('wall_closing_comments') || 'Выключить комментарии';
	postingButtonSettingsListElement.appendChild(closeComments);

	if (isGroup) {
		const signCheckBox = document.createElement('div');
		signCheckBox.classList.add('checkbox');
		signCheckBox.id = 'signed';
		signCheckBox.setAttribute('onclick', 'checkbox(this); Wall && Wall.postChanged(true);');
		signCheckBox.textContent = postingButtonSettingsListSignLang(vk.lang);
		postingButtonSettingsListElement.appendChild(signCheckBox);
	}

	const silentMode = document.createElement('div');
	silentMode.classList.add('checkbox');
	silentMode.id = 'mute_notifications';
	silentMode.setAttribute('onclick', 'checkbox(this)');
	silentMode.textContent = postingButtonSettingsListNotifyLang(vk.lang);
	postingButtonSettingsListElement.appendChild(silentMode);
	
	if (onlyOfficial == false) {
		const official = document.createElement('div');
		official.className = 'checkbox on';
		official.id = 'official';
		official.setAttribute('onclick', 'Wall && Wall.checkAsGroup(this)');
		official.setAttribute('role', 'checkbox');
		official.setAttribute('aria-checked', 'true');
		official.setAttribute('tabindex', '0');
		official.setAttribute('aria-label', getLang?.('global_on_behalf_group') || 'От имени сообщества');
		official.textContent = getLang?.('global_on_behalf_group') || 'От имени сообщества';
		postingButtonSettingsListElement.prepend(official);
	}

	postingButtonSettingsListElement.append(postingSettingsOptionAds());

	return postingButtonSettingsListElement;
}

function postingSettingsOptionAds() {
	const postingSettingsOptionAdsElement = document.createElement('a');
	postingSettingsOptionAdsElement.classList.add('Post__copyrightButton');
	postingSettingsOptionAdsElement.id = 'ads_ord_mini_app_option';
	postingSettingsOptionAdsElement.setAttribute('onclick', 'Wall && Wall.openMarkAsAdsOrdMiniApp(this)');

	const adsORD = document.createElement('input');
	adsORD.type = 'hidden';
	adsORD.name = 'ord_pred_id';
	postingSettingsOptionAdsElement.appendChild(adsORD);

	const adsERID = document.createElement('input');
	adsERID.type = 'hidden';
	adsERID.name = 'erid';
	postingSettingsOptionAdsElement.appendChild(adsERID);

	const postingSettingsOptionAdsIcon_false = postingSettingsOptionAdsIcon(false);
	postingSettingsOptionAdsIcon_false.classList.add('withoutAds');
	postingSettingsOptionAdsElement.appendChild(postingSettingsOptionAdsIcon_false);

	const postingSettingsOptionAdsIcon_true = postingSettingsOptionAdsIcon(true);
	postingSettingsOptionAdsIcon_true.classList.add('withAds');
	postingSettingsOptionAdsElement.appendChild(postingSettingsOptionAdsIcon_true);

	const postingSettingsOptionAdsText_false = document.createElement('span');
	postingSettingsOptionAdsText_false.classList.add('Post__copyrightButtonText','withoutAds');
	postingSettingsOptionAdsText_false.textContent = getLang?.('global_ads_wall_post_ord_mark_as_ads') || 'Отметить рекламу';
	postingSettingsOptionAdsElement.appendChild(postingSettingsOptionAdsText_false);

	const postingSettingsOptionAdsText_true = document.createElement('span');
	postingSettingsOptionAdsText_true.classList.add('Post__copyrightButtonText','withAds');
	postingSettingsOptionAdsText_true.textContent = getLang?.('global_ads_wall_post_ord_mark_as_ads_activated') || 'Изменить отметку о рекламе';
	postingSettingsOptionAdsElement.appendChild(postingSettingsOptionAdsText_true);

	return postingSettingsOptionAdsElement;
}

function postingSettingsOptionAdsIcon(isChecked) {
	const adsIconSpan = document.createElement('span');
	adsIconSpan.className = 'Post__copyrightButtonIcon';

	const adsIconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	let colorOf = !isChecked ? "#99A2AD" : "#2688EB";
	adsIconSVG.setAttribute('fill', 'currentColor');
	adsIconSVG.setAttribute('viewBox', '0 0 20 20');
	adsIconSVG.setAttribute('width', '20');
	adsIconSVG.setAttribute('height', '20');

	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('fill-rule', 'evenodd');
	path.setAttribute('clip-rule', 'evenodd');
	path.setAttribute('d', 'M16.7915 4.01939C16.5694 3.96923 16.3302 4.00474 16.1214 4.13996L16.1155 4.14379L12.4837 6.44796V12.6417L16.1214 14.9441C16.2654 15.0374 16.4312 15.0862 16.5994 15.0862C16.8434 15.0862 17.0659 14.9865 17.2308 14.8188C17.3959 14.6508 17.4993 14.4179 17.4993 14.1564V4.92767C17.4993 4.74784 17.4488 4.57273 17.3551 4.423C17.2192 4.20587 17.0138 4.06959 16.7915 4.01939ZM10.9837 12.57V6.51406H5.46234C4.64877 6.51406 3.91068 6.84852 3.37259 7.39596C2.83426 7.94365 2.5 8.70113 2.5 9.54205C2.5 10.383 2.83426 11.1405 3.37259 11.6881C3.86233 12.1864 4.51759 12.5078 5.24307 12.5619C5.31534 12.5673 5.38846 12.57 5.46234 12.57H10.9837ZM11.9433 5.0163L15.3083 2.88132C15.8675 2.52037 16.5212 2.42274 17.1224 2.55853C17.7246 2.69453 18.2737 3.06443 18.6272 3.62932C18.8707 4.0184 18.9993 4.46877 18.9993 4.92767V14.1564C18.9993 14.822 18.7334 15.4284 18.3013 15.8679C17.869 16.3077 17.2665 16.5839 16.5994 16.5839C16.1412 16.5839 15.6935 16.4513 15.3087 16.203L11.9351 14.0678H9.63461L9.82209 15.1094C9.9433 15.7828 9.77323 16.4407 9.40491 16.9559C9.03681 17.4709 8.46923 17.8461 7.79434 17.9627C7.11975 18.0792 6.45828 17.9167 5.93614 17.5585C5.41376 17.2002 5.02519 16.6418 4.90405 15.9688L4.5446 13.9719C3.67638 13.7877 2.90236 13.348 2.30205 12.7373C1.49677 11.918 1 10.787 1 9.54205C1 8.29706 1.49677 7.16611 2.30205 6.34684C3.10756 5.52732 4.22565 5.0163 5.46234 5.0163H11.9433ZM6.08591 14.0678L6.38039 15.7038C6.42682 15.9618 6.5752 16.1797 6.78547 16.324C6.99598 16.4684 7.26285 16.5345 7.53866 16.4869C7.81417 16.4393 8.03909 16.2885 8.18399 16.0858C8.32868 15.8834 8.39211 15.6319 8.34575 15.3743L8.11057 14.0678H6.08591Z');
	path.setAttribute('fill', colorOf);

	adsIconSVG.appendChild(path);
	adsIconSpan.appendChild(adsIconSVG);
	return adsIconSpan;
}

function avatarImageInBlock(src = '') {
	const avatarImage = document.createElement('span');
	avatarImage.className = 'AvatarRich AvatarRich--sz-28 AvatarRich--shadow post_field_user_image _post_field_image';
	avatarImage.style.cssText =
		'width: 28px; height: 28px; border-radius: 50%; --avatar-rich-stroke-width: 1.5px; --avatar-rich-nft-frame-width: 2px;';
	avatarImage.setAttribute('aria-hidden', 'true');
	avatarImage.setAttribute(
		'onclick',
		'if (!checkEvent(event)) return nav.go(this, event); event.cancelBubble = true;'
	);

	const avatarBg = document.createElement('div');
	avatarBg.className = 'AvatarRich__background';

	const avatarImg = document.createElement('img');
	avatarImg.src = src;
	avatarImg.alt = '';
	avatarImg.className = 'AvatarRich__img';

	avatarImage.append(avatarBg, avatarImg);

	return avatarImage;
}


