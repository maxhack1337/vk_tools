import createStyle from "../classicalProfile/scripts/createStyle";
import getFormattedPostDate from "./getFormattedPostDate";
import getPostData from "./getPostData";
import getPostDataNew from "./getPostDataNew";
import innerStyleGet from "./innerStyleGet";
import postRepost from "./postRepost";
import viewsCount from "./viewsCount";

const oldFeed = () => {
    if (localStorage.getItem("feedOldPosts") === "true") {
        const postSelectors = ['.Post--redesignV3'];
        document.arrive(postSelectors.join(', '), { existing: true }, async function (e) {
            createStyle('postStyleOld', innerStyleGet());
            let postBottom = e.querySelector('[class^="PostDateBlock__root"]') as HTMLElement;
            if (postBottom) {
		        postBottom.style.display = "none";
		        let postData;
		        try {
		            postData = getPostData(postBottom);
		        } catch(error) {
		            postData = getPostDataNew(postBottom.querySelector('div')!);
                }
                viewsCount(postData, postBottom);
        //Дата поста
        if(!e.querySelector('.vkEnhancerPostDate')) {
			try {
				let postHeader = e.querySelector('[class^="PostHeaderTitle"]');
				let postDate = document.createElement('div');
				postDate.classList.add("PostHeaderSubtitle","PostHeaderSubtitle--layoutDefault","vk_enhancer_post_subhead");
				let xDataPost = '';
				if(postData.author != null) {
					xDataPost += `<b style="font-weight:500">${getLang?.('wall_post_author_data_author_title')}</b><br><a class="vkuiLink vkitLink__link--WXYoI vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__resetLinkStyle vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" href="${postData.author.url}">${postData.author.username}</a>`;
				}
				if(postData.publisher != null) {
					let sex = postData.publisher.sex = postData.publisher.sex === 1 ? 2 : 1; 
					xDataPost += `<br><span style="height:6px; display:block;"></span><b style="font-weight:500">${getLang?.('wall_post_author_data_published_by_title',sex)}</b><br><a class="vkuiLink vkitLink__link--WXYoI vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__resetLinkStyle vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" href="${postData.publisher.url}">${postData.publisher.username}</a>`;
				}
				if(postData.editInfo != null) {
					xDataPost += `<br><span style="height:6px; display:block;"></span><b style="font-weight:500">${getLang?.('wall_post_author_data_editor_title')}</b><br><div style="display:flex"><a class="vkuiLink vkitLink__link--WXYoI vkuiTappable vkuiTappable--hasPointer-none vkuiClickable__resetLinkStyle vkuiClickable__host vkuiClickable__realClickable vkui-focus-visible vkuiRootComponent" href="${postData.editInfo.url}">${postData.editInfo.username}</a><div style="color: var(--vkui--color_text_secondary);">​ ​${postData.editInfo.time}</div></div>`;
				}
				postDate.setAttribute('onmouseover',`showHint(this, { 
				text: '${xDataPost}',
				shift: [5, 7],
				hasover: 1,
				width: !1,
				toup: !0,
				forcetodown: !0
				})`);
				postDate.innerHTML = `
				<a class="vkEnhancerPostDate PostHeaderSubtitle__link" href="/wall`+postData.postRaw+`" onclick="return showWiki({w: 'wall`+postData.postRaw+`'}, false, event, {trackCode: 'vkEnhancer', source: 'date_link'});">
					<time class="PostHeaderSubtitle__item">`+getFormattedPostDate(postData.date)+`</time>
				</a>
				`;
				postHeader?.appendChild(postDate);
			}
			catch(error) {
				console.log(error);
			}
        }
        //Текст поста   
                if (!e.querySelector('.PostCopyQuote--redesignV3')) {
                    try {
                        let postText = e.querySelector('[class^="vkitPostText__root"]')?.parentElement as HTMLElement;
                        let postTextElem = e.querySelector('[class^="vkitPostText__root"]') as HTMLElement;
                        let postContent = e.querySelector('[class^="PostContentContainer__contentContainer"]');
                        postText.style.padding = "0px 20px";
                        postTextElem.style.fontSize = "13px";
                        postTextElem.style.lineHeight = "1.462";
                        postContent?.prepend(postText);
                    }
                    catch (error) {
                        /*console.log(error);*/
                    }
                }
                //Репост поста
                else {
                   await postRepost(e, postData);
                }
                //Сабтайтл поста
        if(e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle .PostHeaderSubtitle__item')) {
			try {
				let sub = e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle .PostHeaderSubtitle__item');
				let removeThis = e.querySelector('.PostHeaderInfo > .PostHeaderSubtitle');
				let appHere = e.querySelector('.vk_enhancer_post_subhead');
				let separatorInPost = document.createElement('span');
				separatorInPost.classList.add('PostHeaderSubtitle__separator');
				separatorInPost.setAttribute('aria-hidden','true');
				separatorInPost.textContent = '·';
				appHere?.appendChild(separatorInPost);
				appHere?.appendChild(sub!);
				removeThis?.remove();
			}
			catch(error) {
				console.log(error);
			}
                }
                
        if(e.querySelector('.PostHeaderSubtitle:has(.PostHeaderSubtitle--withGeo):not(.vkEnhancerGeoTip)')) {
			try {
				let sub = e.querySelector('.PostHeaderSubtitle:has(.PostHeaderSubtitle--withGeo)');
				sub?.classList.add('vkEnhancerGeoTip');
				let appHere = e.querySelector('[class^="PostContentContainer__contentContainer"]');
				appHere?.appendChild(sub!);
			}
			catch(error) {
				console.log(error);
			}
                }
                
                		if(e.querySelector('[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)')) {
			try {
				
				let isRepost;
				if(!e.querySelector('[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]:not(.vkEnhancerPostAuthorTip)')?.closest('.PostCopyQuote--redesignV3'))
				{
					isRepost = '';
				}
				else {
					isRepost = '.PostCopyQuote--redesignV3 ';
				}
				let sub = e.querySelector(isRepost + '[class^="vkitShowMoreText__text"] a[class^="vkitTextClamp__root"][href^="/"]');
				sub?.classList.add('vkEnhancerPostAuthorTip');
				let appHere;
				if(isRepost === '') {
					appHere = e.querySelector('.vk_enhancer_post_subhead');
				}
				else {
					appHere = e.querySelector('.vk_enhancer_copy_post_subhead');
				}
				let separatorInPost = document.createElement('span');
				separatorInPost.classList.add('PostHeaderSubtitle__separator');
				separatorInPost.setAttribute('aria-hidden','true');
				separatorInPost.textContent = '·';
				appHere?.appendChild(separatorInPost);
				appHere?.appendChild(sub!);
			}
			catch(error) {
				console.log(error);
			}
			
                }
                /*Пост в репосте*/
        if(e.querySelector('.published_sec_quote.PostCopyQuote--redesignV3 .CopyPost__authorLink')) {
			try {
				let appHere = e.querySelector('.published_sec_quote.PostCopyQuote--redesignV3 .copy_post_header_info');
				let dataSet = e.querySelector('.published_sec_quote.PostCopyQuote--redesignV3 .CopyPost__authorLink');
				let postOpen = document.createElement('div');
				postOpen.classList.add("copy_post_date","vk_enhancer_copy2_post_subhead");
				postOpen.innerHTML = `
				<a class="vkEnhancerPostDate published_by_date" href="/wall`+dataSet?.getAttribute('data-item-owner-id') + "_" + dataSet?.getAttribute('data-item-id') + `" onclick="return showWiki({w: 'wall`+dataSet?.getAttribute('data-item-owner-id') + "_" + dataSet?.getAttribute('data-item-id') + `'}, false, event, {trackCode: 'vkEnhancer', source: 'date_link'});">
					`+getLang?.('me_fc_open_wall_post')+`
				</a>`
				appHere?.appendChild(postOpen);
			}
			catch(error) {
				console.log(error);
			}
                }
                		/*видео название и просмотры в посте*/
		if(e.querySelector('.vkuiDiv > [class^="vkitPrimaryAttachment__root"] [class^="vkitInteractiveWrapper__root"][href^="/video"]:not(.vkEnhancerVideoDescAlready)')) {
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
				} catch(error) {
					videoList = '';
				}
				let videoID = v?.getAttribute('data-video');
				let x;
				if(videoList !== '') {
					x = await vkApi.api('video.get',{'videos':videoID + "_" + videoList});
				} else {
					x = await vkApi.api('video.get',{'videos':videoID});
				}
				let videoViews = x.items[0].views;
				videoDesc.innerHTML = `
				<a class="lnk" id="post_media_lnk" onclick="return showVideo('`+videoID+`',
				'`+videoList+`',
				{'autoplay':1,'queue':1,'user_id':`+vk.id+`,'module':'','skip_checks':false,'addParams':{'post_id':'`+postData.postRaw+`'}},
				event,
				this);"
				href="/video`+videoID+`?`+videoList+`"
				data-video="`+videoID+`"
				data-list="`+videoList+`"
				data-duration="`+videoDur+`"
				aria-label="`+videoName+`"
				>
				<div class="a post_video_title">
				`+videoName+`
				</div>
				<div class="post_video_views_count">`+getLang?.('video_showcase_N_viewers',videoViews)+`</div>
				</a>
				`;
				v?.closest('[class^="vkitPrimaryAttachment__root"]')?.parentElement?.appendChild(videoDesc);
			} catch(error) {
				console.error(error);
			}
			
		}
            }
        });
    }
}

export default oldFeed;