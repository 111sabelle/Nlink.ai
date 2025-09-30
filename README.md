# Nlink.ai 品牌官网

一个现代化的品牌官网，集成了用户认证、实时聊天室和AI智能助手功能。

## 🚀 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI库**: React 18 + TypeScript
- **样式系统**: Tailwind CSS
- **动画效果**: Framer Motion
- **图标库**: Lucide React
- **认证系统**: NextAuth.js
- **数据库**: Prisma + PostgreSQL
- **实时通信**: Socket.IO
- **AI集成**: OpenAI API
- **状态管理**: Zustand
- **通知系统**: React Hot Toast

## 📁 项目结构

```
Nlink.ai/
├── app/                    # Next.js App Router 页面
│   ├── api/               # API 路由
│   ├── auth/              # 认证相关页面
│   ├── chat/              # 聊天室页面
│   ├── ai-agent/          # AI助手页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── providers.tsx      # 全局提供者
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── ui/               # 基础UI组件
│   │   └── Button.tsx    # 按钮组件
│   ├── layout/           # 布局组件
│   │   ├── Navbar.tsx    # 导航栏
│   │   ├── Hero.tsx      # 主横幅
│   │   ├── Features.tsx  # 功能展示
│   │   ├── CTA.tsx       # 行动号召
│   │   └── Footer.tsx    # 页脚
│   ├── auth/             # 认证组件
│   ├── chat/             # 聊天组件
│   └── ai/               # AI助手组件
├── lib/                   # 工具库和配置
│   ├── auth/             # 认证逻辑
│   ├── database/         # 数据库配置
│   ├── socket/           # Socket.IO配置
│   └── ai/               # AI助手逻辑
├── public/               # 静态资源
│   ├── images/           # 图片资源
│   └── icons/            # 图标资源
├── types/                # TypeScript 类型定义
└── utils/                # 通用工具函数
```

## 🎨 前端设计位置说明

### 1. 页面设计 (`app/` 目录)
- **首页**: `app/page.tsx` - 主要的着陆页面
- **聊天室**: `app/chat/page.tsx` - 聊天室界面
- **AI助手**: `app/ai-agent/page.tsx` - AI助手交互界面
- **认证页面**: `app/auth/signin/page.tsx`, `app/auth/signup/page.tsx`

### 2. 组件设计 (`components/` 目录)
- **布局组件**: `components/layout/` - 导航栏、页脚等公共布局
- **UI组件**: `components/ui/` - 按钮、输入框、卡片等基础组件
- **功能组件**: `components/chat/`, `components/ai/` - 特定功能的组件

### 3. 样式设计
- **全局样式**: `app/globals.css` - 全站样式和CSS变量
- **Tailwind配置**: `tailwind.config.js` - 自定义颜色、动画等
- **组件样式**: 每个组件内部使用Tailwind类名

### 4. 设计系统特色
- **紫色主题**: 采用紫色为主色调，符合AI科技感 [[memory:4188298]]
- **现代化设计**: 渐变背景、毛玻璃效果、流畅动画
- **响应式布局**: 完美适配桌面端和移动端
- **无障碍友好**: 符合WCAG标准的可访问性设计

## 🛠️ 开发指南

### 安装依赖
```bash
npm install
```

### 环境配置
1. 复制环境变量文件：
```bash
cp env.example .env.local
```

2. 配置环境变量：
- 数据库连接字符串
- NextAuth.js 密钥
- OpenAI API密钥
- Socket.IO配置

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看网站

### 构建项目
```bash
npm run build
npm start
```

## 📦 即将添加的功能

- [ ] 用户认证系统（登录/注册）
- [ ] 实时聊天室
- [ ] AI智能助手
- [ ] 用户个人中心
- [ ] 管理后台
- [ ] 邮件通知系统

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

- 邮箱: contact@nlink.ai
- 网站: https://nlink.ai

---

由 ❤️ 和 Next.js 驱动
