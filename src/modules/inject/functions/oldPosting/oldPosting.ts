/* eslint-disable @typescript-eslint/no-unused-expressions */
import deferredCallback from "../../defferedCallback";
import appendRefreshButton from "./appendRefreshButton";
import exportVars from "./exportVars";
import listenWall from "./listenWall";
import refreshButtonTextLang from "./refreshButtonTextLang";
import styleForEditPost from "./styleForEditPost";

let times = 0;

const oldPosting = () => {
    if (localStorage.getItem('old_post_design') === 'true') {
        window.addEventListener('load', (e) => {
            if (localStorage.getItem('old_post_design') === 'false') return;
            if (document.querySelector('.PostingReactBlock__root')) {
                if (times < 1) {
                    console.info('[VK Tools] Failed to enable old post editor. Attempt to turn on (1/1)');
                    nav.reload();
                    window.Notifier.showEvent({
                        title: refreshButtonTextLang(vk.lang)[0],
                        text: refreshButtonTextLang(vk.lang)[3]
                    });
                    return;
                }
                console.info('[VK Tools] Failed to enable old post editor. Forcing button');
                window.Notifier.showEvent({
                    title: refreshButtonTextLang(vk.lang)[0],
                    text: refreshButtonTextLang(vk.lang)[1]
                });
                let append = document.querySelector('.PostingReactBlock__root');
                if (append) append.appendChild(appendRefreshButton());
                times = 0;
            }
        });

        deferredCallback(
            async (_wall: any) => {
	            if(localStorage.getItem('old_post_design') === 'false') return;
                window.vk?.pe && (delete window.vk.pe.posting_web_react_form, delete window.vk.pe.posting_hide_copyright_button_web);
	            styleForEditPost();
            },
            { variable: "vk" }
        );

        deferredCallback(
            (_vk: any) => {
                nav.subscribeOnModuleEvaluated(() => {
                    window.dispatchEvent(new CustomEvent("vkNav"));
                    if(localStorage.getItem('old_post_design') === 'false') return;
                    window.vk?.pe && (delete window.vk.pe.posting_web_react_form,
                    delete window.vk.pe.posting_hide_copyright_button_web);
	                styleForEditPost();
                    console.info('[VK Tools] Navigation event intercepted. Toggles removed');
                });
            },
            { variable: "nav" }
        );

        deferredCallback(
            async (_wall: any) => {
	            let module = "web/page.js";
                await window.stManager.add([window.jsc(module)]);
            },
            { variable: "stManager" }
        );

        listenWall((_wall) => {
            if (_wall.isAlreadyOld) return;
	        _wall.isAlreadyOld = true;
            let origInit = _wall.init;
	        let origWall = _wall;
	        _wall.init = async (...n: any) => {
		        await exportVars(n[0].wall_oid,n[0].public_link,n[0].loc,n[0].owner,n[0].wall_tpl,n[0]);
		        origInit.apply(origWall, n);
            }
        });
    }
}

export default oldPosting;