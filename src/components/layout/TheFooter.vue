<!--<template>-->
<!--  <footer class="footer">-->
<!--    <div class="footer-container">-->
<!--      <p class="copyright">&copy; 2025 抖音商城. All rights reserved.</p>-->
<!--    </div>-->
<!--  </footer>-->
<!--</template>-->

<!--<style scoped>-->
<!--.footer {-->
<!--  width: 100%;-->
<!--  background-color: #f5f5f5;-->
<!--  padding: 2rem 0;-->
<!--  margin-top: auto;-->
<!--}-->

<!--.footer-container {-->
<!--  max-width: 1400px;-->
<!--  margin: 0 auto;-->
<!--  padding: 0 1rem;-->
<!--  text-align: center;-->
<!--}-->

<!--.copyright {-->
<!--  color: #666;-->
<!--  font-size: 0.875rem;-->
<!--}-->

<!--@media (min-width: 768px) {-->
<!--  .footer-container {-->
<!--    padding: 0 2rem;-->
<!--  }-->
<!--}-->
<!--</style>-->



<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>关于我们</h3>
        <p>抖音商城是一个专注于提供优质商品的电商平台</p>
      </div>
      <div class="footer-section">
        <h3>联系方式</h3>
        <p>邮箱：support@example.com</p>
        <p>电话：400-123-4567</p>
      </div>
      <div class="footer-section">
        <h3>快速链接</h3>
        <router-link to="/">首页</router-link>
        <router-link to="/cart">购物车</router-link>
        <router-link to="/orders">我的订单</router-link>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 抖音商城. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-section h3 {
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.footer-section p {
  color: #666;
  line-height: 1.6;
}

.footer-section a {
  color: #666;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.footer-section a:hover {
  color: var(--primary-color);
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
}

.footer-bottom p {
  color: #999;
  font-size: 0.9rem;
}
</style>
