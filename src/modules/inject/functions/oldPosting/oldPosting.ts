/* eslint-disable @typescript-eslint/no-unused-expressions */
import showSnackbar from "../../components/snackbar/snackbar";
import deferredCallback from "../../defferedCallback";
import appendRefreshButton from "./appendRefreshButton";
import deferredCallbackNested from "./deferredCallbackNested";
import exportVars from "./exportVars";
import getNearestPost from "./getNearestPost";
import getPostIdFromPost from "./getPostIdFromPost";
import refreshButtonTextLang from "./refreshButtonTextLang";
import styleForEditPost from "./styleForEditPost";

let times = 0;

const oldPosting = () => {
  if (localStorage.getItem("old_post_design") === "true") {
    window.addEventListener("load", (e) => {
      if (localStorage.getItem("old_post_design") === "false") return;
      if (document.querySelector(".PostingReactBlock__root")) {
        if (times < 1) {
          times++;
          console.info("[VK Tools] Failed to enable old post editor. Attempt to turn on (1/1)");
          nav.reload();
          showSnackbar({
            text: refreshButtonTextLang(vk.lang)[0],
            subtitle: refreshButtonTextLang(vk.lang)[3],
            timeout: 4000,
            icon: "warning",
          });
          return;
        }
        console.info("[VK Tools] Failed to enable old post editor. Forcing button");
        showSnackbar({
          text: refreshButtonTextLang(vk.lang)[0],
          subtitle: refreshButtonTextLang(vk.lang)[1],
          timeout: 4000,
          icon: "error",
        });
        let append = document.querySelector(".PostingReactBlock__root");
        if (append) append.appendChild(appendRefreshButton());
        times = 0;
      }
    });

    deferredCallback(
      async (_wall: any) => {
        if (localStorage.getItem("old_post_design") === "false") return;
        styleForEditPost();
      },
      { variable: "vk" }
    );

    deferredCallbackNested(
      () => {
        styleForEditPost();
      },
      { variablePath: "vk.pe" }
    );

    deferredCallback(
      async (_wall: any) => {
        let module = "web/page.js";
        if (!vk.stExcludedMasks) vk.stExcludedMasks = ["loader_nav", "lang", "sw/"];
        await window.stManager.add([window.jsc(module)]);
      },
      { variable: "stManager" }
    );

    deferredCallbackNested(
      (_wall) => {
        if (_wall.isAlreadyOld) return;
        _wall.isAlreadyOld = true;
        let origInit = _wall.init;
        let origWall = _wall;
        _wall.init = async (...n: any) => {
          await exportVars(n[0].wall_oid, n[0].public_link, n[0].loc, n[0].owner, n[0].wall_tpl, n[0]);
          origInit.apply(origWall, n);
        };
      },
      { variablePath: "Wall" }
    );

    document.arrive('[data-testid="post_context_menu_item_edit"]', { existing: true }, (editButton) => {
      let currentPostEdit = document.querySelector(".PostContextMenuReact__root:has([aria-expanded='true'])");
      if (currentPostEdit) {
        let nearestPost = getNearestPost(currentPostEdit as HTMLElement);
        if (nearestPost) {
          let postRaw = getPostIdFromPost(nearestPost as HTMLElement);
          (editButton as HTMLElement).addEventListener("click", (ev: MouseEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
            Wall.editPost(this, postRaw);
          });
        }
      }
    });
  }
};

export default oldPosting;
