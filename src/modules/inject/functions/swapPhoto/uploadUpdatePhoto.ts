const uploadUpdatePhoto = async(uploadUrl: string | URL, fileNameOutput: string | Blob): Promise<string> => {
  const formData = new FormData();
  formData.append("file", fileNameOutput);
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(new Error("Upload failed. Status: " + xhr.status));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Upload failed. Network error"));
    };

    xhr.open("POST", uploadUrl);
    xhr.send(formData);
  });
}

export default uploadUpdatePhoto;