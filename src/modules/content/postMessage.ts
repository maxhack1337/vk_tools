const postMessage = (messageAction: string, messageValue?: any) => {
    if (!messageValue) {
        window.postMessage({ action: { messageAction } }, "*");
    } else {
        window.postMessage({ action: { messageAction }, value: {messageValue} }, "*");
    }
}

export default postMessage;