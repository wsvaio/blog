## 关于我

<img width="128" height="128" src="https://wsvaio.cn/avatar.jpg" alt="wsvaio" title="wsvaio">

### WS

前端开发工程师 | 全栈开发者 | 技术博主

记录编程旅程的点滴，分享技术探索的心得

**联系我**:
- 📧 Email: wsvaio@qq.com
- 🌐 博客：[wsvaio.cn](https://wsvaio.cn)

## 关于本站

不知是因为程序员健忘，还是健忘的是我。

经常遇到一些似曾相识，却又无从想起的问题。

于是便有了此站，将那些问题无情地记录下来，未来有需要的时候再认真地扒拉出来……

这不仅是一个博客，更是我的数字花园、知识库和成长轨迹。这里记录着从前端到全栈的技术探索，从理论到实践的项目经验，以及从问题到解决方案的思考过程。

**✨ 站点特色**:
- 📝 **文章系统**: Markdown 编辑、分类标签、评论互动
- 🌸 **Live2D 看板娘**: 可爱的看板娘互动体验
- 📱 **PWA 支持**: 离线访问、桌面图标
- 🎨 **主题切换**: 明暗主题自由切换
- 🔍 **SEO 优化**: sitemap、robots 协议
- 🎯 **响应式设计**: 完美适配 PC 和移动端

### 相关技术

想要完全独立搭建一个网站，只需要三步：

1. **设计** → 参考优秀主题，融入个人风格
2. **开发** → 全栈自研，从前端到后端
3. **部署** → 容器化编排，自动化 CI/CD

#### 前端开发

基于 **Nuxt 4** 构建服务端渲染应用，结合 **Vue 3.5** Composition API 与 `<script setup>` 语法糖，使用 **Pinia v3** 进行状态管理，通过 **UnoCSS** 实现原子化 CSS 样式，集成 **VueUse** 与 **Pinia Colada** 组合式工具库提升开发效率。

**核心特性**:
- ✨ Vue Macros 响应式语法糖（`$ref` / `$computed`）
- 🔄 Pinia Colada 声明式数据请求（`useQuery` / `useMutation`）
- 🎨 UnoCSS Attributify 模式
- 📦 组件自动导入，按需加载
- 🎯 TypeScript 类型安全

#### 核心技术栈

**框架与运行时**:
- **Nuxt 4.4.8** - 基于 Vue 3 的全栈框架
- **Vue 3.5.38** - 渐进式 JavaScript 框架
- **Vue Router 5.1.0** - 官方路由管理器
- **TypeScript** - 类型安全的 JavaScript 超集

**UI 与样式**:
- **UnoCSS 66.7.2** - 即时原子化 CSS 引擎
- **Less** - CSS 预处理器
- **@iconify/json** - 图标库

**状态管理与数据请求**:
- **Pinia 3.0.4** - 状态管理
- **@pinia/colada 1.3.1** - 声明式数据请求（`useQuery` / `useMutation` / `useInfiniteQuery`）
- **@vueuse/core 14.3.0** - Vue 组合式工具集
- **@vue-macros/reactivity-transform 3.1.2** - 响应式语法糖

**Markdown 与内容渲染**:
- **markdown-exit** - Markdown 渲染
- **@wsvaio/utils 1.0.22** - 自定义工具库

**代码质量**:
- **Oxlint** - Rust 编写的快速 linter
- **oxfmt** - 代码格式化工具

<!-- 图标保留 -->
<img width="48" height="48" src="https://api.iconify.design/logos:nuxt-icon.svg" alt="nuxt" title="nuxt">
<img width="48" height="48" src="https://api.iconify.design/logos:vitejs.svg" alt="vite" title="vite">
<img width="48" height="48" src="https://api.iconify.design/logos:vue.svg" alt="vue" title="vue">
<img width="48" height="48" src="https://api.iconify.design/logos:vueuse.svg" alt="vueuse" title="vueuse">
<img width="48" height="48" src="https://api.iconify.design/logos:pinia.svg" alt="pinia" title="pinia">
<img width="48" height="48" src="https://api.iconify.design/logos:unocss.svg" alt="unocss" title="unocss">
<img width="48" height="48" src="https://api.iconify.design/skill-icons:less-dark.svg" alt="less-dark" title="less-dark">
<img width="48" height="48" src="https://api.iconify.design/logos:typescript-icon.svg" alt="typescript" title="typescript">
<img width="48" height="48" src="https://api.iconify.design/simple-icons:oxc.svg" alt="oxlint" title="oxlint">

#### 后端开发

不会点后端，都不好意思说自己是前端（bushi）。

基于 **Nitro** 引擎构建 API 服务，使用 **Drizzle ORM** 管理数据库操作，**PostgreSQL** 作为主数据库，通过 **JWT**（jose）实现身份认证，集成 **Nodemailer** 发送邮件通知。使用 **Valibot** 进行运行时数据校验。

**API 模块**:
- 🔐 **认证系统**: JWT 登录认证、会话管理
- 📝 **文章管理**: CRUD 操作、分页查询、关键字搜索
- 💬 **评论系统**: 嵌套回复、审核机制
- 🏷️ **分类标签**: 多维度内容组织
- 👤 **用户系统**: 信息管理
- 📁 **文件上传**: 图片上传

**中间件**:
- JWT 鉴权中间件（GET 和公开路由豁免）
- 全局错误处理

#### 后端技术栈

**运行时与框架**:
- **Node.js** - JavaScript 运行时
- **Nitro** - Nuxt 内置的服务端引擎

**数据库与 ORM**:
- **Drizzle ORM 1.0.0-beta.22** - 类型安全的 TypeScript ORM
- **Drizzle Kit 1.0.0-beta.22** - 迁移工具
- **PostgreSQL** - 关系型数据库

**认证与校验**:
- **jose** - JWT 实现
- **valibot 1.4.1** - 运行时数据校验
- **nodemailer 9.0.1** - 邮件发送

<!-- 图标优化 -->
<img width="48" height="48" src="https://api.iconify.design/logos:nodejs-icon.svg" alt="node" title="node">
<img width="48" height="48" src="https://api.iconify.design/logos:pnpm.svg" alt="pnpm" title="pnpm">
<img width="48" height="48" src="https://nitro.unjs.io/icon.svg" alt="nitro" title="nitro" />
<img width="48" height="48" src="https://api.iconify.design/logos:drizzle.svg" alt="drizzle" title="drizzle">
<img width="48" height="48" src="https://api.iconify.design/logos:postgresql.svg" alt="postgresql" title="postgresql">

#### 运维部署

看似遥不可及，实际一点都不接近。目的很存粹，能跑就行（笑）。

全站采用容器化部署，所有服务打包成 Docker 镜像，通过 Kubernetes 编排管理，使用 GitHub Actions 实现完整的 CI/CD 流程。

**部署流程**:
1. 💻 本地开发 → `pnpm dev` 热更新调试
2. 🔧 代码提交 → Git push 触发 GitHub Actions
3. 🏗️ 自动构建 → Docker Buildx 多架构镜像
4. 📦 镜像推送 → 阿里云容器镜像仓库
5. 🚀 滚动更新 → K8s 自动重启 Deployment
6. 🌐 域名解析 → Nginx 反向代理

**Docker 配置**:
- 多阶段构建优化镜像体积
- Drizzle migration 自动执行
- 端口映射：7100

#### DevOps 工具链

**开发与构建**:
- **Git** - 版本控制
- **GitHub** - 代码托管与协作
- **pnpm** - 高效包管理器
- **Node.js LTS** - JavaScript 运行时

**CI/CD**:
- **GitHub Actions** - 自动化工作流
- **Docker Buildx** - 多平台镜像构建

**容器与编排**:
- **Docker** - 容器化技术
- **Kubernetes** - 容器编排

**网络与服务器**:
- **Nginx** - 反向代理与负载均衡
- **Ubuntu Server** - Linux 操作系统

<!-- 图标优化 -->
<img width="48" height="48" src="https://api.iconify.design/logos:git-icon.svg" alt="git" title="git">
<img width="48" height="48" src="https://api.iconify.design/logos:github-icon.svg" alt="github" title="github">
<img width="48" height="48" src="https://api.iconify.design/logos:github-actions.svg" alt="github" title="github">
<img width="48" height="48" src="https://api.iconify.design/logos:docker-icon.svg" alt="docker" title="docker">
<img width="48" height="48" src="https://api.iconify.design/logos:kubernetes.svg" alt="kubernetes" title="kubernetes">
<img width="48" height="48" src="https://api.iconify.design/logos:nginx.svg" alt="nginx" title="nginx">
<img width="48" height="48" src="https://api.iconify.design/logos:ubuntu.svg" alt="ubuntu" title="ubuntu">
<img width="48" height="48" src="https://api.iconify.design/logos:pnpm.svg" alt="pnpm" title="pnpm">

---

## 🚀 快速开始

### 环境要求

- **Node.js**: LTS 版本（推荐 20+）
- **pnpm**: 8.0+
- **PostgreSQL**: 14+
- **Docker**: 20+ （可选，用于容器化部署）

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

复制 `.env.example` 为 `.env`，并修改数据库连接等配置：

```bash
cp .env.example .env
```

### 数据库迁移

```bash
# 生成迁移文件
pnpm db:generate

# 执行迁移
pnpm db:migrate

# 或者直接推送 schema（开发环境推荐）
pnpm db:push
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

### 生产构建

```bash
# 构建
pnpm build

# 预览
pnpm preview
```

### Docker 部署

```bash
# 构建镜像
docker build --build-arg DATABASE_URL=your_database_url -t blog:latest .

# 运行容器
docker run -d -p 7100:7100 blog:latest
```

---

## 📂 项目结构

```
.
├── app/                      # 前端应用目录
│   ├── assets/              # 静态资源（CSS、图片）
│   ├── components/          # Vue 组件
│   ├── composables/         # 组合式函数（useMessage、useFetchApi 等）
│   ├── layouts/             # 布局组件（default、admin）
│   ├── middleware/          # 路由中间件
│   ├── pages/               # 页面组件
│   │   └── admin/           # 后台管理页面（文章/分类/标签管理）
│   ├── plugins/             # 插件
│   ├── stores/              # Pinia 状态管理
│   └── utils/               # 工具函数
├── server/                  # 后端服务目录（Nitro）
│   ├── api/                 # API 路由（article/auth/comment/tag/type/user）
│   ├── db/                  # 数据库（schema.ts、relations.ts、seed.ts）
│   ├── middleware/          # 服务端中间件（JWT 鉴权）
│   ├── plugins/             # 服务端插件
│   └── utils/               # 服务端工具
├── drizzle/                 # Drizzle 迁移文件
├── public/                  # 公共静态资源
├── docs/                    # 设计文档与计划
├── .github/workflows/       # GitHub Actions
├── Dockerfile               # Docker 配置
├── drizzle.config.ts        # Drizzle 配置
├── nuxt.config.ts           # Nuxt 配置
├── uno.config.ts            # UnoCSS 配置
└── tsconfig.json            # TypeScript 配置
```

---

## 🛠️ 开发规范

### 代码命令

```bash
# 代码检查
pnpm lint

# 自动修复
pnpm lint:fix

# 代码格式化
pnpm fmt

# 检查格式
pnpm fmt:check

# 数据库迁移生成
pnpm db:generate

# 数据库迁移执行
pnpm db:migrate

# 数据库 schema 推送
pnpm db:push
```

### Git 提交规范

遵循 Conventional Commits 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具链变更

示例：
```bash
git commit -m "feat: 添加文章搜索功能"
git commit -m "fix: 修复评论列表分页错误"
```

---

## 📄 功能模块

### 前端功能

- ✅ 文章列表与分页
- ✅ 文章详情与目录导航
- ✅ Markdown 渲染
- ✅ 标签与分类筛选
- ✅ 评论系统（嵌套回复）
- ✅ Live2D 看板娘互动
- ✅ 主题切换（明/暗）
- ✅ PWA 离线访问
- ✅ 响应式布局
- ✅ 樱花飘落 / 点击特效

### 后台管理

- ✅ JWT 登录认证（侧栏弹窗）
- ✅ 文章管理（CRUD + 搜索分页）
- ✅ 分类管理（CRUD + 名称/图标/描述/排序）
- ✅ 标签管理（CRUD + 搜索分页）
- ✅ 用户信息展示

### API 接口

完整 RESTful API（集成 Scalar API 文档）

---

## 🔧 技术亮点

### 1. Nuxt 4

- 服务端渲染（SSR）
- 自动导入组件 / composables
- 文件系统路由
- Nitro 服务端引擎

### 2. Drizzle ORM

- 类型安全的数据库操作
- 轻量无 Runtime 依赖
- 直观的 Schema 定义
- 强大的迁移与推拉能力

### 3. Pinia Colada

- 声明式数据请求（`useQuery` / `useMutation` / `useInfiniteQuery`）
- 自动缓存与重新获取
- 与 Pinia 无缝集成

### 4. UnoCSS 原子化

- 按需生成的 CSS
- 极快的构建速度
- 高度可定制的主题
- Attributify 模式

### 5. Valibot 校验

- 极小的打包体积（无依赖）
- TypeScript 类型推断
- 模块化 Schema 组合

---

## 📊 数据库设计

### 核心表结构

- **article** — 文章表（标题/正文/分类/时间戳/软删除）
- **article_stats** — 文章统计（浏览量/点赞/评论数）
- **type** — 分类表（名称/图标/描述/排序）
- **tag** — 标签表（名称/时间戳）
- **article_to_tag** — 文章-标签关联表
- **comment** — 评论表（嵌套回复/审核状态）
- **user** — 用户表（邮箱/密码/角色/状态）
- **file** — 文件表（路径/类型/大小）
- **event** — 事件记录表

详细 Schema 请查看 [server/db/schema.ts](./server/db/schema.ts)

---

## 🎨 界面预览

### 首页
Banner + 左右交替文章卡片 + 右侧个人信息/热门/标签

### 文章页
Markdown 渲染 + 目录导航 + 评论区

### 标签/分类页
按标签或分类筛选文章列表

### 后台管理面板
侧栏导航 + 文章/分类/标签 CRUD 表格

---

## 📝 开发计划

- [ ] 数据统计与分析
- [ ] SEO 进一步优化
- [ ] 移动端体验优化
- [ ] API 文档完善

---

## 🤝 贡献指南

欢迎提出 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 开源协议

MIT License

---

## 🙏 致谢

感谢以下开源项目：

- [Nuxt](https://nuxt.com/)
- [Vue](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [UnoCSS](https://unocss.dev/)
- [VueUse](https://vueuse.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Valibot](https://valibot.dev/)

以及所有为此项目做出贡献的开源作者！

---

## 📮 联系方式

- **Email**: wsvaio@qq.com
- **博客**: https://wsvaio.cn
- **GitHub**: @wsvaio

---

<div align="center">

**如果觉得项目不错，请给个 ⭐ Star 支持一下吧！**

Made with ❤️ by [WS](https://wsvaio.cn)

</div>
