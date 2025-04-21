const writeString = (view: any, offset: any, string: any) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

export default writeString;
