export default (service: (...args: any[]) => Promise<any>) => {
	let data = ref();
	let error = ref();
	let executing = ref(false);
	const execute = async (...args: any[]) => {
		executing.value = true;
		await service(...args)
			.then(e => (data.value = e))
			.catch(e => (error.value = e))
			.finally(() => (executing.value = false));
	};
	return {
		data,
		error,
		execute,
	};
};
