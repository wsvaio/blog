import {
  createJsonRpcError,
  createJsonRpcResult,
  handleMcpResourceRead,
  handleMcpToolCall,
  listMcpResources,
  listMcpTools,
  type JsonRpcRequest,
} from "~~/server/utils/mcp";

defineRouteMeta({
  openAPI: {
    tags: ["mcp"],
    summary: "HTTP MCP JSON-RPC 入口",
    description:
      "处理 MCP JSON-RPC 请求，支持 initialize、notifications/initialized、tools/list、tools/call、resources/list 和 resources/read。",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["jsonrpc", "method"],
            properties: {
              jsonrpc: { type: "string", enum: ["2.0"], description: "JSON-RPC 版本。" },
              id: { type: ["string", "integer", "null"], description: "请求 ID。" },
              method: { type: "string", description: "MCP 方法名。" },
              params: { type: "object", description: "方法参数。", additionalProperties: true },
            },
          },
        },
      },
    },
    responses: {
      200: { description: "JSON-RPC result 或 error。" },
      400: { description: "请求体格式错误。" },
      500: { description: "服务器错误。" },
    },
  },
});

export default defineEventHandler(async event => {
  const request = await readBody<JsonRpcRequest>(event);

  if (!request || request.jsonrpc !== "2.0" || typeof request.method !== "string") {
    return createJsonRpcError(null, -32600, "Invalid Request");
  }

  try {
    switch (request.method) {
      case "initialize":
        return createJsonRpcResult(request.id, {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {},
            resources: {},
          },
          serverInfo: {
            name: "wsvaio-blog-http-mcp",
            version: "1.0.0",
          },
        });

      case "notifications/initialized":
        return createJsonRpcResult(request.id, {});

      case "tools/list":
        return createJsonRpcResult(request.id, {
          tools: listMcpTools(),
        });

      case "tools/call":
        return createJsonRpcResult(request.id, await handleMcpToolCall(event, request.params));

      case "resources/list":
        return createJsonRpcResult(request.id, {
          resources: listMcpResources(),
        });

      case "resources/read":
        return createJsonRpcResult(request.id, await handleMcpResourceRead(event, request.params));

      default:
        return createJsonRpcError(request.id, -32601, `Method not found: ${request.method}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return createJsonRpcError(request.id, -32603, message);
  }
});
