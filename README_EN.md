# 🛍️ Douyin Mall Frontend

<div align="center">

**Modern E-commerce Platform based on Vue 3 + TypeScript**

A feature-complete modern e-commerce frontend application built with Vue 3 + TypeScript stack.

[Live Demo](https://github.com/ChanMeng666/douyin-mall-frontend) · [Documentation](https://github.com/ChanMeng666/douyin-mall-frontend/wiki) · [Issues](https://github.com/ChanMeng666/douyin-mall-frontend/issues) · [中文](./README.md)

[![GitHub stars](https://img.shields.io/github/stars/ChanMeng666/douyin-mall-frontend?style=social)](https://github.com/ChanMeng666/douyin-mall-frontend/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ChanMeng666/douyin-mall-frontend?style=social)](https://github.com/ChanMeng666/douyin-mall-frontend/forks)

</div>

## 🌟 Project Overview

This project demonstrates best practices for modern Vue 3 frontend development. It provides a complete e-commerce shopping experience with features including user authentication, product management, shopping cart, order processing, and multiple payment methods.

## ✨ Core Features

- 🚀 **High Performance**: Optimized loading with lazy loading and virtual scrolling
- 🔧 **Smart Filtering**: Multi-dimensional product filtering and search
- 📱 **Responsive Design**: Perfect adaptation to various device sizes
- 🛡️ **Type Safety**: TypeScript throughout the codebase
- 💨 **Quick Deployment**: One-click deployment to major cloud platforms
- 🔒 **Security First**: JWT authentication and data encryption
- 💎 **Modern UI/UX**: Beautiful interface design
- 📊 **Analytics**: Built-in user behavior analysis

## 🛠️ Tech Stack

- **Framework**: Vue 3 + Composition API
- **Language**: TypeScript 5
- **Build Tool**: Vite 6
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Testing**: Vitest + Cypress
- **Code Quality**: ESLint + Prettier

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0+
- npm/yarn/pnpm package manager
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/ChanMeng666/douyin-mall-frontend.git
cd douyin-mall-frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start development server
npm run dev
```

### Environment Configuration

Create `.env.local` file:

```bash
# API service address
VITE_API_BASE_URL=http://localhost:8080/api

# Application configuration
VITE_APP_TITLE=Douyin Mall
VITE_APP_VERSION=1.0.0
```

## 📖 Usage Guide

### Basic Usage

1. **Access Application**: Open browser and visit the application URL
2. **Browse Products**: View product list on homepage
3. **Add to Cart**: Select products and add to cart
4. **Place Order**: Complete order creation and payment

### API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/product/list` | Get product list | ❌ |
| `GET` | `/api/product/get` | Get product details | ❌ |
| `GET` | `/api/cart/get` | Get shopping cart | ✅ |
| `POST` | `/api/cart/add` | Add to cart | ✅ |
| `POST` | `/api/order/create` | Create order | ✅ |
| `POST` | `/api/payment/pay` | Initiate payment | ✅ |

## ⌨️ Development

### Development Scripts

```bash
# Development
npm run dev          # Start development server

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests

# Code Quality
npm run lint         # ESLint check
npm run type-check   # TypeScript check

# Building
npm run build        # Production build
npm run preview      # Preview build
```

### Project Structure

```
src/
├── components/       # Reusable components
├── views/           # Page components
├── stores/          # Pinia state management
├── services/        # API services
├── types/           # TypeScript types
├── router/          # Router configuration
└── styles/          # Global styles
```

## 🛳 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FChanMeng666%2Fdouyin-mall-frontend)

### Docker

```bash
# Build image
docker build -t douyin-mall-frontend .

# Run container
docker run -p 3000:3000 douyin-mall-frontend
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Chan Meng**
- GitHub: [@ChanMeng666](https://github.com/ChanMeng666)
- LinkedIn: [chanmeng666](https://www.linkedin.com/in/chanmeng666/)
- Email: chanmeng.dev@gmail.com

---

<div align="center">

**🛍️ Building Modern E-commerce Shopping Experience 🌟**

Made with ❤️ by the Douyin Mall Frontend Team

</div> 