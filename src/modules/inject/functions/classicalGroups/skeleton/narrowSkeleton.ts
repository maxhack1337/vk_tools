const narrowSkeleton = () => {
  const narrowSk = document.createElement("div");
  narrowSk.classList.add("page_block", "vkToolsNarrowSkeleton");
  narrowSk.innerHTML = `<aside>
  <div class="module clear page_list_module _module" id="public_links">
    <div class="header_right_link fl_r"></div>
    <a class="module_header">
      <div class="header_top clear_fix"><span class="header_label fl_l">Ссылки</span><span class="header_count fl_l">8</span></div>
    </a>
    <div class="module_body clear_fix">
      <div class="line_cell clear_fix vkToolsLineCell">
        <a class="fl_l avaSk">
          <div class="thumb"></div>
        </a>
        <div class="fl_l desc_info">
          <div class="people_name"><a>Group name</a></div>
          <div class="group_desc"></div>
        </div>
      </div>
    </div>
  </div>
</aside>
<aside>
  <div class="module clear album_module _module" id="public_albums">
    <div class="header_right_link fl_r"></div>
    <a class="module_header">
      <div class="header_top clear_fix"><span class="header_label fl_l">Фотоальбомы</span><span class="header_count fl_l">11</span></div>
    </a>
    <div class="module_body clear_fix">
      <div class="clear_fix clear page_album_row">
        <a class="page_album_link">
          <div class="page_album_thumb_wrap"><img class="page_album_thumb"></div>

        </a>
        <a class="bg"></a>
      </div>
      <div class="clear_fix clear page_album_row">
        <a class="page_album_link">
          <div class="page_album_thumb_wrap"><img class="page_album_thumb"></div>

        </a>
        <a class="bg"></a>
      </div>
    </div>
  </div>
</aside>
<aside>
  <div class="module clear page_list_module _module" id="public_contacts">
    <div class="header_right_link fl_r"></div>
    <a class="module_header">
      <div class="header_top clear_fix"><span class="header_label fl_l">Контакты</span><span class="header_count fl_l">3</span></div>
    </a>
    <div class="module_body clear_fix">
      <div class="line_cell clear_fix vkToolsLineCell">
        <div class="fl_l thumb avaSk">
          <a><img class="cell_img"></a>
        </div>
        <div class="fl_l desc_info">
          <div class="people_name"><a>Павел Дуров</a></div>
          <div class="people_desc">Директор хлебзавода</div>
        </div>
      </div>
      <div class="line_cell clear_fix vkToolsLineCell">
        <div class="fl_l thumb avaSk">
          <a><img class="cell_img"></a>
        </div>
        <div class="fl_l desc_info">
          <div class="people_name"><a>Павел Дуров</a></div>
          <div class="people_desc">Директор хлебзавода</div>
        </div>
      </div>
      <div class="line_cell clear_fix vkToolsLineCell">
        <div class="fl_l thumb avaSk">
          <a><img class="cell_img"></a>
        </div>
        <div class="fl_l desc_info">
          <div class="people_name"><a>Павел Дуров</a></div>
          <div class="people_desc">Директор хлебзавода</div>
        </div>
      </div>
    </div>
  </div>
</aside>`;

  return narrowSk;
};

export default narrowSkeleton;
