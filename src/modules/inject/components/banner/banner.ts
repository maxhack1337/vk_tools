import createStyle from "../../createStyle";
import { getIcon24Cancel } from "../icons/getIcon24Cancel";
import { getIconGraffityArrow } from "../icons/getIconGraffityArrow";
import { getIconGraffityKitten } from "../icons/getIconGraffityKitten";
import { getIconGraffityMessage } from "../icons/getIconGraffityMessage";
import { getIconGraffityShake } from "../icons/getIconGraffityShake";
import bannerStyle from "./bannerStyle";

export interface Banner {
  id: string;
  text: string;
  canClose: boolean;
  buttonText?: string;
  buttonHref?: string;
  buttonOnclick?: string;
  icon: string;
  color: string;
  customTopMargin?: string;
  customLeftMargin?: string;
  buttonDirection?: string;
  mirror?: boolean;
}

const bannerTypeIconMap: { [key: string]: string } = {
  arrow1: getIconGraffityArrow().icon1,
  arrow2: getIconGraffityArrow().icon2,
  kitten: getIconGraffityKitten().icon,
  shake: getIconGraffityShake().icon,
  message: getIconGraffityMessage().icon,
};

const banner = ({ id, text = "", canClose = true, buttonText, buttonHref, buttonOnclick, icon, color, customTopMargin = "0px", customLeftMargin = "16px", buttonDirection = "flex-start", mirror = false }: Banner) => {
  createStyle("bannerComponent", bannerStyle());

  let mainBanner = document.createElement("div");
  mainBanner.id = id;

  let vkUiRoot = document.createElement("div");
  vkUiRoot.classList.add("vkui__root");

  let pageBlock = document.createElement("div");
  pageBlock.classList.add("page_block");

  let root = document.createElement("div");
  root.classList.add("vkToolsBannerRoot");

  let onboardingBannerRoot = document.createElement("div");
  onboardingBannerRoot.classList.add("vkToolsOnboardingBannerRoot");

  let onboardingBannerRootStretched = document.createElement("section");
  onboardingBannerRootStretched.classList.add("vkToolsOnboardingBannerRoot__stretched");

  let onboardingBannerIn = document.createElement("div");
  onboardingBannerIn.classList.add("vkToolsOnboardingBannerIn");

  let onboardingBannerContent = document.createElement("div");
  onboardingBannerContent.classList.add("vkToolsOnboardingBannerContent");

  let onboardingBannerText = document.createElement("div");
  onboardingBannerText.classList.add("vkToolsOnboardingBannerContent__text");

  let onboardingBannerTextIn = document.createElement("span");
  onboardingBannerTextIn.classList.add("vkToolsOnboardingBannerContent__textIn");
  onboardingBannerTextIn.textContent = text;

  onboardingBannerText.append(onboardingBannerTextIn);

  let onboardingBannerActions = document.createElement("div");
  onboardingBannerActions.classList.add("vkToolsOnboardingBannerActions");
  onboardingBannerActions.style.justifyContent = buttonDirection;

  let onboardingBannerActionsWrap = document.createElement("div");
  onboardingBannerActionsWrap.classList.add("vkToolsOnboardingBannerActionsWrap");

  onboardingBannerActionsWrap.innerHTML = bannerTypeIconMap[icon];
  let svg = onboardingBannerActionsWrap.querySelector("svg");
  svg!.style.marginTop = customTopMargin;
  svg!.style.marginLeft = customLeftMargin;
  svg!.style.color = color;
  if (mirror) svg!.style.transform = "scaleX(-1)";

  if (buttonText) {
    let onboardingBannerActionsButton = document.createElement("button");
    onboardingBannerActionsButton.classList.add("vkToolsOnboardingBannerActionsButton");

    let onboardingBannerActionsButtonIn = document.createElement("span");
    onboardingBannerActionsButtonIn.classList.add("vkToolsOnboardingBannerActionsButton__in");
    onboardingBannerActionsButtonIn.textContent = buttonText;
    if (buttonHref) {
      onboardingBannerActionsButton.addEventListener("click", () => {
        window.open(buttonHref);
      });
    } else if (buttonOnclick) {
      onboardingBannerActionsButton.setAttribute("onclick", buttonOnclick);
    }

    onboardingBannerActionsButton.append(onboardingBannerActionsButtonIn);
    onboardingBannerActionsWrap.prepend(onboardingBannerActionsButton);
  }

  onboardingBannerActions.append(onboardingBannerActionsWrap);
  onboardingBannerContent.append(onboardingBannerText, onboardingBannerActions);

  onboardingBannerIn.append(onboardingBannerContent);

  if (canClose) {
    let onboardingBannerAside = document.createElement("aside");
    onboardingBannerAside.classList.add("vkToolsOnboardingBannerAside");

    let onboardingBannerAsideButton = document.createElement("button");
    onboardingBannerAsideButton.classList.add("vkToolsOnboardingBannerAsideButton");
    onboardingBannerAsideButton.innerHTML = getIcon24Cancel().icon;

    onboardingBannerAsideButton.addEventListener("click", () => {
      mainBanner.remove();
      localStorage.setItem(id, "closed");
    });

    onboardingBannerAside.append(onboardingBannerAsideButton);
    onboardingBannerIn.append(onboardingBannerAside);
  }

  onboardingBannerRootStretched.append(onboardingBannerIn);
  onboardingBannerRoot.append(onboardingBannerRootStretched);
  root.append(onboardingBannerRoot);
  pageBlock.append(root);
  vkUiRoot.append(pageBlock);
  mainBanner.append(vkUiRoot);

  return mainBanner;
};

export default banner;
