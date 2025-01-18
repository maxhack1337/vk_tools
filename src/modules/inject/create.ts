const create = (
  name: string,
  styles: { [key: string]: string },
  options: { [key: string]: any; id?: string }
) => {
  const tmp = document.createElement(name);

  if (styles) {
    Object.keys(styles).forEach((style_) => {
      (tmp.style as any)[style_] = styles[style_]; 
    });
  }

  if (options) {
    Object.keys(options).forEach((option_) => {
      (tmp as any)[option_] = options[option_]; 
    });
  }

  return tmp;
}

export default create;