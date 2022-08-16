import { merge, Progress } from "wsvaio";


const { DEV, VITE_BASE_API } = import.meta.env;
export default ({ method="get", url="/" }) => {
  const XHR = new XMLHttpRequest();

  XHR.open(method, `${DEV ? "/api" : VITE_BASE_API}${url}`);

  const auth = authStore();
  XHR.setRequestHeader("Authentication", auth.token);


  

  XHR.upload.addEventListener("loadstart", e => {
    Progress.start();
  });
  XHR.upload.addEventListener("progress", e => {
    console.log(e);
  });
  XHR.upload.addEventListener("loadend", e => {
    console.log(e);
    Progress.done();
  });
  XHR.upload.addEventListener("load", e => {

  });
  XHR.upload.addEventListener("abort", e => {

  });
  XHR.upload.addEventListener("error", e => {

  });

  XHR.upload.addEventListener("timeout", e => {

  });

  



  

  return XHR;
};



