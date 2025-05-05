type CallbackFunc = (value: any) => void;

const getValueByPath = (root: any, path: string): any => {
  return path.split(".").reduce((obj, key) => (obj ? obj[key] : undefined), root);
};

const deferredCallbackNested = (callback: CallbackFunc, opt: { variablePath?: string; element?: string }, interval = 100) => {
  const { variablePath, element } = opt;

  let lastValue: any = undefined;

  const checkAndWatch = () => {
    let currentValue;

    if (variablePath) {
      currentValue = getValueByPath(window, variablePath);
    } else if (element) {
      currentValue = document.querySelector(element);
    } else {
      console.warn("[VK Tools] deferredCallback: Не указана переменная или элемент для отслеживания");
      return;
    }

    if (currentValue !== undefined && currentValue !== null) {
      if (lastValue !== currentValue) {
        lastValue = currentValue;
        callback(currentValue);
      }
    }

    setTimeout(checkAndWatch, interval);
  };

  checkAndWatch();
};

export default deferredCallbackNested;
