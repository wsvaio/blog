import { onBeforeRouteLeave } from "vue-router";

export default () => {

  let isActivated = $ref(true);

  onActivated(() => isActivated = true);

  onDeactivated(() => isActivated = false);

  onBeforeRouteLeave((to, from, next) => {
    isActivated = false;
    next();
  });


  return $$({ isActivated })
}