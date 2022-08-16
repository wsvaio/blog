import { App as app } from "vue";
import { DialogProps, DrawerProps, FormProps } from "element-plus";

declare module "vue" {
  export interface GlobalComponents {

    RouterView: typeof import("vue-router")["RouterView"];
    RouterLink: typeof import("vue-router")["RouterLink"];

  }
}

declare global {

  type drawerType = Read<Partial<DrawerProps>> & obj & { show: boolean, slot: string };
  type dialogType = Read<Partial<DialogProps>> & obj & { show: boolean, slot: string };
  type formType = Read<Partial<FormProps>> & obj;

  type vtableCtx = {
    params: obj;
    checkList: obj[];
    form: obj;
    drawer: drawerType;
    dialog: dialogType;
    formProps: formType;
    submit: (title?: any) => void;
  };

  type App = app;
}

export { };
