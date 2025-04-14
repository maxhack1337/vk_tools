import createStyle from "../classicalProfile/scripts/createStyle";
import articleAttachment from "./attachments/articleAttachment";
import audioAttachment from "./attachments/audioAttachment";
import documentAttachment from "./attachments/documentAttachment";
import getArticleInfo from "./getArticleInfo";
import getFormattedPostDate from "./getFormattedPostDate";
import getPostAttaches from "./getPostAttaches";
import getPostData from "./getPostData";
import getPostDataNew from "./getPostDataNew";
import innerStyleGet from "./innerStyleGet";
import narrativeAttachment from "./attachments/narrativeAttachment";
import playlistAttachment from "./attachments/playlistAttachment";
import postRepost from "./postRepost";
import videoDescription from "./videoDescription";
import viewsCount from "./viewsCount";
import oldStoryBlock from "./oldStoryBlock/olsStoryBlock";
import postponedSuggestedPosts from "./postponedSuggestedPosts/postponedSuggestedPosts";
import getOldPostAttaches from "./getOldPostAttaches";
import miniAppAttachment from "./attachments/miniAppAttachment";
import linkAttachmentWithImage from "./attachments/linkAttachmentWithImage";
import linkAttachmentWithoutImage from "./attachments/linkAttachmentWithoutImage";
import linkPrimatyAttachmentWithImage from "./attachments/linkPrimatyAttachmentWithImage";
import miniAppAttachmentSecondary from "./attachments/miniAppAttachmentSecondary";
import linkAttachmentWithoutTitle from "./attachments/linkAttachmentWithoutTitle";
import { escapeHtml } from "../../escapeHtml";
const oldFeed = () => {
    if (localStorage.getItem("feedOldPosts") === "true") {
        oldStoryBlock();
        postponedSuggestedPosts();
        const postSelectors = [`[class^='PostDateBlock__root'] > .vkui__root`,`._post.postponed ._post_content`];
        document.arrive(postSelectors.join(', '), {
            existing: true
        }, async function (s) {
            let e = s.closest('._post.Post--redesignV3') as HTMLElement;
	        if(!e) {
		        e = s.closest('.wl_post.Post--redesignV3') as HTMLElement;
            }
            if (!e) return
            createStyle('postStyleOld', innerStyleGet());
            let postBottom = e.querySelector('[class^="PostDateBlock__root"]') as HTMLElement;
            if (postBottom) {
                postBottom.style.display = "none";
                let postData;
                try {
                    postData = getPostData(postBottom);
                } catch (error) {
                    postData = getPostDataNew(postBottom.querySelector('div')!);
                }
                viewsCount(postData, postBottom);
                //Дата поста
                if (!e.querySelector('.vkEnhancerPostDate')) {
                    try {
                        let postHeader = e.querySelector('[class^="PostHeaderTitle"]');
                        let postDate = document.createElement('div');
                        postDate.classList.add("PostHeaderSubtitle", "PostHeaderSubtitle--layoutDefault", "vk_enhancer_post_subhead");
                        let xDataPost = '';
                        if (postData.author != null) {
                            xDataPost += `<b style="font-weight:500">${getLang?.('wall_post_author_data_author_title')}</b><br><a class="vkuiLink vkitLink__link--WXYoI vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__resetLinkStyle vkuiClickable__host vkui-focus-visible vkuiRootComponent" href="${postData.author.url}">${postData.author.username}</a>`;
                        }
                        if (postData.publisher != null) {
                            let sex = postData.publisher.sex = postData.publisher.sex === 1 ? 2 : 1;
                            xDataPost += `<br><span style="height:6px; display:block;"></span><b style="font-weight:500">${getLang?.('wall_post_author_data_published_by_title',sex)}</b><br><a class="vkuiLink vkitLink__link--WXYoI vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__resetLinkStyle vkuiClickable__host vkui-focus-visible vkuiRootComponent" href="${postData.publisher.url}">${postData.publisher.username}</a>`;
                        }
                        if (postData.editInfo != null) {
                            xDataPost += `<br><span style="height:6px; display:block;"></span><b style="font-weight:500">${getLang?.('wall_post_author_data_editor_title')}</b><br><div style="display:flex"><a class="vkuiLink vkitLink__link--WXYoI vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__resetLinkStyle vkuiClickable__host vkui-focus-visible vkuiRootComponent" href="${postData.editInfo.url}">${postData.editInfo.username}</a><div style="color: var(--vkui--color_text_secondary);">​ ​${postData.editInfo.time}</div></div>`;
                        }
                        if (postData.date === 0 && postData.postRaw === "") {
                            postData.postRaw = e.closest('.Post--redesignV3')?.hasAttribute('data-post-id') ? e.closest('.Post--redesignV3')?.getAttribute('data-post-id') : "";
                            let postDateGetter = await vkApi.api('wall.getById', { posts: postData.postRaw });
                            postData.date = postDateGetter.items?.at(0)?.date || 0;

                        }
                        postDate.setAttribute('onmouseover', `showHint(this, { 
				text: '${xDataPost}',
				shift: [5, 7],
				hasover: 1,
				width: !1,
				toup: !0,
				forcetodown: !0
				})`);
                        postDate.innerHTML = `
				<a class="vkEnhancerPostDate PostHeaderSubtitle__link" href="/wall` + postData.postRaw + `" onclick="return showWiki({w: 'wall` + postData.postRaw + `'}, false, event, {trackCode: 'vkEnhancer', source: 'date_link'});">
					<time class="PostHeaderSubtitle__item">` + getFormattedPostDate(postData.date) + `</time>
				</a>
				`;
                        postHeader?.appendChild(postDate);
                    } catch (error) {
                        console.log(error);
                    }
                }
                //Репост поста
                if(e.querySelector('.PostCopyQuote--redesignV3')) await postRepost(e, postData);
                //Сабтайтл поста
                if (e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle .PostHeaderSubtitle__item')) {
                    try {
                        let sub = e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle .PostHeaderSubtitle__item');
                        let removeThis = e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle');
                        let appHere = e.querySelector('.vk_enhancer_post_subhead');
                        let separatorInPost = document.createElement('span');
                        separatorInPost.classList.add('PostHeaderSubtitle__separator');
                        separatorInPost.setAttribute('aria-hidden', 'true');
                        separatorInPost.textContent = '·';
                        appHere?.appendChild(separatorInPost);
                        appHere?.appendChild(sub!);
                        removeThis?.remove();
                    } catch (error) {
                        console.log(error);
                    }
                }
                if (e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle .wall_fixed_label')) {
                    try {
                        let sub = e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle .wall_fixed_label');
                        let removeThis = e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle');
                        let appHere = e.querySelector('.vk_enhancer_post_subhead');
                        let separatorInPost = document.createElement('span');
                        separatorInPost.classList.add('PostHeaderSubtitle__separator');
                        separatorInPost.setAttribute('aria-hidden', 'true');
                        separatorInPost.textContent = '·';
                        appHere?.appendChild(separatorInPost);
                        appHere?.appendChild(sub!);
                        removeThis?.remove();
                    } catch (error) {
                        console.log(error);
                    }
                }
                if (e.querySelector('.PostHeaderSubtitle:has(.PostHeaderSubtitle--withGeo):not(.vkEnhancerGeoTip)')) {
                    try {
                        let sub = e.querySelector('.PostHeaderSubtitle:has(.PostHeaderSubtitle--withGeo)');
                        sub?.classList.add('vkEnhancerGeoTip');
                        let appHere = e.querySelector('[class^="PostContentContainer__contentContainer"]');
                        appHere?.appendChild(sub!);
                    } catch (error) {
                        console.log(error);
                    }
                }
                /*Пост в репосте*/
                if (e.querySelector('.published_sec_quote.PostCopyQuote--redesignV3 .CopyPost__authorLink')) {
                    try {
                        let appHere = e.querySelector('.published_sec_quote.PostCopyQuote--redesignV3 .copy_post_header_info');
                        let dataSet = e.querySelector('.published_sec_quote.PostCopyQuote--redesignV3 .CopyPost__authorLink');
                        let postOpen = document.createElement('div');
                        postOpen.classList.add("copy_post_date", "vk_enhancer_copy2_post_subhead");
                        postOpen.innerHTML = `
				<a class="vkEnhancerPostDate published_by_date" href="/wall` + dataSet?.getAttribute('data-item-owner-id') + "_" + dataSet?.getAttribute('data-item-id') + `" onclick="return showWiki({w: 'wall` + dataSet?.getAttribute('data-item-owner-id') + "_" + dataSet?.getAttribute('data-item-id') + `'}, false, event, {trackCode: 'vkEnhancer', source: 'date_link'});">
					` + getLang?.('me_fc_open_wall_post') + `
				</a>`
                        appHere?.appendChild(postOpen);
                    } catch (error) {
                        console.log(error);
                    }
                }
                //Видео название и просмотры в посте
                if (e.querySelector('.vkuiDiv__host > [class^="vkitPrimaryAttachment__root"] [class^="vkitInteractiveWrapper__root"][href^="/video"]:not(.vkEnhancerVideoDescAlready)')) {
                    try {
                        let v = e.querySelector('[class^="vkitPrimaryAttachment__root"] [class^="vkitInteractiveWrapper__root"][href^="/video"]');
                        v?.classList.add('vkEnhancerVideoDescAlready');
                        let videoDesc = document.createElement('div');
                        videoDesc.classList.add('media_desc', 'post_video_desc', 'vk_enhancer_video_desc');
                        videoDesc.style.padding = "12px 0 0 0";
                        let videoName = v?.getAttribute('aria-label');
                        let videoList;
                        let videoDur = v?.getAttribute('data-duration');
                        try {
                            videoList = v?.getAttribute('data-list');
                        } catch (error) {
                            videoList = '';
                        }
                        let videoID = v?.getAttribute('data-video');
                        let x;
                        if (videoList !== '') {
                            x = await vkApi.api('video.get', {
                                'videos': videoID + "_" + videoList
                            });
                        } else {
                            x = await vkApi.api('video.get', {
                                'videos': videoID
                            });
                        }
                        let videoViews = x.items[0].views;
                        videoDesc.innerHTML = videoDescription(videoID!, videoList || '', postData, videoDur!, videoName || '', videoViews);
                        v?.closest('[class^="vkitPrimaryAttachment__root"]')?.parentElement?.appendChild(videoDesc);
                    } catch (error) {
                        console.error(error);
                    }
                }
                //Получение аттачей из поста
                let dataAttachments;
                let dataRepostAttachments;
                try {
                    dataAttachments = getOldPostAttaches(e.querySelector('[class^="PostContentContainer__contentContainer"]')!);
                } catch (error) {
                    try {
                        dataAttachments = getPostAttaches(e.querySelector('[class^="PostContentContainer__contentContainer"]')!);
                    }
                    catch (error) {

                    }
                }
                try {
                    dataRepostAttachments = getOldPostAttaches(e.querySelector('.PostCopyQuote--redesignV3 [class^="PostContentContainer__contentContainer"]') !);
                } catch (error) {
                    try {
                        dataRepostAttachments = getPostAttaches(e.querySelector('.PostCopyQuote--redesignV3 [class^="PostContentContainer__contentContainer"]')!);
                    }
                    catch (error) {

                    }
                }
                // console.log(dataAttachments);
                //Документы
                if (e.querySelector('[class^="vkitChipAttachment__root"]:has(> a[href^="https://vk.com/doc"])') && dataAttachments.item.attachments) {
                    let allDocs = e.querySelector('[class^="vkitChipAttachment__root"] > a[href^="https://vk.com/doc"]');
                    let count = 0;
                    dataAttachments.item.attachments.forEach(async function(docu: any) {
                        if (docu.doc) {
                            let documentCurrent = docu.doc;
                            let secondaryAttachDoc = document.createElement('div');
                            secondaryAttachDoc.classList.add('vkuiDiv', 'vkuiRootComponent', 'vkEnhancerSecondaryAttach');
                            if (count === 0) {
                                secondaryAttachDoc.classList.add('vkuiDiv', 'vkuiRootComponent', 'vkEnhancerSecondaryAttachFirst');
                                count += 1;
                            }
                            secondaryAttachDoc.style.padding = "0px 8px";
                            secondaryAttachDoc.innerHTML = documentAttachment(documentCurrent);
                            if (documentCurrent.preview) {
                                let fallBack = secondaryAttachDoc.querySelector('.vkuiInternalImage') as HTMLElement;
                                fallBack.querySelector('.vkuiImageBase__fallback')?.remove();
                                fallBack.style.background = "url(" + documentCurrent.preview.photo.sizes[0].src + ")";
                                fallBack.style.backgroundSize = "cover";
                            }
                            allDocs?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachDoc);
                        }
                    });
                }

                if (e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="https://vk.com/doc"])') && dataRepostAttachments.item.attachments) {
                    let allDocs = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="https://vk.com/doc"]');
                    let count = 0;
                    dataRepostAttachments.item.attachments.forEach(async function(docu: any) {
                        if (docu.doc) {
                            let documentCurrent = docu.doc;
                            let secondaryAttachDoc = document.createElement('div');
                            secondaryAttachDoc.classList.add('vkuiDiv', 'vkuiRootComponent', 'vkEnhancerSecondaryAttach');
                            if (count === 0) {
                                secondaryAttachDoc.classList.add('vkuiDiv', 'vkuiRootComponent', 'vkEnhancerSecondaryAttachFirst');
                                count += 1;
                            }
                            secondaryAttachDoc.style.padding = "0px 8px";
                            secondaryAttachDoc.innerHTML = documentAttachment(documentCurrent);
                            if (documentCurrent.preview) {
                                let fallBack = secondaryAttachDoc.querySelector('.vkuiInternalImage') as HTMLElement;
                                fallBack.querySelector('.vkuiImageBase__fallback')?.remove();
                                fallBack.style.background = "url(" + documentCurrent.preview.photo.sizes[0].src + ")";
                                fallBack.style.backgroundSize = "cover";
                            }
                            allDocs?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachDoc);
                        }
                    });
                }
                //Музыка на фото
                if (e.querySelector('[class^="vkitMusicOverlayAttachment__root"]')) {
                    let x = e.querySelector('[class^="vkitMusicOverlayAttachment__root"]');
                    if (dataAttachments && dataAttachments.item && dataAttachments.item.attachments) {
                        dataAttachments.item.attachments.forEach(function(music: any) {
                            if (music.type === "audio" && music.style === "on_media") {
                                let audioElement = document.createElement("div");
                                let isAvailableTrack = music.audio.content_restricted?.valueOf() > 0;
                                let isRestrickted = '';
                                if (isAvailableTrack?.valueOf() === true) {
                                    isRestrickted = 'audio_claimed';
                                }
                                let titleAud = escapeHtml(music.audio.title)
                                let artistAud = escapeHtml(music.audio.artist)
                                audioElement.innerHTML = audioAttachment(isRestrickted, music, titleAud, artistAud);
                                x?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(audioElement);
                            }
                        });
                    }
                }
                if (e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitMusicOverlayAttachment__root"]')) {
                    let x = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitMusicOverlayAttachment__root"]');
                    if (dataRepostAttachments && dataRepostAttachments.item && dataRepostAttachments.item.attachments) {
                        dataRepostAttachments.item.attachments.forEach(function(music: any) {
                            if (music.type === "audio" && music.style === "on_media") {
                                let audioElement = document.createElement("div");
                                let titleAud = escapeHtml(music.audio.title)
                                let artistAud = escapeHtml(music.audio.artist)
                                let isAvailableTrack = music.audio.content_restricted?.valueOf() > 0;
                                let isRestrickted = '';
                                if (isAvailableTrack?.valueOf() === true) {
                                    isRestrickted = 'audio_claimed';
                                }
                                audioElement.innerHTML = audioAttachment(isRestrickted, music, titleAud, artistAud);
                                x?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(audioElement);
                            }
                        });
                    }
                }
                //Плейлист на фото
                if (e.querySelector('[class^="vkitMusicPlaylistOverlayBadge__root"]')) {
                    let x = e.querySelector('[class^="vkitMusicPlaylistOverlayBadge__root"]');
                    if (dataAttachments && dataAttachments.item && dataAttachments.item.attachments) {
                        dataAttachments.item.attachments.forEach(function(music: any) {
                            if (music.type === "audio_playlist" && music.style === "on_media") {
                                let pListInfo = music.audio_playlist;
                                let secondaryAttachPlist = document.createElement('div');
                                secondaryAttachPlist.classList.add('vkuiDiv', 'vkuiRootComponent', 'vkEnhancerSecondaryAttach');
                                secondaryAttachPlist.classList.add('vkEnhancerSecondaryAttachFirst');
                                secondaryAttachPlist.style.padding = "0px 8px";
                                secondaryAttachPlist.innerHTML = playlistAttachment(pListInfo);
                                if (pListInfo.photo) {
                                    let fallBack = secondaryAttachPlist.querySelector('.vkuiInternalImage') !as HTMLElement;
                                    fallBack.querySelector('.vkuiImageBase__fallback')?.remove();
                                    fallBack.style.background = "url(" + pListInfo.photo.photo_270 + ")";
                                    fallBack.style.backgroundSize = "cover";
                                } else {}
                                x?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachPlist);
                            }
                        });
                    }
                }
                if (e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitMusicPlaylistOverlayBadge__root"]')) {
                    let x = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitMusicPlaylistOverlayBadge__root"]');
                    if (dataRepostAttachments && dataRepostAttachments.item && dataRepostAttachments.item.attachments) {
                        dataRepostAttachments.item.attachments.forEach(function(music: any) {
                            if (music.type === "audio_playlist" && music.style === "on_media") {
                                let pListInfo = music.audio_playlist;
                                let secondaryAttachPlist = document.createElement('div');
                                secondaryAttachPlist.classList.add('vkuiDiv', 'vkuiRootComponent', 'vkEnhancerSecondaryAttach');
                                secondaryAttachPlist.classList.add('vkEnhancerSecondaryAttachFirst');
                                secondaryAttachPlist.style.padding = "0px 8px";
                                secondaryAttachPlist.innerHTML = playlistAttachment(pListInfo);
                                if (pListInfo.photo) {
                                    let fallBack = secondaryAttachPlist.querySelector('.vkuiInternalImage') !as HTMLElement;
                                    fallBack.querySelector('.vkuiImageBase__fallback')?.remove();
                                    fallBack.style.background = "url(" + pListInfo.photo.photo_270 + ")";
                                    fallBack.style.backgroundSize = "cover";
                                } else {}
                                x?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachPlist);
                            }
                        });
                    }
                }
                //Ссылки
                if ((e.querySelector('[class^="vkitChipAttachment__root"]:has(> a[href^="http"]:not([class*="vkitLink__secondary"]))') || e.querySelector('[class^="vkitChipAttachment__root"]:has(> a[href^="/away"]:not([class*="vkitLink__secondary"]))')) && dataAttachments.item.attachments) {
                    let allLinks = e.querySelector('[class^="vkitChipAttachment__root"] > a[href^="http"]:not([class*="vkitLink__secondary"])');
                    if (!allLinks) {
                        allLinks = e.querySelector('[class^="vkitChipAttachment__root"] > a[href^="/away"]:not([class*="vkitLink__secondary"])')
                    }
                    let count = 0;
                    dataAttachments.item.attachments.forEach(async function(linkChip: any) {
                        if (linkChip.link) {
                            let linkCurrent = linkChip.link;
                            let secondaryAttachDoc = document.createElement('div');
                            secondaryAttachDoc.classList.add('vkuiDiv', 'vkuiRootComponent');
                            if (count === 0) {
                                secondaryAttachDoc.classList.add('vkuiDiv', 'vkuiRootComponent', 'vkEnhancerSecondaryAttachFirst');
                                count += 1;
                            }
                            if (!linkCurrent.title) {
                                secondaryAttachDoc.style.padding = "0px 20px";
                                if (!allLinks?.closest('.wk_content_redesign_v3')) { 
                                    secondaryAttachDoc.style.padding = "0px 0px";
                                }
                                secondaryAttachDoc.append(linkAttachmentWithoutTitle(linkCurrent));
                            } 
                            else if (linkCurrent.photo) {
                                secondaryAttachDoc.style.padding = "0px 20px";
                                secondaryAttachDoc.append(linkAttachmentWithImage(linkCurrent));
                            } else {
                                secondaryAttachDoc.style.padding = "0px 20px";
                                if (!allLinks?.closest('.wk_content_redesign_v3')) { 
                                    secondaryAttachDoc.style.padding = "0px 0px";
                                }
                                secondaryAttachDoc.append(linkAttachmentWithoutImage(linkCurrent));
                            }
                            allLinks?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachDoc);
                            allLinks?.closest('[class^="vkitChipAttachment__root"]')?.remove();
                        }
                    });
                }
                if ((e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="http"]:not([class*="vkitLink__secondary"]))') || e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="/away"]:not([class*="vkitLink__secondary"]))')) && dataRepostAttachments.item.attachments) {
                    let allLinks = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="http"]:not([class*="vkitLink__secondary"])');
                    if (!allLinks) {
                        allLinks = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="/away"]:not([class*="vkitLink__secondary"])')
                    }
                    let count = 0;
                    dataRepostAttachments.item.attachments.forEach(async function(linkChip: any) {
                        if (linkChip.link) {
                            let linkCurrent = linkChip.link;
                            let secondaryAttachDoc = document.createElement('div');
                            secondaryAttachDoc.classList.add('vkuiDiv', 'vkuiRootComponent');
                            if (count === 0) {
                                secondaryAttachDoc.classList.add('vkuiDiv', 'vkuiRootComponent', 'vkEnhancerSecondaryAttachFirst');
                                count += 1;
                            }
                            if (!linkCurrent.title) {
                                secondaryAttachDoc.style.padding = "0px 20px";
                                if (!allLinks?.closest('.wk_content_redesign_v3')) { 
                                    secondaryAttachDoc.style.padding = "0px 0px";
                                }
                                secondaryAttachDoc.append(linkAttachmentWithoutTitle(linkCurrent));
                            } 
                            else if (linkCurrent.photo) {
                                secondaryAttachDoc.style.padding = "0px 20px";
                                secondaryAttachDoc.append(linkAttachmentWithImage(linkCurrent));
                            } else {
                                secondaryAttachDoc.style.padding = "0px 20px";
                                if (!allLinks?.closest('.wk_content_redesign_v3')) { 
                                    secondaryAttachDoc.style.padding = "0px 0px";
                                }
                                secondaryAttachDoc.append(linkAttachmentWithoutImage(linkCurrent));
                            }
                            allLinks?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachDoc);
                            allLinks?.closest('[class^="vkitChipAttachment__root"]')?.remove();
                        }
                    });
                }
                //Примари-ссылка
                if ((e.querySelector('.vkuiDiv__host > [class^="vkitSnippetAttachment__root"] > a[class^="vkitInteractiveWrapper__root"][href^="https://"]') || e.querySelector('.vkuiDiv__host > [class^="vkitSnippetAttachment__root"] > a[class^="vkitInteractiveWrapper__root"][href^="/away"]')) && dataAttachments.item.attachments) {
                    let allLinks = e.querySelector('.vkuiDiv__host > [class^="vkitSnippetAttachment__root"] > a[class^="vkitInteractiveWrapper__root"][href^="https://"]');
                    if (!allLinks) {
                        allLinks = e.querySelector('.vkuiDiv__host > [class^="vkitSnippetAttachment__root"] > a[class^="vkitInteractiveWrapper__root"][href^="/away"]');
                    }
                    dataAttachments.item.attachments.forEach(async function(linkFull: any) {
                        if (linkFull.link && linkFull.style === "full") {
                            let linkCurrent = linkFull.link;
                            let primaryAttachLink = document.createElement('div');
                            primaryAttachLink.classList.add('vkuiDiv__host', 'vkuiRootComponent');
                            if (linkCurrent.photo) {
                                primaryAttachLink.style.padding = "0px 20px";
                                primaryAttachLink.append(linkPrimatyAttachmentWithImage(linkCurrent));
                            }
                            allLinks?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(primaryAttachLink);
                            allLinks?.closest('[class^="vkitSnippetAttachment__root"]')?.remove();
                        }
                    });
                }

                if ((e.querySelector('.PostCopyQuote--redesignV3 .vkuiDiv__host > [class^="vkitSnippetAttachment__root"] > a[class^="vkitInteractiveWrapper__root"][href^="https://"]') || e.querySelector('.PostCopyQuote--redesignV3 .vkuiDiv__host > [class^="vkitSnippetAttachment__root"] > a[class^="vkitInteractiveWrapper__root"][href^="/away"]')) && dataRepostAttachments.item.attachments) {
                    let allLinks = e.querySelector('.PostCopyQuote--redesignV3 .vkuiDiv__host > [class^="vkitSnippetAttachment__root"] > a[class^="vkitInteractiveWrapper__root"][href^="https://"]');
                    if (!allLinks) {
                        allLinks = e.querySelector('.PostCopyQuote--redesignV3 .vkuiDiv__host > [class^="vkitSnippetAttachment__root"] > a[class^="vkitInteractiveWrapper__root"][href^="/away"]');
                    }
                    dataRepostAttachments.item.attachments.forEach(async function(linkFull: any) {
                        if (linkFull.link && linkFull.style === "full") {
                            let linkCurrent = linkFull.link;
                            let primaryAttachLink = document.createElement('div');
                            primaryAttachLink.classList.add('vkuiDiv__host', 'vkuiRootComponent');
                            if (linkCurrent.photo) {
                                primaryAttachLink.style.padding = "0px 20px";
                                primaryAttachLink.append(linkPrimatyAttachmentWithImage(linkCurrent));
                            }
                            allLinks?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(primaryAttachLink);
                            allLinks?.closest('[class^="vkitSnippetAttachment__root"]')?.remove();
                        }
                    });
                }
                //Статьи
                if (e.querySelector('[class^="vkitSnippetAttachment__root"]:not(:has(.vkuiIcon--delete_outline_56))') && dataAttachments.item.attachments) {
                    let articleSetClosest = e.querySelector('.vkuiDiv__host [class^="vkitSnippetAttachment__root"]');
                    let getArticle = articleSetClosest?.parentElement;
                    let swapArticle = articleSetClosest?.firstChild;
                    let f = getArticleInfo(getArticle!);
                    try {
                        if (f.attachment.type === "article") {
                            let articleInfo = f.attachment.article;
                            let articleUrlShort = articleInfo.url.slice(14)
                            let newArticlePreset = document.createElement('a');
                            newArticlePreset.classList.add('vk_enhancer_article_snippet', 'article_snippet', 'clear_fix')
                            newArticlePreset.setAttribute('onclick', `return nav.go('${articleInfo.url}', event);`);
                            newArticlePreset.setAttribute('onmouseenter', `articlePrepare('${articleUrlShort}', { ref: '' })`);
                            newArticlePreset.setAttribute('data-article-raw-id', articleInfo.owner_id + '_' + articleInfo.id);
                            newArticlePreset.setAttribute('data-post-id', '');
                            newArticlePreset.innerHTML = articleAttachment(articleInfo);
                            let snippetImage = newArticlePreset.querySelector('.article_snippet__image') as HTMLElement;
                            if (articleInfo.photo) {
                                snippetImage.style.backgroundImage = `url(${articleInfo.photo.orig_photo.url})`;
                            }
                            swapArticle?.remove();
                            articleSetClosest?.appendChild(newArticlePreset);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                //Аттач-чипс - сюжеты
                if (e.querySelector('[class^="vkitChipAttachment__root"]:has(> a[href^="/narrative"])') && dataAttachments.item.attachments) {
                    let allDocs = e.querySelector('[class^="vkitChipAttachment__root"] > a[href^="/narrative"]');
                    dataAttachments.item.attachments.forEach(async function(docu: any) {
                        if (docu.narrative) {
                            let narrativeCurrent = docu.narrative;
                            let ownerNarrative;
                            if (narrativeCurrent.owner_id > 0) {
                                ownerNarrative = await vkApi.api('users.get', {
                                    'user_ids': narrativeCurrent.owner_id
                                });
                                ownerNarrative = ownerNarrative[0].first_name + ' ' + ownerNarrative[0].last_name;
                            } else {
                                ownerNarrative = await vkApi.api('groups.getById', {
                                    'group_ids': -narrativeCurrent.owner_id
                                });
                                ownerNarrative = ownerNarrative.groups?.at(-1)?.name || '';
                            }
                            let secondaryAttachNarrative = document.createElement('div');
                            secondaryAttachNarrative.classList.add('vkuiDiv', 'vkuiRootComponent', 'vkEnhancerSecondaryAttach');
                            secondaryAttachNarrative.style.padding = "0px 20px";
                            secondaryAttachNarrative.innerHTML = narrativeAttachment(narrativeCurrent, ownerNarrative);
                            if (narrativeCurrent.cover?.cropped_sizes) {
                                let fallBack = secondaryAttachNarrative.querySelector('.NarrativeSnippet__image') as HTMLElement;
                                fallBack.style.backgroundImage = "url(" + narrativeCurrent.cover?.cropped_sizes?.at(-1).url + ")";
                            } else {}
                            allDocs?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachNarrative);
                        }
                    });
                }
                if (e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"]:has(> a[href^="/narrative"])') && dataRepostAttachments.item.attachments) {
                    let allDocs = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitChipAttachment__root"] > a[href^="/narrative"]');
                    dataRepostAttachments.item.attachments.forEach(async function(docu: any) {
                        if (docu.narrative) {
                            let narrativeCurrent = docu.narrative;
                            let ownerNarrative;
                            if (narrativeCurrent.owner_id > 0) {
                                ownerNarrative = await vkApi.api('users.get', {
                                    'user_ids': narrativeCurrent.owner_id
                                });
                                ownerNarrative = ownerNarrative[0].first_name + ' ' + ownerNarrative[0].last_name;
                            } else {
                                ownerNarrative = await vkApi.api('groups.getById', {
                                    'group_ids': -narrativeCurrent.owner_id
                                });
                                ownerNarrative = ownerNarrative.groups?.at(-1)?.name || '';
                            }
                            let secondaryAttachNarrative = document.createElement('div');
                            secondaryAttachNarrative.classList.add('vkuiDiv', 'vkuiRootComponent', 'vkEnhancerSecondaryAttach');
                            secondaryAttachNarrative.style.padding = "0px 20px";
                            secondaryAttachNarrative.innerHTML = narrativeAttachment(narrativeCurrent, ownerNarrative);
                            if (narrativeCurrent.cover?.cropped_sizes) {
                                let fallBack = secondaryAttachNarrative.querySelector('.NarrativeSnippet__image') as HTMLElement;
                                fallBack.style.backgroundImage = "url(" + narrativeCurrent.cover?.cropped_sizes?.at(-1).url + ")";
                            } else {}
                            allDocs?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachNarrative);
                        }
                    });
                }


                //Аттач-миниапп примари
                if (e.querySelector('[class^="vkitPrimaryAttachment__root"] :not(.videoplayer_action_button)') && dataAttachments.item.attachments) {
                    let allDocs = e.querySelector('[class^="vkitPrimaryAttachment__root"] [href^="https://vk.com/"]:not(.videoplayer_action_button)');
                    dataAttachments.item.attachments.forEach(async function(miniapp: any) {
                        if (miniapp.mini_app) {
                            let primaryAttachMiniApp = document.createElement('div');
                            primaryAttachMiniApp.classList.add('vkuiDiv', 'vkuiRootComponent');
                            primaryAttachMiniApp.style.padding = "0px 20px";
                            let miniAppCurrent = miniAppAttachment(miniapp.mini_app);
                            primaryAttachMiniApp.appendChild(miniAppCurrent)
                            allDocs?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(primaryAttachMiniApp);
                        }
                    });
                }

                if (e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitPrimaryAttachment__root"] [href^="https://vk.com/"]:not(.videoplayer_action_button)') && dataRepostAttachments.item.attachments) {
                    let allDocs = e.querySelector('.PostCopyQuote--redesignV3 [class^="vkitPrimaryAttachment__root"] [href^="https://vk.com/"]:not(.videoplayer_action_button)');
                    dataRepostAttachments.item.attachments.forEach(async function(miniapp: any) {
                        if (miniapp.mini_app) {
                            let primaryAttachMiniApp = document.createElement('div');
                            primaryAttachMiniApp.classList.add('vkuiDiv', 'vkuiRootComponent');
                            primaryAttachMiniApp.style.padding = "0px 20px";
                            let miniAppCurrent = miniAppAttachment(miniapp.mini_app);
                            primaryAttachMiniApp.appendChild(miniAppCurrent)
                            allDocs?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(primaryAttachMiniApp);
                        }
                    });
                }

                //Аттач миниапп секондари
                if (e.querySelector('[data-testid="feed_action_button_mini_app"]') && dataAttachments.item.attachments) {
                    let allDocs = e.querySelector('[data-testid="feed_action_button_mini_app"]');
                    dataAttachments.item.attachments.forEach(async function(miniapp: any) {
                        if (miniapp.mini_app) {
                            let secondaryAttachMiniApp = document.createElement('div');
                            secondaryAttachMiniApp.classList.add('vkuiDiv', 'vkuiRootComponent');
                            secondaryAttachMiniApp.style.padding = "0px 20px";
                            let miniAppCurrent = miniAppAttachmentSecondary(miniapp.mini_app);
                            secondaryAttachMiniApp.appendChild(miniAppCurrent)
                            allDocs?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachMiniApp);
                        }
                    });
                }

                if (e.querySelector('.PostCopyQuote--redesignV3 [data-testid="feed_action_button_mini_app"]') && dataRepostAttachments.item.attachments) {
                    let allDocs = e.querySelector('.PostCopyQuote--redesignV3 [data-testid="feed_action_button_mini_app"]');
                    dataRepostAttachments.item.attachments.forEach(async function(miniapp: any) {
                        if (miniapp.mini_app) {
                            let secondaryAttachMiniApp = document.createElement('div');
                            secondaryAttachMiniApp.classList.add('vkuiDiv', 'vkuiRootComponent');
                            secondaryAttachMiniApp.style.padding = "0px 20px";
                            let miniAppCurrent = miniAppAttachmentSecondary(miniapp.mini_app);
                            secondaryAttachMiniApp.appendChild(miniAppCurrent)
                            allDocs?.closest('[class^="PostContentContainer__contentContainer"]')?.appendChild(secondaryAttachMiniApp);
                        }
                    });
                }
                /*Автор поста*/
                if (e.querySelector('[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)')) {
                    try {
                        let isRepost;
                        if (!e.querySelector('[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)')?.closest('.PostCopyQuote--redesignV3')) {
                            isRepost = '';
                        } else {
                            isRepost = '.PostCopyQuote--redesignV3 ';
                        }
                        let sub = e.querySelector(isRepost + '[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]');
                        
                        let anchor = sub as HTMLAnchorElement;

				        let wallSigned = document.createElement('div');
				        wallSigned.classList.add('wall_signed');
                        wallSigned.style.paddingLeft = '20px';
                        
				        let wallSignedBy = document.createElement('a');
				        wallSignedBy.href = anchor.href;
				        wallSignedBy.textContent = anchor.textContent;
				        wallSignedBy.classList.add('wall_signed_by');

				        wallSigned.append(wallSignedBy);

                        sub?.replaceWith(wallSigned);
                        
                        let contentContainer = e.querySelector(isRepost + '[class^="PostContentContainer__contentContainer"]');
                        contentContainer?.append(wallSigned);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        });
    }
}
export default oldFeed;