const uploadFile123 = async(uploadUrl: string | URL | Request, file: string | Blob) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Upload failed. Status: " + response.status);
        }
      } catch (error) {
        throw new Error("Upload failed. Network error: " + error);
      }
}
    
export default uploadFile123;