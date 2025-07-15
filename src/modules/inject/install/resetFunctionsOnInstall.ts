import installBoxTitle from "./installBoxTitle";

/*
 * Создал новую функцию с ключом в localStorage(инжект) - добавляй и сюда
 */

const keys = [
  "currentVKID",
  "refreshFeed",
  "nechitalkaValue",
  "nepisalkaValue",
  "pollResultsValue",
  "removePostReactions",
  "videoModal",
  "removeAway",
  "isClassicalProfileDesign",
  "isMiddleName",
  "isOldHover",
  "isDefaultTheme",
  "isOldBadge",
  "old_post_design",
  "customLeftMenuLabels",
  "vk_enhancer_access_token",
  "secretFunctions",
  "isMessageTextUp",
  "feedOldPosts",
  "oldClubs",
  "oldMessengerDes",
  "oldMessengerAttaches",
  "enterProfileGroupID",
  "oldLoader",
  "playlistsClassicalV",
  "createYtPlayer",
  "postInWkLayer",
  "disableStandaloneCheckOnLoadVideo",
  "communitiesOldDesign",
];

const resetFunctionsOnInstall = () => {
  console.log("[VK Tools] Extension installed. Clearing localStorage...");

  keys.forEach((key) => {
    localStorage.removeItem(key);
  });

  let style = `  .questions {
	color:var(--vkui--color_text_primary);
    font-weight: 400;
    font-size:13px;
  }
    .container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content {
      color: var(--vkui--color_text_primary);
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }

    li {
    font-family: var(--vkui--font_text--font_family--regular);
    }

`;
  let x = new showFastBox();
  x.setOptions({
    title: !1,
    bodyStyle: style,
    hideButtons: !0,
  });

  x.content(`  <div class="container">
    <div class="content">
      <h1 class="ui_rmenu_label-text">${installBoxTitle(vk.lang)[0]}</h1>
      <h2 class="ui_rmenu_label-text">${installBoxTitle(vk.lang)[1]}</h2>
	  <ol style="height:80px">
        <li class="fl_l">${installBoxTitle(vk.lang)[2]}</li>
        <li class="fl_l">${installBoxTitle(vk.lang)[3]}</li>
        <li class="fl_l">${installBoxTitle(vk.lang)[4]}</li>
		</ol>
		<div class="images" style="padding:12px;display:flex;flex-wrap: wrap;justify-content: center;"><img style="margin:8px;border-radius:8px;width:90%;height:90%" src="https://vkenhancer.ru/installed1.png"><img style="margin:8px;border-radius:8px;width:90%;height:90%" src="https://vkenhancer.ru/installed2.png"></div>
	  </ol>
	 <h2 class="questions">
	<div class="ui_rmenu_label-text">${installBoxTitle(vk.lang)[5]} <a class="vkuiLink" href="https://vk.me/vkenhancer" target="_blank">${installBoxTitle(vk.lang)[6]}<span aria-hidden="true" class="vkuiTappable__stateLayer--OFlce"></span></a> ${installBoxTitle(vk.lang)[7]}</div>
	</div>
	  <a>
  </h2>
	</div><div class="box_x_button box_x_tabs" onclick="curBox().hide()" aria-label="Закрыть" tabindex="0" role="button"><svg style="color:#fff" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M4.72 4.72c.3-.3.77-.3 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06z" fill="currentColor" fill-rule="evenodd"></path></svg></div>`);
};

export default resetFunctionsOnInstall;
