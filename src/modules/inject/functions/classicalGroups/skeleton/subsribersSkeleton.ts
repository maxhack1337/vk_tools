const subsribersSkeleton = () => {
  const subsSkeleton = document.createElement("div");
  subsSkeleton.classList.add("page_block", "vkToolsFollowersBlock1", "vkToolsSkeleton");
  subsSkeleton.innerHTML = `
    <aside>
  <div class="module clear people_module _module" id="public_followers">
    <div class="header_right_link fl_r"></div>
    <a class="module_header">
      <div class="header_top clear_fix"><span class="header_label fl_l">Подписчики</span><span class="header_count fl_l">4<span class="num_delim"> </span>444<span class="num_delim"> </span>444</span>
      </div>
    </a>
    <div class="module_body clear_fix vkToolsModuleBodySubs">
      <div class="people_row">
        <div class="people_cell">
          <a class="people_cell_ava"><img class="people_cell_img"><span class="blind_label">.</span></a>
          <div class="people_cell_name"><a>Виктория</a></div>
        </div>
        <div class="people_cell">
          <a class="people_cell_ava"><img class="people_cell_img"><span class="blind_label">.</span></a>
          <div class="people_cell_name"><a>Виктория</a></div>
        </div>
        <div class="people_cell">
          <a class="people_cell_ava"><img class="people_cell_img"><span class="blind_label">.</span></a>
          <div class="people_cell_name"><a>Виктория</a></div>
        </div>
      </div>
      <div class="people_row">
        <div class="people_cell">
          <a class="people_cell_ava"><img class="people_cell_img"><span class="blind_label">.</span></a>
          <div class="people_cell_name"><a>Виктория</a></div>
        </div>
        <div class="people_cell">
          <a class="people_cell_ava"><img class="people_cell_img"><span class="blind_label">.</span></a>
          <div class="people_cell_name"><a>Виктория</a></div>
        </div>
        <div class="people_cell">
          <a class="people_cell_ava"><img class="people_cell_img"><span class="blind_label">.</span></a>
          <div class="people_cell_name"><a>Виктория</a></div>
        </div>
      </div>
    </div>
  </div>
</aside>
    `;

  return subsSkeleton;
};

export default subsribersSkeleton;
