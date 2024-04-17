export default eventHandler(async () => {
  const appid = "wx4388b2d899de77a5";
  const secret = "37e1763b071b82afe14cb833d2ab284e";

  const { access_token } = await fetch(
		`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
  ).then(data => data.json());
  return await fetch(`https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=${access_token}`, {
    method: "post",
    body: JSON.stringify({
      button: [
        {
          type: "click",
          name: "今日歌曲",
          key: "V1001_TODAY_MUSIC"
        },
        {
          name: "菜单",
          sub_button: [
            {
              type: "view",
              name: "搜索",
              url: "http://www.soso.com/"
            },
            {
              type: "miniprogram",
              name: "wxa",
              url: "http://mp.weixin.qq.com",
              appid: "wx286b93c14bbf93aa",
              pagepath: "pages/lunar/index"
            },
            {
              type: "click",
              name: "赞一下我们",
              key: "V1001_GOOD"
            }
          ]
        }
      ],
      matchrule: {
        tag_id: "2",
        sex: "1",
        country: "中国",
        province: "广东",
        city: "广州",
        client_platform_type: "2",
        language: "zh_CN"
      }
    }),
  });
});
