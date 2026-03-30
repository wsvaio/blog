export default (service: (...args: any[]) => Promise<any>) => {
  const data = ref();
  const error = ref();
  const executing = ref(false);
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
