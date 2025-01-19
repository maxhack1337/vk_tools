import fromId from "../../../content/fromId";
import create from "../../create";
import restoreOrig from "./restoreOriginalPhoto";

const restorePhoto = () => {
    document.arrive(".pv_more_acts", { existing: true }, function (e) {
        let i = document.createElement("button");
        const langResult = getLang?.("me_attach_action_restore") || 'Восстановить оригинал';
        if (Array.isArray(langResult)) {
    i.textContent = langResult.join(", ");
} else {
    i.textContent = langResult; 
}
        i.classList.add("pv_more_act_item");
        i.id = "pv_more_act_orig";
        i.addEventListener("click", async function () {
            restoreOrig();
        });
        if (cur.pvCurPhoto.actions.edit && window.cur.pvCurPhoto.was_edited) {
            let styleElement = fromId("restorePhotoStyle");
            if (!styleElement) {
                styleElement = create("style", {}, { id: "restorePhotoStyle" });
                document.head.appendChild(styleElement);
            }
            styleElement.innerHTML = `#pv_more_act_orig:before{
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23fff' viewBox='0 0 20 20'%3E%3Cpath fill-rule='evenodd' d='M10 5.75a.75.75 0 0 1 .75.75v2.837c0 .129 0 .2.003.255a.238.238 0 0 0 .067.164c.037.04.088.09.18.182l1.533 1.531a.75.75 0 1 1-1.06 1.062c-.523-.522-1.044-1.045-1.568-1.566a2.569 2.569 0 0 1-.397-.464 1.75 1.75 0 0 1-.21-.507c-.049-.204-.048-.414-.048-.61.002-.96 0-1.922 0-2.884a.75.75 0 0 1 .75-.75Z M8.106 3.261a7 7 0 1 1-2.847 11.89.75.75 0 0 0-1.015 1.103A8.5 8.5 0 1 0 4 3.98v-.976a.75.75 0 0 0-1.5 0v2.36c0 .058 0 .139.006.212.007.088.027.229.103.379a1 1 0 0 0 .437.437c.15.076.29.096.379.103.073.006.154.006.212.006H6A.75.75 0 0 0 6 5h-.899a7 7 0 0 1 3.005-1.739Z'%3E%3C/path%3E%3C/svg%3E")!important;
	scale: .9;
	background-position: 0;}`;
            e.prepend(i);
        } else {
            const customStyle = fromId("restorePhotoStyle");
            if (customStyle) {
                customStyle.remove();
            }
        }
    });
}

export default restorePhoto;