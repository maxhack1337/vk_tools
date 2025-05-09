const profileShort = () => {
  let pageCurrentInfo = document.querySelector(".ProfileInfo");
  let profileShortSc = document.createElement("div");
  profileShortSc.classList.add("profile_info", "profile_info_short", "vkToolsProfileShortSkeleton");
  profileShortSc.id = "profile_short";
  profileShortSc.innerHTML = `
    <div class="clear_fix profile_info_row">
    <div class="label first fl_l">------------------------------------</div>
    <div class="labeled"><a class="num">27 марта </a><a class="num padd">2001 г.</a></div>
  </div>
  <div class="clear_fix profile_info_row">
    <div class="label second fl_l">-------------------------------</div>
    <div class="labeled"><a class="num">11 октября 2012 (09:47)</a></div>
  </div>
  <div class="clear_fix profile_info_row">
    <div class="label third fl_l">------------------------</div>
    <div class="labeled"><a class="num">---------------</a></div>
  </div>
  <div class="profile_more_info"><a class="profile_more_info_link"><span class="profile_label_more" style="display: flex;">Показать подробную информацию</span><span class="profile_label_less">Скрыть подробную информацию</span></a></div>
    <div class="counts_module">
      <a class="counter">
        <div class="value">5</div>
        <div class="label">-----------------------</div>
      </a>
      <a class="counter">
        <div class="value">100</div>
        <div class="label">----------</div>
      </a>
      <a class="counter">
        <div class="value">1000</div>
        <div class="label">--------------------</div>
      </a>
      <a class="counter">
        <div class="value">5</div>
        <div class="label">----------</div>
      </a>
      <a class="counter">
        <div class="value">5000</div>
        <div class="label">видео</div>
      </a>
    </div>`;
  pageCurrentInfo?.append(profileShortSc);
};

export default profileShort;
