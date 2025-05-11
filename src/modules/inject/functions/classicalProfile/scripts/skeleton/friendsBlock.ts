const friendsBlock = () => {
  let friendsSkeleton = document.createElement("section");
  friendsSkeleton.classList.add("vkToolsFriendsSkeleton", "vkuiGroup__modeCard", "vkEnhancerProfileFriends");
  friendsSkeleton.style.padding = "0px";
  friendsSkeleton.innerHTML = `<div class="vkEnhancerMutualFriends">
  <div tabindex="0" role="button" data-allow-link-onclick-web="1" class="vkuiHeader__host vkuiHeader__sizeM vkuiHeader__pi vkuiRootComponent__host ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
    <div data-allow-link-onclick-web="1" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
      <div class="vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
        <div class="vkuiHeader__main">
          <div class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1">
            <span class="vkuiHeader__content-in">
              <div class="Header-module__content--F5x_X">
                <div class="TextClamp-module__singleLine--mRCrF">------------------------</div>
              </div>
            </span>
            <span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">----</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="ProfileGroupHorizontalCells">
    <div class="vkuiHorizontalCell__host vkuiHorizontalCell__sizeS vkuiHorizontalCell__sized vkuiHorizontalCell__noPadding ProfileFriends__item HorizontalCell-module__root--XStwI HorizontalCell-module__rootSizeS--JwyO0">
      <div class="vkuiHorizontalCell__body vkuiInternalTappable vkuiTappable__host vkuiTappable__hasPointerNone vkuiClickable__host vkuiClickable__realClickable vkuistyles__-focus-visible vkuiRootComponent__host vkEnhancerFriend">
        <div class="vkuiHorizontalCell__image">
          <div class="vkuiAvatar__host vkuiInternalRichAvatar vkuiImageBase__host vkuiImageBase__loaded vkuiClickable__host vkuiRootComponent__host" style="width: 52px; height: 52px;">
          </div>
        </div>
        <div class="vkuiHorizontalCell__content vkuiHorizontalCell__textAlignCenter">
          <span class="vkuiCaption__sizeYCompact vkuiCaption__level1 vkuiTypography__host vkuiTypography__normalize vkuiRootComponent__host">
            <div class="TextClamp-module__singleLine--mRCrF">VK Tools</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
<div data-allow-link-onclick-web="1" class="Header-module__tappable--mabke ProfileGroupHeader vkuiTappable vkuiInternalTappable vkuiTappable--hasActive vkui-focus-visible">
  <div style="padding:7px 0 0 17px;" class="vkEnhancerFriendsPadding vkuiHeader vkuiHeader--mode-primary vkuiHeader--pi Header-module__header--a6Idw Header-module__headerPrimary--mmJ1C" role="heading" aria-level="2">
    <div class="vkuiHeader__main">
      <div class="vkEnhancerFrenBox vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__content vkuiHeadline--sizeY-compact vkuiHeadline--level-1">
        <span class="vkuiHeader__content-in">
            <div class="Header-module__content--F5x_X">
              <div class="TextClamp-module__singleLine--mRCrF">--------------</div>
            </div>
          </span>
        <span class="vkuiTypography vkuiTypography--normalize vkuiTypography--weight-2 vkuiHeader__indicator vkuiFootnote">----</span>
        <span class="decoration" style="margin-left: auto; margin-right: 23px; color: var(--vkui--color_text_secondary);">----------------------------</span>
      </div>
    </div>
    <span class="vkuiTypography vkuiHeader__aside vkuiParagraph"></span>
  </div>
</div>
<div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
<div class="ProfileGroupHorizontalCells vkEnhancerHorizontalCells">
  <div class="PrimaryCells">
    <div class="vkuiHorizontalCell__host vkuiHorizontalCell__sizeS vkuiHorizontalCell__sized vkuiHorizontalCell__noPadding">
      <div class="vkuiHorizontalCell__body vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible vkEnhancerFriend">
        <div class="vkuiHorizontalCell__image">
          <div class="vkuiAvatar__host vkuiInternalRichAvatar vkuiImageBase__host vkuiImageBase__loaded vkuiClickable__host vkuiRootComponent__host" style="width: 52px; height: 52px;">
          </div>
        </div>
        <div class="vkuiHorizontalCell__content vkuiHorizontalCell__textAlignCenter">
          <span class="vkuiCaption__sizeYCompact vkuiCaption__level1 vkuiTypography__host vkuiTypography__normalize vkuiRootComponent__host">
              <div class="TextClamp-module__singleLine--mRCrF">VK Tools</div>
            </span>
        </div>
      </div>
    </div>
    <div class="vkuiHorizontalCell__host vkuiHorizontalCell__sizeS vkuiHorizontalCell__sized vkuiHorizontalCell__noPadding">
      <div class="vkuiHorizontalCell__body vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible vkEnhancerFriend">
        <div class="vkuiHorizontalCell__image">
          <div class="vkuiAvatar__host vkuiInternalRichAvatar vkuiImageBase__host vkuiImageBase__loaded vkuiClickable__host vkuiRootComponent__host" style="width: 52px; height: 52px;">
          </div>
        </div>
        <div class="vkuiHorizontalCell__content vkuiHorizontalCell__textAlignCenter">
          <span class="vkuiCaption__sizeYCompact vkuiCaption__level1 vkuiTypography__host vkuiTypography__normalize vkuiRootComponent__host">
              <div class="TextClamp-module__singleLine--mRCrF">VK Tools</div>
            </span>
        </div>
      </div>
    </div>
    <div class="vkuiHorizontalCell__host vkuiHorizontalCell__sizeS vkuiHorizontalCell__sized vkuiHorizontalCell__noPadding">
      <div class="vkuiHorizontalCell__body vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible vkEnhancerFriend">
        <div class="vkuiHorizontalCell__image">
          <div class="vkuiAvatar__host vkuiInternalRichAvatar vkuiImageBase__host vkuiImageBase__loaded vkuiClickable__host vkuiRootComponent__host" style="width: 52px; height: 52px;">
          </div>
        </div>
        <div class="vkuiHorizontalCell__content vkuiHorizontalCell__textAlignCenter">
          <span class="vkuiCaption__sizeYCompact vkuiCaption__level1 vkuiTypography__host vkuiTypography__normalize vkuiRootComponent__host">
              <div class="TextClamp-module__singleLine--mRCrF">VK Tools</div>
            </span>
        </div>
      </div>
    </div>
    <div class="vkuiHorizontalCell__host vkuiHorizontalCell__sizeS vkuiHorizontalCell__sized vkuiHorizontalCell__noPadding">
      <div class="vkuiHorizontalCell__body vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible vkEnhancerFriend">
        <div class="vkuiHorizontalCell__image">
          <div class="vkuiAvatar__host vkuiInternalRichAvatar vkuiImageBase__host vkuiImageBase__loaded vkuiClickable__host vkuiRootComponent__host" style="width: 52px; height: 52px;">
          </div>
        </div>
        <div class="vkuiHorizontalCell__content vkuiHorizontalCell__textAlignCenter">
          <span class="vkuiCaption__sizeYCompact vkuiCaption__level1 vkuiTypography__host vkuiTypography__normalize vkuiRootComponent__host">
              <div class="TextClamp-module__singleLine--mRCrF">VK Tools</div>
            </span>
        </div>
      </div>
    </div>
    <div class="vkuiHorizontalCell__host vkuiHorizontalCell__sizeS vkuiHorizontalCell__sized vkuiHorizontalCell__noPadding">
      <div class="vkuiHorizontalCell__body vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible vkEnhancerFriend">
        <div class="vkuiHorizontalCell__image">
          <div class="vkuiAvatar__host vkuiInternalRichAvatar vkuiImageBase__host vkuiImageBase__loaded vkuiClickable__host vkuiRootComponent__host" style="width: 52px; height: 52px;">
          </div>
        </div>
        <div class="vkuiHorizontalCell__content vkuiHorizontalCell__textAlignCenter">
          <span class="vkuiCaption__sizeYCompact vkuiCaption__level1 vkuiTypography__host vkuiTypography__normalize vkuiRootComponent__host">
              <div class="TextClamp-module__singleLine--mRCrF">VK Tools</div>
            </span>
        </div>
      </div>
    </div>
    <div class="vkuiHorizontalCell__host vkuiHorizontalCell__sizeS vkuiHorizontalCell__sized vkuiHorizontalCell__noPadding">
      <div class="vkuiHorizontalCell__body vkuiTappable vkuiInternalTappable vkuiTappable--hasHover vkuiTappable--hasActive vkui-focus-visible vkEnhancerFriend">
        <div class="vkuiHorizontalCell__image">
          <div class="vkuiAvatar__host vkuiInternalRichAvatar vkuiImageBase__host vkuiImageBase__loaded vkuiClickable__host vkuiRootComponent__host" style="width: 52px; height: 52px;">
          </div>
        </div>
        <div class="vkuiHorizontalCell__content vkuiHorizontalCell__textAlignCenter">
          <span class="vkuiCaption__sizeYCompact vkuiCaption__level1 vkuiTypography__host vkuiTypography__normalize vkuiRootComponent__host">
              <div class="TextClamp-module__singleLine--mRCrF">VK Tools</div>
            </span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="vkuiSpacing" style="height: 4px; padding: 2px 0px;"></div>
</div>`;

  return friendsSkeleton;
};

export default friendsBlock;
