
import waitCurPoster from './waitCurPoster';
import listener from '../oldPosting/listener';
import listenCurPoster from './listenCurPoster';

type CallbackFunc<T> = (value: T) => void;

const listen = <Key extends keyof any, T = any[Key]>(fieldName: Key) => {
	const interaction = new listener<CallbackFunc<T>>();

	const hookField = (curValue: any) => {
		let fieldValue = curValue[fieldName];

		Object.defineProperty(curValue, fieldName, {
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

	const hookFieldWithCur = async () => {
		await waitCurPoster();

		if (window.cur.poster) {
			hookField(window.cur.poster);
		}

		listenCurPoster((newCur: any) => {
			hookField(newCur);
		});
	};

	let inited = false;
	const onAddNewCallback = async (callback: CallbackFunc<T>) => {
		if (!inited) {
			inited = true;
			await hookFieldWithCur();
		}

		await waitCurPoster();

		callback(window.cur.poster[fieldName] as T);
	};

	const onChangeField = (callback: CallbackFunc<T>) => {
		const listener = interaction.addListener(callback);

		onAddNewCallback(callback);

		return listener;
	};

	return onChangeField;
};

export default listen;
