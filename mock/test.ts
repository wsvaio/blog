import { MockMethod } from "vite-plugin-mock";

export default [

  {
    url: "/mock/list",
    method: "post",
    response: {
      code: 200,
      data: {
        page: 1, pageSize: 10, count: 20,
        items: [
          { id: 1, name: 'a' },
          { id: 2, name: 'b' },
          { id: 3, name: 'c' },
          { id: 4, name: 'd' },
          { id: 5, name: 'e' },
          { id: 6, name: 'f' },
          { id: 7, name: 'h' },
          { id: 8, name: 'i' },
          { id: 9, name: 'j' },
          { id: 10, name: 'k' },
        ]
      },
      msg: "操作成功"
    }
  }

] as MockMethod[];