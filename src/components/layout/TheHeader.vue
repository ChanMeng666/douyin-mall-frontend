<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="header-container">
      <RouterLink to="/" class="logo">
        抖音商城
      </RouterLink>
      <nav class="nav-menu">
        <RouterLink to="/" class="nav-link">首页</RouterLink>
        <RouterLink to="/cart" class="nav-link">购物车</RouterLink>
        <RouterLink to="/orders" class="nav-link">订单</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  height: 64px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fe2c55;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link:hover {
  color: #fe2c55;
}

.nav-link.router-link-active {
  color: #fe2c55;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #fe2c55;
}

@media (min-width: 768px) {
  .header-container {
    padding: 1rem 2rem;
  }
}
</style>
