const splitString = (str: string) => {
  const match = str.match(/^([a-zA-Z]+)(-?\d+_\d+)$/);
  if (match) {
    const type = match[1];
    const secondary_attach = match[2];
    return { type, secondary_attach };
  } else {
    return null;
  }
};

export default splitString;
