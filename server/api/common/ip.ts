export default defineEventHandler(async event => {
	const query = getQuery(event);
	const data = await fetch(`https://zj.v.api.aa1.cn/api/ip-taobao/?ip=${query.ip}`).then(data => data.json());

	return {
		raw: data,
		province: data.data.PROVINCE_CN,
		city: data.data.CITY_CN,
		isp: data.data.ISP_CN,

	};
});
