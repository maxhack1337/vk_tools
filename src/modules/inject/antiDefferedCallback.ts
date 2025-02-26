const antiDeferredCallback = (callback: any, opt: { variable?: any; element?: any }) => {
    let { variable, element } = opt;
    let updated = variable ? window[variable] : document.querySelector(element);
    if (updated) {
        setTimeout(() => {
            antiDeferredCallback(callback, opt);
        }, 10);
    } else {
        callback();
    }
};

export default antiDeferredCallback;
