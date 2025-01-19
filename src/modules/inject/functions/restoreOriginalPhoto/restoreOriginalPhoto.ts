/* eslint-disable @typescript-eslint/no-unused-expressions */
const restoreOrig = async () => {
  const e = new window.MessageBox();
const getLangValue = (key: string): string | string[] | undefined => getLang?.(key);

const titleValue = getLangValue("me_attach_action_restore");
const title = Array.isArray(titleValue) 
    ? titleValue.join(", ") 
    : titleValue || "Восстановить оригинал";

const restoreButtonLabelValue = getLangValue("box_restore");
const restoreButtonLabel = Array.isArray(restoreButtonLabelValue) 
    ? restoreButtonLabelValue.join(", ") 
    : restoreButtonLabelValue || "Восстановить";

const cancelButtonLabelValue = getLangValue("box_cancel");
const cancelButtonLabel = Array.isArray(cancelButtonLabelValue) 
    ? cancelButtonLabelValue.join(", ") 
    : cancelButtonLabelValue || "Отмена";

const contentHeaderValue = getLangValue("payments_verify_start_over_header");
const contentHeader = Array.isArray(contentHeaderValue) 
    ? contentHeaderValue.join(", ")
    : contentHeaderValue || "Вы уверены?";

if (
    (await new Promise((t) => {
        e.setOptions({
            title: title,
        });
        e.addButton(restoreButtonLabel, () => {
            t(true);
        });
        e.addButton(cancelButtonLabel, () => e.hide());
        e.content(contentHeader);
        e.show();
    }),
    !cur.pvCurPhoto)
)

    return;
  const [t, a] = cur.pvCurPhoto.id.split("_").map((e: string) => parseInt(e)),
    i = cur.pvCurPhoto.peHash;
  e.showProgress(),
    window.ajax.post(
      "al_photos.php",
      {
        act: "restore_original",
        oid: t,
        pid: a,
        hash: i,
      },
      {
        onDone: async function (t: number, a: number) {
          e.hide(),
          nav.reload();
        },
      }
    );
};

export default restoreOrig;