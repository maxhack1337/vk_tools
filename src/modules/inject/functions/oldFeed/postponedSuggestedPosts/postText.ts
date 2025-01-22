const postText = () => {
    let selectorsText = [`.postponed.Post--redesignV3 [class^='vkitPostText__root']`, `.suggest.Post--redesignV3 [class^='vkitPostText__root']`];
    document.arrive(selectorsText.join(', '), { existing: true }, async function (e) {
        if (!e.querySelector('.PostCopyQuote--redesignV3')) {
            try {
                let postText = e.parentElement!;
                let postContent = e.closest('[class^="PostContentContainer__contentContainer"]');
                postText.style.padding = "0px 20px";
                let postTextStyler = postText.querySelector('[class^="vkitPostText__root"]') as HTMLElement;
                postTextStyler.style.fontSize = "13px";
                postTextStyler.style.lineHeight = "1.462";
                e.parentElement?.remove();
                postContent?.prepend(postText);
            }
            catch (error) {
                console.log(error);
            }
        }
    });
}

export default postText;