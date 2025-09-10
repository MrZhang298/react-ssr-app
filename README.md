# React SSR App

一个完整的React服务端渲染(SSR)应用示例，包含路由配置和现代化的构建流程。

## 特性

- ⚡ **服务端渲染(SSR)** - 更快的首屏加载速度和更好的SEO优化
- 🎯 **React Router** - 完整的客户端和服务端路由支持
- 🔥 **热重载** - 开发环境支持热重载
- 📱 **响应式设计** - 适配各种设备屏幕
- 🎨 **现代化UI** - 美观的用户界面设计

## 技术栈

- **React 18** - 用户界面库
- **React Router** - 客户端路由
- **Express.js** - Node.js服务器框架
- **Webpack** - 模块打包工具
- **Babel** - JavaScript编译器

## 项目结构

```
react-ssr-app/
├── src/
│   ├── client/          # 客户端代码
│   │   ├── index.html   # HTML模板
│   │   └── index.js     # 客户端入口
│   ├── shared/          # 共享组件
│   │   └── App.js       # 主应用组件
│   ├── components/      # 通用组件
│   │   ├── Layout.js    # 布局组件
│   │   └── Layout.css   # 布局样式
│   └── pages/           # 页面组件
│       ├── Home.js      # 首页
│       ├── About.js     # 关于页面
│       ├── Contact.js   # 联系页面
│       └── NotFound.js  # 404页面
├── server/              # 服务端代码
│   └── index.js         # 服务器入口
├── webpack.config.js    # 客户端Webpack配置
├── webpack.server.js    # 服务端Webpack配置
├── .babelrc            # Babel配置
└── package.json        # 项目配置
```

## 快速开始

### 1. 安装依赖

```bash
cd react-ssr-app
npm install
```

### 2. 开发模式

```bash
npm run dev
```

这将启动开发服务器，支持热重载。访问 http://localhost:3000

### 3. 生产构建

```bash
npm run build
npm start
```

## 可用脚本

- `npm run dev` - 启动开发服务器（支持热重载）
- `npm run build` - 构建生产版本
- `npm start` - 启动生产服务器
- `npm run dev:server` - 仅启动服务端开发模式
- `npm run dev:client` - 仅启动客户端构建监听

## 路由配置

应用包含以下路由：

- `/` - 首页
- `/about` - 关于页面
- `/contact` - 联系页面
- `*` - 404页面（匹配所有未定义的路由）

## 开发说明

### 添加新页面

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/shared/App.js` 中添加对应的路由配置
3. 在导航栏中添加链接（如需要）

### 样式管理

- 每个组件都有对应的CSS文件
- 使用CSS Grid和Flexbox进行布局
- 支持响应式设计

### 服务端渲染

服务端渲染通过以下方式实现：

1. 服务器接收请求
2. 使用 `StaticRouter` 渲染React应用
3. 将渲染结果注入HTML模板
4. 返回完整的HTML给客户端
5. 客户端进行hydration

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License
# react-ssr-app
