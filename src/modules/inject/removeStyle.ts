import fromId from "../content/fromId";

const removeStyle = (style: string) => {
  const customStyle = fromId(style);
  if (customStyle) {
    customStyle.remove();
  }
};

export default removeStyle;
