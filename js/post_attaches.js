/*Музыка на фото*/
if (localStorage.getItem("isDefaultTheme") == "true") {
deferredCallback(
  async (_vk) => {
    const originalSetStartupHandler = document.head._tq.setStartupHandler;
	console.log("[VKENH] Handlers catched!");
    document.head._tq.setStartupHandler = function (name, callback) {
        if (name === "PostContentContainer/init") {
            const wrappedCallback = function (event) {
                if (event.payload.data && event.payload.data.item && event.payload.data.item.attachments) {
                    event.payload.data.item.attachments.forEach(function(music) {
                        if(music.type === "audio" && music.style === "on_media") {
                            const newSecondaryAttach = music.audio,
                                thumb = newSecondaryAttach.thumb;
                            music.style = "compact";
                            music.compact = {
                                icons: [{
                                    name: "song_outline",
                                    sizes: []
                                }],
                                title: {
                                    text: {
                                        text: newSecondaryAttach.title
                                    }
                                },
                                description: {
                                    text: {
                                        text: newSecondaryAttach.artist
                                    }
                                }
                            };
                            if (thumb) {
                                music.compact.icons[0].sizes.push({
                                    height: 270,
                                    type: "x",
                                    width: 270,
                                    url: thumb.photo_270
                                });
                            }
                        }
						event.payload.data.item.compact_attachments_before_cut = 1;
						event.payload.data.attachmentsExpanded = true;
                    });
                }
                callback(event);
            };
            originalSetStartupHandler.call(this, name, wrappedCallback);
        } else {
            originalSetStartupHandler.apply(this, arguments);
        }
    };
  },
  { variable: "document.head._tq.setStartupHandler" }
);
}
function deferredCallback(callback, opt) {
  let { variable, element } = opt;
  let updated = variable.split('.').reduce((obj, prop) => obj && obj[prop], window);
  if (!updated) {
    setTimeout(() => {
      deferredCallback(callback, opt);
    }, 0);
  } else {
    callback(updated);
  }
}
