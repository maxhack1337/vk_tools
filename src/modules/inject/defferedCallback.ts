const deferredCallback = (callback: any, opt: { variable: any; element?: any; }) => {
  let { variable, element } = opt;
  let updated = variable ? window[variable] : document.querySelector(element);
  if (!updated) {
    setTimeout(() => {
      deferredCallback(callback, opt);
    }, 10);
  } else {
    callback(updated);
  }
}

export default deferredCallback;