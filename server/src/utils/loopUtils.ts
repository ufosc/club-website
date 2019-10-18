export default class LoopUtils {
	public static async asyncForEach(array: any[], callback: (arg1: any, arg2: number, arg3: any[]) => any) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array);
		}
	}
}
