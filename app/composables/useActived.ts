export default () => {
  const isActived = ref(true);
  onActivated(() => (isActived.value = true));
  onDeactivated(() => (isActived.value = false));
  return isActived;
};
