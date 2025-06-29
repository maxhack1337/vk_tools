const showCaptchaBoxApi = async (url: string) => {
  let box = new (await vkidCaptcha).CaptchaWidget();
  try {
    let successToken = await box.show({
      iframeSrc: url,
      container: document.body,
      view: "popup",
      onClose: () => {},
    });

    return successToken;
  } catch (error) {
    return "failed";
  }
};

export default showCaptchaBoxApi;
