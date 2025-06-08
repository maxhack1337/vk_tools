const updateArrows = () => {
  let sbw = sbWidth() + 2;
  if (wkcur.wkLeft) {
    wkcur.wkLeft.style.left = "20px";
  }
  let size = getSize(wkcur.wkBox);
  let width = size[0];
  let height = size[1];
  let arrowBgW = getSize(wkcur.wkLeftArrowBg)[0];
  let arrowBgW0 = arrowBgW - 10;
  let arrowW = getSize(wkcur.wkLeftArrow)[0] || getSize(wkcur.wkRightArrow)[0];
  wkcur.wkLeftNav.style.width = Math.floor((lastWindowWidth - sbw - width) / 2) + "px";
  wkcur.wkRightNav.style.left = Math.floor((lastWindowWidth - sbw + width) / 2) + "px";
  wkcur.wkRightNav.style.width = Math.floor((lastWindowWidth - sbw - width) / 2) + "px";
  if (wkcur.wkClose) {
    wkcur.wkClose.style.left = lastWindowWidth - sbw - 37 + "px";
  }
  wkcur.wkRight.style.left = Math.floor((lastWindowWidth - sbw + width) / 2) + "px";
  let arrowActions = WkView.getNextWkRaws();
  let intro = wkcur.wkRaw === "intro";
  if (arrowActions[0] || arrowActions[1] || intro) {
    let windowHeight = browser.mobile ? window.innerHeight : lastWindowHeight;
    let arrowTop = (wkcur.wkCont.offsetHeight < windowHeight ? wkcur.wkCont.offsetTop + 10 + height / 2 : windowHeight / 2) - 8;
    if (arrowActions[0] || (intro && wkcur.introControlsCur)) {
      show(wkcur.wkLeftArrow);
      show(wkcur.wkLeftArrowBg);
      setStyle(wkcur.wkLeftArrowBg, {
        left: (lastWindowWidth - sbw - width) / 2 - arrowBgW,
      });
      setStyle(wkcur.wkLeftArrow, {
        left: (lastWindowWidth - sbw - width) / 2 - arrowBgW0 + (arrowBgW0 - arrowW) / 2,
        top: arrowTop,
      });
    } else {
      hide(wkcur.wkLeftArrow, wkcur.wkLeftArrowBg);
    }
    setStyle(wkcur.wkRight, {
      paddingBottom: (arrowTop - getXY(wkcur.wkRight, true)[1] - 24) / 2,
    });
    if (arrowActions[1] || (intro && wkcur.introControls && wkcur.introControlsCur < wkcur.introControls.length - 1)) {
      show(wkcur.wkRightArrow);
      show(wkcur.wkRightArrowBg);
      setStyle(wkcur.wkRightArrowBg, {
        left: (lastWindowWidth - sbw - width) / 2 + width,
      });
      setStyle(wkcur.wkRightArrow, {
        left: (lastWindowWidth - sbw - width) / 2 + width + (arrowBgW0 - arrowW) / 2,
        top: arrowTop,
      });
    } else {
      hide(wkcur.wkRightArrow, wkcur.wkRightArrowBg);
    }
  } else {
    hide(wkcur.wkLeftArrow, wkcur.wkLeftArrowBg, wkcur.wkRightArrow, wkcur.wkRightArrowBg);
  }
};

export default updateArrows;
