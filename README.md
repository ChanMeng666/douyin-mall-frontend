# 抖音商城前端

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ChanMeng666/douyin-mall-frontend)

## 项目介绍

这是一个基于 Vue 3 + TypeScript 开发的抖音电商平台前端项目。项目采用现代前端技术栈，实现了完整的电商购物流程，包括商品浏览、购物车管理、订单处理和支付功能。

## 技术栈

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Axios
- Vitest
- Cypress

## 主要功能

- 用户认证（登录/注册）
- 商品列表展示
- 商品详情页
- 购物车管理
- 订单管理
- 支付流程
- 响应式设计

## 开发环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

## 项目设置

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

### 运行单元测试

```bash
npm run test:unit
```

### 运行端到端测试

```bash
npm run test:e2e:dev
```

## 项目结构

```
src/
├── assets/         # 静态资源
├── components/     # 公共组件
├── services/       # API 服务
├── stores/         # Pinia 状态管理
├── styles/         # 全局样式
├── types/          # TypeScript 类型定义
└── views/          # 页面组件
```

## 环境变量配置

项目使用 `.env` 文件进行环境配置，需要配置以下环境变量：

```
VITE_API_BASE_URL=你的API基础URL
```

## 代码规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 Vue 3 组合式 API 的最佳实践

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (git checkout -b feature/AmazingFeature)
3. 提交你的更改 (git commit -m 'Add some AmazingFeature')
4. 推送到分支 (git push origin feature/AmazingFeature)
5. 开启一个 Pull Request

## 许可证

本项目使用 Apache License 2.0 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情
