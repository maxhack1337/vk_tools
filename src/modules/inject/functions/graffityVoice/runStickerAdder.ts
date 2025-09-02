const runStickerAdder = (id: string, sticker_id: string, hash: string, type: string, second_attach: string) => {
  fetch(`https://${vk.__domain || "vk.ru"}/al_im.php?act=a_send`, {
    headers: {
      accept: "*/*",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      pragma: "no-cache",
      "sec-ch-ua": '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: `https://${vk.__domain || "vk.ru"}/im?sel=` + id,
    referrerPolicy: "strict-origin-when-cross-origin",
    body:
      "act=a_send&al=1&cancelled_shares[0]=sticker%2C" +
      sticker_id +
      "&entrypoint=list_all&gid=0&guid=" +
      Math.floor(Math.random() * 2147483647) +
      "&hash=" +
      hash +
      "&im_v=3&media=sticker%3A" +
      sticker_id +
      "%3Aundefined%2C" +
      type +
      "%3A" +
      second_attach +
      "%3Aundefined&module=im&msg=&random_id=" +
      Math.floor(Math.random() * 2147483647) +
      "&to=" +
      id,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
};

export default runStickerAdder;
