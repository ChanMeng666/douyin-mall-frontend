<!--<script setup lang="ts">-->
<!--import { RouterLink } from 'vue-router'-->
<!--</script>-->

<!--<template>-->
<!--  <header class="header">-->
<!--    <div class="header-container">-->
<!--      <RouterLink to="/" class="logo">-->
<!--        抖音商城-->
<!--      </RouterLink>-->
<!--      <nav class="nav-menu">-->
<!--        <RouterLink to="/" class="nav-link">首页</RouterLink>-->
<!--        <RouterLink to="/cart" class="nav-link">购物车</RouterLink>-->
<!--        <RouterLink to="/orders" class="nav-link">订单</RouterLink>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </header>-->
<!--</template>-->

<!--<style scoped>-->
<!--.header {-->
<!--  width: 100%;-->
<!--  background-color: #fff;-->
<!--  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);-->
<!--  position: sticky;-->
<!--  top: 0;-->
<!--  z-index: 100;-->
<!--}-->

<!--.header-container {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  max-width: 1400px;-->
<!--  margin: 0 auto;-->
<!--  padding: 1rem;-->
<!--  height: 64px;-->
<!--}-->

<!--.logo {-->
<!--  font-size: 1.5rem;-->
<!--  font-weight: bold;-->
<!--  color: #fe2c55;-->
<!--  text-decoration: none;-->
<!--}-->

<!--.nav-menu {-->
<!--  display: flex;-->
<!--  gap: 2rem;-->
<!--  align-items: center;-->
<!--}-->

<!--.nav-link {-->
<!--  color: #333;-->
<!--  text-decoration: none;-->
<!--  font-weight: 500;-->
<!--  padding: 0.5rem 0;-->
<!--  position: relative;-->
<!--}-->

<!--.nav-link:hover {-->
<!--  color: #fe2c55;-->
<!--}-->

<!--.nav-link.router-link-active {-->
<!--  color: #fe2c55;-->
<!--}-->

<!--.nav-link.router-link-active::after {-->
<!--  content: '';-->
<!--  position: absolute;-->
<!--  bottom: 0;-->
<!--  left: 0;-->
<!--  width: 100%;-->
<!--  height: 2px;-->
<!--  background-color: #fe2c55;-->
<!--}-->

<!--@media (min-width: 768px) {-->
<!--  .header-container {-->
<!--    padding: 1rem 2rem;-->
<!--  }-->
<!--}-->
<!--</style>-->


<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const cartStore = useCartStore()
const { itemCount } = storeToRefs(cartStore)

const handleLogout = async () => {
  try {
    await userStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('退出登录失败:', error)
  }
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <div class="left">
        <router-link to="/" class="logo">
          抖音商城
        </router-link>
      </div>

      <nav class="nav">
        <RouterLink to="/" class="nav-link">首页</RouterLink>
        <RouterLink to="/cart" class="nav-link">购物车</RouterLink>
        <RouterLink to="/orders" class="nav-link">我的订单</RouterLink>
        <RouterLink to="/login" class="nav-link">登录</RouterLink>
        <RouterLink to="/register" class="nav-link">注册</RouterLink>
      </nav>

      <div class="right">
        <template v-if="userStore.isAuthenticated">
          <div class="user-menu">
            <span class="username">{{ userStore.currentUser?.username }}</span>
            <button class="logout-btn" @click="handleLogout">退出登录</button>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #1890ff;
}

.nav-link.router-link-active {
  color: #1890ff;
  font-weight: bold;
}

.right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  color: #333;
  font-weight: 500;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

.register {
  color: var(--primary-color);
  font-weight: 500;
}

.cart-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.cart-badge {
  background: var(--primary-color);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  position: absolute;
  top: -0.5rem;
  right: -1rem;
}
</style>
