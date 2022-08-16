import { get, post, del, put, patch } from "@/apis/request";



export const listUpload = get("/upload");

export const addUpload = post("/upload");

export const delUpload = del("/upload/:name");



export const login = post("/user/login");
export const userInfo = get("/user");


export const moreArticle = get("/article");
export const addArticle = post("/article");
export const delArticle = del("/article");
export const editArticle = put("/article/:_id");

export const moreTag = get("/tag");
export const addTag = post("/tag");
export const delTag = del("/tag");
export const editTag = put("/tag/:_id");

export const ttttttt = get("/workshop/search/docDetail?docId=ad37775b116b4b53ba1939173fed7258");