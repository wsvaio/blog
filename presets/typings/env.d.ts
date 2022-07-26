
declare module "*.vue" {
  import type { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

declare module "*.md" {
  import type { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

type T = any;
type obj = { [k: string]: any; };
type keys<K extends keyof any, T = any> = {
  [P in K]: T;
} & obj;


type Read<T> = {
  -readonly [K in keyof T]: T[K]
};


