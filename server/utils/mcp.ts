import { getHeader, type H3Event } from "h3";

export type JsonRpcId = string | number | null;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type OpenApiOperation = Record<string, unknown> & {
  summary?: string;
  description?: string;
  parameters?: unknown[];
  requestBody?: unknown;
  responses?: unknown;
};
type OpenApiPathItem = Partial<Record<Lowercase<HttpMethod>, OpenApiOperation>>;
type OpenApiDocument = {
  paths?: Record<string, OpenApiPathItem>;
};

export interface JsonRpcRequest {
  jsonrpc: "2.0";
  id?: JsonRpcId;
  method: string;
  params?: unknown;
}

export interface OpenApiRouteMeta {
  method: HttpMethod;
  path: string;
  summary?: string;
  description?: string;
  operation: OpenApiOperation;
}

interface McpToolCallParams {
  name?: string;
  arguments?: unknown;
}

interface McpResourceReadParams {
  uri?: string;
}

interface CallApiArguments {
  method?: string;
  path?: string;
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: Record<string, unknown> | BodyInit | null;
  Authorization?: string;
  authorization?: string;
}

const MCP_RESOURCES = [
  {
    uri: "blog://openapi",
    name: "OpenAPI document",
    description: "完整的 /_openapi.json 文档。",
    mimeType: "application/json",
  },
  {
    uri: "blog://api-routes",
    name: "API routes",
    description: "从 /_openapi.json 提取的 HTTP API 路由列表。",
    mimeType: "application/json",
  },
];

const MCP_TOOLS = [
  {
    name: "list_api_routes",
    description: "列出 /_openapi.json 中暴露的所有 HTTP API。",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "call_api",
    description: "调用 /_openapi.json 中暴露的 HTTP API。请求中的 Authorization 头会被转发。",
    inputSchema: {
      type: "object",
      required: ["method", "path"],
      properties: {
        method: {
          type: "string",
          enum: ["GET", "POST", "PUT", "DELETE"],
        },
        path: {
          type: "string",
          description: "API 路径，例如 /api/article/page。动态路由需要传实际路径，例如 /api/article/1。",
        },
        query: {
          type: "object",
          description: "查询参数对象。",
          additionalProperties: true,
        },
        body: {
          description: "JSON 请求体。",
        },
        Authorization: {
          type: "string",
          description: "可选的 Authorization 请求头，例如 Bearer <token>。优先级高于 MCP 请求自身的 Authorization 头。",
        },
      },
      additionalProperties: false,
    },
  },
];

export function createJsonRpcResult(id: JsonRpcId | undefined, result: unknown) {
  return {
    jsonrpc: "2.0" as const,
    id: id ?? null,
    result,
  };
}

export function createJsonRpcError(id: JsonRpcId | undefined, code: number, message: string, data?: unknown) {
  return {
    jsonrpc: "2.0" as const,
    id: id ?? null,
    error: {
      code,
      message,
      ...(data === undefined ? {} : { data }),
    },
  };
}

export function listMcpTools() {
  return MCP_TOOLS;
}

export function listMcpResources() {
  return MCP_RESOURCES;
}

export async function handleMcpToolCall(event: H3Event, params: unknown) {
  const toolParams = params as McpToolCallParams | undefined;
  const name = toolParams?.name;

  if (name === "list_api_routes") {
    return createToolTextContent(extractOpenApiRoutes(await fetchOpenApiDocument(event)));
  }

  if (name === "call_api") {
    return createToolTextContent(await callApi(event, toolParams?.arguments));
  }

  throw new Error(`Unknown tool: ${name || "<empty>"}`);
}

export async function handleMcpResourceRead(event: H3Event, params: unknown) {
  const resourceParams = params as McpResourceReadParams | undefined;
  const uri = resourceParams?.uri;

  if (uri === "blog://openapi") {
    return createResourceJsonContent(uri, await fetchOpenApiDocument(event));
  }

  if (uri === "blog://api-routes") {
    return createResourceJsonContent(uri, extractOpenApiRoutes(await fetchOpenApiDocument(event)));
  }

  throw new Error(`Unknown resource: ${uri || "<empty>"}`);
}

async function callApi(event: H3Event, rawArguments: unknown) {
  const args = rawArguments as CallApiArguments;
  const method = args.method?.toUpperCase();
  const path = normalizePath(args.path);

  if (!isSupportedMethod(method)) {
    throw new Error("call_api.method must be one of GET, POST, PUT, DELETE");
  }
  if (!path) {
    throw new Error("call_api.path is required");
  }

  const openApi = await fetchOpenApiDocument(event);
  const route = findOpenApiRoute(openApi, method, path);
  if (!route) {
    throw new Error(`Unknown or disallowed API route: ${method} ${path}`);
  }

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(args.query || {})) {
    if (value !== undefined && value !== null) {
      query.set(key, String(value));
    }
  }

  const url = query.size ? `${path}?${query}` : path;
  const headers: Record<string, string> = {
    accept: "application/json",
  };
  const authorization =
    normalizeAuthorization(args.Authorization || args.authorization) || getHeader(event, "authorization");
  if (authorization) {
    headers.authorization = authorization;
  }

  const response = await event.$fetch(url, {
    method,
    headers,
    ...(method === "GET" ? {} : { body: args.body }),
  });

  return {
    route,
    response,
  };
}

async function fetchOpenApiDocument(event: H3Event) {
  return await event.$fetch<OpenApiDocument>("/_openapi.json");
}

export function extractOpenApiRoutes(openApi: unknown) {
  const document = openApi as OpenApiDocument;
  const routes: OpenApiRouteMeta[] = [];

  for (const [path, pathItem] of Object.entries(document.paths || {})) {
    for (const method of ["GET", "POST", "PUT", "DELETE"] as const) {
      const operation = pathItem?.[method.toLowerCase() as Lowercase<HttpMethod>];
      if (!operation) continue;

      routes.push({
        method,
        path: path || "/",
        summary: operation.summary,
        description: operation.description,
        operation,
      });
    }
  }

  return routes;
}

export function findOpenApiRoute(openApi: unknown, method: HttpMethod, path: string) {
  return extractOpenApiRoutes(openApi).find(
    route => route.method === method && openApiPathToRegExp(route.path).test(path)
  );
}

function createToolTextContent(value: unknown) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(value, null, 2),
      },
    ],
  };
}

function createResourceJsonContent(uri: string, value: unknown) {
  return {
    contents: [
      {
        uri,
        mimeType: "application/json",
        text: JSON.stringify(value, null, 2),
      },
    ],
  };
}

function normalizePath(path: unknown) {
  if (typeof path !== "string") return "";
  const [pathname] = path.trim().split("?");
  if (!pathname) return "";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function normalizeAuthorization(authorization: unknown) {
  if (typeof authorization !== "string") return "";
  return authorization.trim();
}

function isSupportedMethod(method: unknown): method is HttpMethod {
  return method === "GET" || method === "POST" || method === "PUT" || method === "DELETE";
}

function openApiPathToRegExp(routePath: string) {
  const pattern = routePath
    .split("/")
    .map(segment => {
      if (segment.startsWith("{") && segment.endsWith("}")) return "[^/]+";
      return escapeRegExp(segment);
    })
    .join("/");

  return new RegExp(`^${pattern}$`);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
