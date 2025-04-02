const handleCaptcha = (captcha: any) => {
	return new Promise(async (resolve, reject) => {
		let captchaBox: { hide: () => any } | null = null;
		const isResizedCaptchaEnabled = false;
		const src = isResizedCaptchaEnabled ? `${captcha.captcha_img}&resized=1&width=400` : captcha.captcha_img;
		const isRefreshEnabled = captcha?.is_refresh_enabled || false;
		const captchaObject = {
			imgSrc: src,
			onSubmit: (sid: any, value: any) => {
				resolve({
					captcha_sid: sid,
					captcha_key: value,
					is_sound_captcha: 0
				});
				captchaBox && captchaBox.hide();
			},
			onHide: () => {
				reject();
			}
		};
		captchaBox = showCaptchaBox(captcha.captcha_sid, false, null, captchaObject, isRefreshEnabled);
	});
};

export default handleCaptcha;
