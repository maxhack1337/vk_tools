const isDragAndDropAvailable = () => {
  const b = browser;
  const bv = floatval(browser.version);
  if (!((b.msie && bv >= 9) || (b.mozilla && bv >= 3.5) || b.chrome || b.safari)) {
    return false;
  }
  const w = window as any;
  return Boolean((w.XMLHttpRequest || w.XDomainRequest) && (w.FormData || (w.FileReader && ((w.XMLHttpRequest && w.sendAsBinary) || (w.ArrayBuffer && w.Uint8Array && (w.MozBlobBuilder || w.WebKitBlobBuilder || w.BlobBuilder))))));
};

export default isDragAndDropAvailable;
