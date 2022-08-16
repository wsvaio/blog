import { dateFormat, merge, Progress, DeepPartial } from "wsvaio";



const { DEV, VITE_BASE_API } = import.meta.env;
export default (options: DeepPartial<XMLHttpRequest> & {method?: string, url: string}) => {
  const { method="get", url } = options;
  const auth = authStore();
  const progress = reactive({
    upload: <ProgressEvent<XMLHttpRequestEventTarget>>{},
    download: <ProgressEvent<XMLHttpRequestEventTarget>>{}
  });

  const loading = ref(false);
  const data = ref();
  const error = ref<ProgressEvent<XMLHttpRequestEventTarget>>();
  const XHR = ref<XMLHttpRequest>();

  return {
    progress, XHR,
    loading, data, error,
    run: body => new Promise((resolve, reject) => {
      error.value = undefined;
      data.value = undefined;
      const xhr = new XMLHttpRequest();
      XHR.value = xhr;
      xhr.open(method, `${DEV ? "/api" : VITE_BASE_API}${url}`);
      xhr.setRequestHeader("Authentication", auth.token);
      merge<T>(xhr, options, {deep: 2});
      xhr.upload.addEventListener("loadstart", e => {    
        progress.upload = e;
        loading.value = true;
        Progress.start();
      });
      xhr.upload.addEventListener("progress", e => {
        progress.upload = e;
      });
      xhr.upload.addEventListener("loadend", e => {
        progress.upload = e;
      });
      xhr.upload.addEventListener("load", e => {
        
      });

      xhr.addEventListener("loadstart", e => {
        progress.download = e;
      });
      xhr.addEventListener("progress", e => {
        progress.download = e;
      });
      xhr.addEventListener("loadend", e => {
        progress.download = e;
        loading.value = false;
        Progress.done();
        resolve(xhr);
        if (!DEV) return;
        console.groupCollapsed(`%c ${dateFormat(String(new Date()))} %c ${options.method} %c ${options.url} %c ${xhr.status} ${xhr.statusText || error.value?.type} `,
          "font-size: 16px; font-weight: 100; color: white; background: #909399; border-radius: 3px 0 0 3px;",
          "font-size: 16px; font-weight: 100; color: white; background: #E6A23C;",
          "font-size: 16px; font-weight: 100; color: white; background: #409EFF;",
          `font-size: 16px; font-weight: 100; color: white; background: ${xhr.status == 200 ? "#67C23A" : "#F56C6C"}; border-radius: 0 3px 3px 0;`,
        );
        error.value && console.log(error.value);
        console.log(xhr);
        console.groupEnd();
      });
      xhr.addEventListener("load", e => {
        if (xhr.status != 200) error.value = e;  
        else data.value = xhr.response;
      });

      

      xhr.upload.addEventListener("abort", e => {
        error.value = e;
      });
      xhr.upload.addEventListener("error", e => {
        error.value = e;
      });
      xhr.upload.addEventListener("timeout", e => {
        error.value = e;
      });


      xhr.addEventListener("abort", e => {
        error.value = e;
      });
      xhr.addEventListener("error", e => {
        error.value = e;
      });
      xhr.addEventListener("timeout", e => {
        error.value = e;
      });

      xhr.send(body);
    })
  };
};



