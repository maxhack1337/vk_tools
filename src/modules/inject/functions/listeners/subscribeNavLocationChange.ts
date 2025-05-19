const subscribeNavLocationChange = (callback: any) => {
  return window.nav.onLocationChange(callback);
};

export default subscribeNavLocationChange;
