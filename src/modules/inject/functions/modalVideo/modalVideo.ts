import getLocalValue from "../../getLocalValue";
import extractPlaylistPart from "./extractPlaylistPart";
import extractVideoPart from "./extractVideoPart";

const modalVideo = () => { 

    if (getLocalValue("videoModal")) {
        document.arrive(`body:not(:has(#video_choose_box)) ._video_item`, { existing: true }, async function (e) {
            e.setAttribute('onclick', `
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + e.getAttribute('data-id') + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: ''}, this);`)
        });

        document.arrive(`[class^="VideoCardList__videoItem"]:has([class^="vkitVideoCardThumb__thumb"][href^="/video"])`, { existing: true }, async function (e) {
            let videoLink;
            try {
                videoLink = e?.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/video"]')?.getAttribute('href')?.substring(6);
            }
            catch (error) {
		
            }
            e.setAttribute('onclick', `
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + videoLink + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: ''}, this);`)
        });

        document.arrive(`[class^="vkitVideoCardLayout__card"]:has([class^="vkitVideoCardThumb__thumb"][href^="/video"])`, { existing: true }, async function (e) {
            let videoLink;
            try {
                videoLink = e?.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/video"]')?.getAttribute('href')?.substring(6);
            }
            catch (error) {
		
            }
            e.setAttribute('onclick', `
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + videoLink + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: ''}, this);`)
        });


        document.arrive(`[class*="vkitDraggableVideoCard__card"]:has([class^="vkitVideoCardThumb__thumb"][href^="/playlist"])`, { existing: true }, async function (e) {
            let videoLink;
            try {
                videoLink = extractVideoPart(e?.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]')?.getAttribute('href'));
            }
            catch (error) {
		
            }
            let plistID;
            try {
                plistID = extractPlaylistPart(e?.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]')?.getAttribute('href'));
            }
            catch (error) {
		
            }
            e.setAttribute('onclick', `
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + videoLink + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: '` + plistID + `'}, this);`)
        });

        document.arrive(`[class^="vkitVideoPlaylistSideBlockThumb__thumbWrapper"]:has([class^="vkitVideoCardThumb__thumb"][href^="/playlist"])`, { existing: true }, async function (e) {
            let videoLink;
            try {
                videoLink = extractVideoPart(e?.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]')?.getAttribute('href'));
            }
            catch (error) {
		
            }
            let plistID;
            try {
                plistID = extractPlaylistPart(e?.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]')?.getAttribute('href'));
            }
            catch (error) {
		
            }
            e.setAttribute('onclick', `
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + videoLink + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: '` + plistID + `'}, this);`);
        });

        document.arrive(`[class^="vkitVideoCardLayout__card"]:has([class^="vkitVideoCardThumb__thumb"][href^="/playlist"])`, { existing: true }, async function (e) {
            let videoLink;
            try {
                videoLink = extractVideoPart(e?.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]')?.getAttribute('href'));
            }
            catch (error) {
		
            }
            let plistID;
            try {
                plistID = extractPlaylistPart(e?.querySelector('[class^="vkitVideoCardThumb__thumb"][href^="/playlist"]')?.getAttribute('href'));
            }
            catch (error) {
		
            }
            e.setAttribute('onclick', `
	event.preventDefault();
	event.stopPropagation();
	window.showVideo("` + videoLink + `",'0',{autoplay: 1, queue: 0, listId: '', playlistId: '` + plistID + `'}, this);`)
        });
    }
}

export default modalVideo;