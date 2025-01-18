const getLocalValue = (item: string) => {
  let store = localStorage.getItem(item) || 'undefined';
  return store !== "undefined" && JSON.parse(store);
}

export default getLocalValue;