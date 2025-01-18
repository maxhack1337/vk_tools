/* eslint-disable @typescript-eslint/no-unused-expressions */
const restoreOrig = async () => {
  const e = new window.MessageBox();
  if (
    (await new Promise((t) => {
      e.setOptions({
        title: getLang?.("me_attach_action_restore") || "Восстановить оригинал",
      }),
        e.addButton(getLang?.("box_restore") || "Восстановить", () => {
          t(!0);
        }),
        e.addButton(getLang?.("box_cancel") || "Отмена", () => e.hide()),
        e.content(getLang?.("payments_verify_start_over_header") || "Вы уверены?"),
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