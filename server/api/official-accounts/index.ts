import { createHash } from "node:crypto";

export default eventHandler(event => {
	const { signature, timestamp, nonce, echostr } = getQuery<{
		signature: string;
		timestamp: string;
		nonce: number;
		echostr: string;
	}>(event);

	const token = "wsvaio";

	const tmpArr = [token, timestamp, nonce].sort();

	const tmpStr = tmpArr.join("");

	const sha1 = createHash("sha1");
	sha1.update(tmpStr);

	if (sha1.digest("hex") === signature) return echostr;
});
