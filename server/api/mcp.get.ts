defineRouteMeta({
  openAPI: {
    tags: ["mcp"],
    summary: "获取 MCP 服务说明",
    description: "返回 HTTP JSON-RPC MCP 服务的基本说明、支持方法、工具和调用示例。",
    responses: {
      200: { description: "MCP 服务说明。" },
    },
  },
});

export default defineEventHandler(() => ({
  name: "wsvaio-blog-http-mcp",
  endpoint: "/api/mcp",
  transport: "HTTP JSON-RPC 2.0",
  methods: ["initialize", "tools/list", "tools/call", "resources/list", "resources/read"],
  tools: ["list_api_routes", "call_api"],
  resources: ["blog://openapi", "blog://api-routes"],
  example: {
    jsonrpc: "2.0",
    id: 1,
    method: "resources/read",
    params: {
      uri: "blog://api-routes",
    },
  },
}));
