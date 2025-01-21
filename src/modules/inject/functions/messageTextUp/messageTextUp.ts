const messageTextUp = () => {
    if (localStorage.getItem("isMessageTextUp") === 'true') {
        const selectorsMessage = ['.ConvoMessageWithoutBubble__content', '.ConvoMessage__content'];
        document.arrive(
            selectorsMessage.join(', '),
            { existing: true },
            (e: Element) => {
                const messageAttachment = e.querySelector('.ConvoMessageWithoutBubble__mediaAttachments') || e.querySelector('.ConvoMessage__mediaAttachments');
                const messageText = e.querySelector('.ConvoMessageWithoutBubble__text') || e.querySelector('.ConvoMessage__text');
                if (messageAttachment && messageText) e.insertBefore(messageText, messageAttachment);
            });
    
        const selectorsForward = ['.ForwardedMessageNew__content'];
        document.arrive(
            selectorsForward.join(', '),
            { existing: true },
            (e: Element) => {
                const fwdMessageAttachment = e.querySelector('.ForwardedMessageNew__mediaAttachments');
                const fwdMessageText = e.querySelector('.ForwardedMessageNew__text');
                if (fwdMessageAttachment && fwdMessageText) e.insertBefore(fwdMessageText, fwdMessageAttachment);
            });
    
        const selectorsWallAttach = ['.AttachWallNew__content'];
        document.arrive(
            selectorsWallAttach.join(', '),
            { existing: true },
            (e: Element) => {
                const wallAttaches = e.querySelector('.AttachWallNew__attaches');
                const wallHeader = e.querySelector('.AttachWallNew__header');
                const wallText = e.querySelector('.AttachWallNew__message');
                if (wallAttaches && wallHeader && wallText) e.prepend(wallHeader, wallText);
            });
    }
}

export default messageTextUp;