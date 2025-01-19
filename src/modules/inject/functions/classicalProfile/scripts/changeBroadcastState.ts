const changeBroadcastState = async() => {
        let expVa = await ajax.promisifiedPost(
          "al_audio.php?act=status_tt",
          {}
        );
        let expVal = expVa[1].is_profile_active;
        let j = ap.getCurrentAudio();
        let o;
        try {
          o = `${j[1]}_${j[0]}`;
        } catch (error) {
          return;
        }
        await ajax.promisifiedPost("al_audio.php?act=toggle_status", {
          exp: +!expVal,
          oid: window.vk.id,
          hash: window.vk.statusExportHash,
          id: o,
          top: 0,
          access_key: "",
        });
        let statusVK = document.querySelector(".page_current_info");
        statusVK?.remove();
}
      
export default changeBroadcastState;