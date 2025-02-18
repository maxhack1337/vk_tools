
import waitVK from '../listeners/waitVK';
import listener from './listener';
import listenVK from './listenVK';

type CallbackFunc<T> = (value: T) => void;

const listen = <Key extends keyof any, T = any[Key]>(fieldName: Key) => {
	const interaction = new listener<CallbackFunc<T>>();

	const hookField = (vkValue: any) => {
		let fieldValue = vkValue[fieldName];

		Object.defineProperty(vkValue, fieldName, {
			get: () => fieldValue,
			set: (newValue) => {
				fieldValue = newValue;

				for (const callback of interaction.listeners) {
					try {
						callback(fieldValue as T);
					} catch (e) {
						console.error(e);
					}
				}

				return true;
			},
			configurable: true,
			enumerable: true,
		});
	};

	const hookFieldWithVK = async () => {
		await waitVK();

		if (window.vk) {
			hookField(window.vk);
		}

		listenVK((newVk: any) => {
			hookField(newVk);
		});
	};

	let inited = false;
	const onAddNewCallback = async (callback: CallbackFunc<T>) => {
		if (!inited) {
			inited = true;
			await hookFieldWithVK();
		}

		await waitVK();

		callback(window.vk[fieldName] as T);
	};

	const onChangeField = (callback: CallbackFunc<T>) => {
		const listener = interaction.addListener(callback);

		onAddNewCallback(callback);

		return listener;
	};

	return onChangeField;
};

export default listen;
