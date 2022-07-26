import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElIconModules from "@element-plus/icons-vue";
import { App } from 'vue';


export default (app: App) => {

  for (let [name, module] of Object.entries<T>(ElIconModules)) {
    app.component("i" + name, module);
  }
  app.use(ElementPlus, { locale: zhCn });
};

