type HookInterceptor<TArgs extends any[], TReturn> = (pre: {
	args: TArgs;
	abort: (value: TReturn | Promise<TReturn>) => void;
	modifyArgs: (newArgs: TArgs) => void;
}) => ((result: TReturn) => TReturn | Promise<TReturn>) | void | Promise<void>;
/**
 * Функция для перехвата (hook) другой функции.
 * Позволяет модифицировать аргументы, прерывать выполнение,
 * изменять результат или выполнять дополнительную логику до/после вызова оригинальной функции.
 *
 * @template TArgs - Тип массива аргументов оригинальной функции.
 * @template TReturn - Тип возвращаемого значения оригинальной функции.
 * @template TThis - Тип контекста (`this`) оригинальной функции.
 *
 * @param {function(this: TThis, ...args: TArgs): TReturn} originalFn - Оригинальная функция, которую нужно перехватить.
 * @param {function(pre: {
 *   args: TArgs; // Аргументы, переданные в оригинальную функцию.
 *   abort: (value: TReturn | Promise<TReturn>) => void; // Функция для прерывания выполнения и возврата значения.
 *   modifyArgs: (newArgs: TArgs) => void; // Функция для изменения аргументов.
 * }): ((result: TReturn) => TReturn | Promise<TReturn>) | void | Promise<void>} interceptor - Функция-интерсептор,
 * которая выполняется перед вызовом оригинальной функции. Может:
 *   - Изменять аргументы через `modifyArgs`.
 *   - Прерывать выполнение через `abort`.
 *   - Возвращать постобработчик результата (функция, которая принимает результат оригинальной функции и возвращает новый результат).
 *
 * @returns {function(this: TThis, ...args: TArgs): TReturn | Promise<TReturn>} - Перехваченная функция,
 * которая может быть вызвана как обычная функция. Поддерживает синхронные и асинхронные операции.
 *
 * @example
 * // Пример 1: Изменение аргументов и результата
 * const sum = (a, b) => a + b;
 * const hookedSum = hook(sum, (pre) => {
 *   pre.modifyArgs([10, 20]); // Изменяем аргументы
 *   return (result) => result * 2; // Модифицируем результат
 * });
 * console.log(hookedSum(5, 5)); // Вывод: 60
 *
 * @example
 * // Пример 2: Прерывание выполнения
 * const hookedSum2 = hook(sum, (pre) => {
 *   pre.abort(100); // Прерываем выполнение, возвращаем 100
 * });
 * console.log(hookedSum2(1, 2)); // Вывод: 100
 *
 * @example
 * // Пример 3: Работа с контекстом (this)
 * const obj = {
 *   value: 42,
 *   method() { return this.value; }
 * };
 * const hookedMethod = hook(obj.method, (pre) => {
 *   return (result) => result * 2;
 * });
 * console.log(hookedMethod.call(obj)); // Вывод: 84
 */
export function hook<TArgs extends any[], TReturn, TThis = any>(
	originalFn: (this: TThis, ...args: TArgs) => TReturn,
	interceptor: HookInterceptor<TArgs, TReturn>
): (this: TThis, ...args: TArgs) => TReturn | Promise<TReturn> {
	return async function (this: TThis, ...args: TArgs): Promise<TReturn> {
		let modifiedArgs: TArgs = args.slice() as TArgs;
		let shouldProceed = true;
		let returnValue: TReturn | Promise<TReturn> | undefined = undefined;
		const pre = {
			args: modifiedArgs,
			abort: (value: TReturn | Promise<TReturn>) => {
				shouldProceed = false;
				returnValue = value;
			},
			modifyArgs: (newArgs: TArgs) => {
				modifiedArgs = newArgs;
			}
		};
		const postHandler = interceptor(pre);
		if (!shouldProceed) {
			return returnValue as TReturn | Promise<TReturn>;
		}
		const originalResult = originalFn.apply(this, modifiedArgs);
		const resolvedResult = await (originalResult instanceof Promise ? originalResult : Promise.resolve(originalResult));
		if (typeof postHandler === "function") {
			return postHandler(resolvedResult);
		}

		return resolvedResult;
	};
}
