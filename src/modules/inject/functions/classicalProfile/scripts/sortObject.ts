const sortObject = (obj: { [key: string]: any }, order: string[]) => {
  let sorted: { [key: string]: any } = {};
  order.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      sorted[key] = obj[key];
      delete obj[key];
    }
  });
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      sorted[key] = obj[key];
    }
  }
  return sorted;
};

export default sortObject;
