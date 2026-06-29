import { file as fileTable } from "~~/server/db/schema";
import db from "../db";

defineRouteMeta({
  openAPI: {
    tags: ["upload"],
    summary: "上传图片",
    description: "上传单个图片文件，最大 5MB，仅支持 jpeg/png/gif/webp。需要 Bearer Token。",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: ["file"],
            properties: {
              file: { type: "string", format: "binary", description: "图片文件。" },
            },
          },
        },
      },
    },
    responses: {
      200: { description: "上传后的文件记录。" },
      400: { description: "文件缺失、大小超限或类型不支持。" },
      401: { description: "未登录或令牌无效。" },
      500: { description: "服务器错误。" },
    },
  },
});

// server/api/upload.post.ts
export default defineEventHandler(async (event) => {
  // 1. 使用 readMultipartFormData 解析上传的文件
  // 注意：这个函数返回的是一个数组，因为表单可能包含多个文件
  const formData = await readMultipartFormData(event);
  // 获取第一个上传的文件
  const file = formData?.[0];

  // 2. 基础校验：确保文件存在
  if (!file || !file.data || !file.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: "未找到文件或文件数据无效",
    });
  }

  // 3. 文件校验：大小限制（例如：5MB = 5 * 1024 * 1024 字节）
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.data.length > MAX_FILE_SIZE) {
    throw createError({
      statusCode: 400,
      statusMessage: `文件大小超过限制 (最大 ${MAX_FILE_SIZE / 1024 / 1024}MB)`,
    });
  }

  // 4. 文件校验：类型限制
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!file.type || !allowedTypes.includes(file.type)) {
    throw createError({
      statusCode: 400,
      statusMessage: `不支持的文件类型。允许的类型: ${allowedTypes.join(", ")}`,
    });
  }

  // 5. 初始化存储目标
  // 配置在下面的 nuxt.config.ts 中，指向名为 "uploads" 的存储桶
  const storage = useStorage("uploads");

  // 6. 生成一个独一无二的文件名（避免重名覆盖）
  // 这里使用时间戳 + 原始文件名，你也可以使用 UUID 等库
  // const timestamp = Date.now();
  // 处理文件名，移除路径，只保留基础名
  // const safeOriginalName = file.filename.replace(/^.*[\\/]/, "");
  // const uniqueFileName = `${timestamp}-${safeOriginalName}`;
  const uniqueFileName = crypto.randomUUID();

  // 7. 保存文件到存储驱动
  // setItemRaw 用于保存二进制数据 (Buffer)
  await storage.setItemRaw(uniqueFileName, file.data);

  const inserted = await db
    .insert(fileTable)
    .values({
      path: `/uploads/${uniqueFileName}`,
      filename: uniqueFileName,
      mimeType: file.type,
      extension: file.filename.split(".")[1],
      size: file.data.length,
    })
    .returning();

  const data = Array.isArray(inserted) ? inserted[0] : inserted;

  // 8. 返回成功信息给前端
  // key 是保存后的唯一标识名，用于后续访问或删除
  return data;
});
