const getImSendHash = (peerId: string, callback: any) => {
  const request = ajax.post("al_im.php", {
    act: "a_renew_hash",
    peers: peerId,
  });

  request.onload = function () {
    try {
      const response = JSON.parse(request.response);
      const hashValue = response.payload[1][0][peerId];
      callback(null, hashValue);
    } catch (e) {
      callback(e);
    }
  };

  request.onerror = function () {
    callback(new Error("Network error"));
  };
};

export default getImSendHash;
