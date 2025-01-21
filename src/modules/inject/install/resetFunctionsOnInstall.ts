import installBoxTitle from "./installBoxTitle";

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
    "secretFunctions"
];

const resetFunctionsOnInstall = () => {
    console.log('[VK Tools] Extension installed. Clearing localStorage...');
    
    keys.forEach(key => {
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

`
let x = new showFastBox();
    x.setOptions({
        title: !1,
        bodyStyle: style,
        hideButtons: !0
    })

    x.content(`  <div class="container">
    <div class="content">
      <h1 class="ui_rmenu_label-text">Расширение установлено!</h1>
      <h2 class="ui_rmenu_label-text">Для быстрого доступа к настройкам расширения вам нужно закрепить его</h2>
	  <ol style="height:80px">
        <li class="fl_l">Нажмите на иконку пазлов</li>
        <li class="fl_l">Найдите VK Tools в списке расширений</li>
        <li class="fl_l">Нажмите на "булавку"</li>
		</ol>
		<div class="images" style="padding:12px;display:flex;flex-wrap: wrap;justify-content: center;"><img style="margin:8px;border-radius:8px;width:90%;height:90%" src="https://vkenhancer.ru/installed1.png"><img style="margin:8px;border-radius:8px;width:90%;height:90%" src="https://vkenhancer.ru/installed2.png"></div>
	  </ol>
	 <h2 class="questions">
	<div class="ui_rmenu_label-text">Остались вопросы? <a class="vkuiLink" href="https://vk.me/vkenhancer" target="_blank">Напишите нам<span aria-hidden="true" class="vkuiTappable__stateLayer--OFlce"></span></a> и мы постараемся решить их!</div>
	</div>
	  <a>
  </h2>
	</div><div class="box_x_button box_x_tabs" onclick="curBox().hide()" aria-label="Закрыть" tabindex="0" role="button"><svg style="color:#fff" fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M4.72 4.72c.3-.3.77-.3 1.06 0L10 8.94l4.22-4.22a.75.75 0 1 1 1.06 1.06L11.06 10l4.22 4.22a.75.75 0 1 1-1.06 1.06L10 11.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.94 10 4.72 5.78a.75.75 0 0 1 0-1.06z" fill="currentColor" fill-rule="evenodd"></path></svg></div>`)
};

export default resetFunctionsOnInstall;
