# Blog

个人博客，基于 Nuxt 4 + Drizzle ORM + UnoCSS + Pinia 构建。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | [Nuxt 4](https://nuxt.com) / Vue 3.5 |
| ORM | [Drizzle ORM](https://orm.drizzle.team) 1.0 beta（PostgreSQL） |
| 样式 | [UnoCSS](https://unocss.dev) + Less |
| 状态管理 | [Pinia](https://pinia.vuejs.org) |
| 校验 | [valibot](https://valibot.dev) |
| 认证 | JWT（[jose](https://github.com/panva/jose)） |
| Lint/Format | [oxlint](https://oxc.rs) / [oxfmt](https://oxc.rs) |
| 包管理 | pnpm |
| 数据库 | PostgreSQL 18 / Redis 7（Docker） |

## 快速开始

### 环境要求

- Node.js LTS
- pnpm
- Docker（用于 PostgreSQL 和 Redis）

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动数据库

```bash
docker compose up -d
```

### 3. 配置环境变量

在项目根目录创建 `.env` 文件：

```env
DATABASE_URL=postgresql://postgres:wsvaio@localhost:5432/blog
NUXT_JWT_SECRET=your-secret-key
EMAIL_PASS=your-email-smtp-password
```

### 4. 运行数据库迁移

```bash
pnpm db:push   # 直接推送 schema
# 或
pnpm db:generate && pnpm db:migrate  # 生成并运行迁移文件
```

### 5. 填充种子数据（可选）

```bash
npx tsx server/db/seed.ts
```

### 6. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:3000`

## 常用命令

| 任务 | 命令 |
|------|------|
| 开发服务器 | `pnpm dev` |
| 构建 | `pnpm build` |
| 预览生产构建 | `pnpm preview` |
| 代码检查 | `pnpm lint` / `pnpm lint:fix` |
| 代码格式化 | `pnpm fmt` / `pnpm fmt:check` |
| 生成迁移 | `pnpm db:generate` |
| 运行迁移 | `pnpm db:migrate` |
| 推送 Schema | `pnpm db:push` |
| 哈希密码 | `pnpm hash-password <password>` |

## 项目结构

```
app/                  # 前端代码（Nuxt 4 app 目录）
  components/         # 组件（按域分组：article/ comment/ ui/ ...）
  composables/        # 自动导入的组合式函数
  layouts/            # 布局（default/ 公开，admin/ 后台）
  pages/              # 文件路由页面
  plugins/            # 客户端插件（.client.ts）
  stores/             # Pinia stores（自动导入）
  utils/              # 自动导入的工具函数
server/               # Nitro 后端
  api/                # 文件路由 API
  db/                 # Drizzle ORM（schema.ts / relations.ts / index.ts）
  middleware/         # 服务端中间件（auth.ts）
  utils/              # 服务端工具函数
shared/               # 共享代码（Nuxt 4）
drizzle/              # 迁移文件
public/               # 静态资源 & 上传文件
trash/                # 迁移遗留代码（可忽略）
```

## 功能

- 文章管理（CRUD、软删除、分类、标签）
- 嵌套评论系统
- 文章统计（浏览/点赞/分享/评论数）
- 管理后台（文章/评论/标签/分类/用户管理）
- JWT 认证
- 文件上传（图片，5MB 限制）
- MCP 服务器（`/api/mcp`，供 AI 工具调用 API）
- PWA 支持
- 暗黑模式
- 响应式设计

## 部署

```bash
pnpm build
pnpm preview
```

或使用 Docker：

```bash
docker build -t blog .
docker run -p 3000:3000 blog
```

> 生产环境请务必修改 `NUXT_JWT_SECRET`、数据库密码等敏感配置。

## License

MIT
