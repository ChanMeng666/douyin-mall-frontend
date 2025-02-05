<template>
  <div class="success-container">
    <div class="success-content">
      <div class="success-icon">
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      </div>
      <h1>支付成功</h1>

      <div class="order-details" v-if="orderInfo">
        <div class="info-row">
          <span class="label">订单号：</span>
          <span class="value">{{ orderInfo.orderId }}</span>
        </div>
        <div class="info-row">
          <span class="label">支付金额：</span>
          <span class="value amount">¥{{ orderInfo.totalAmount.toFixed(2) }}</span>
        </div>
        <div class="info-row">
          <span class="label">支付方式：</span>
          <span class="value">{{ getPaymentMethodName(orderInfo.payType) }}</span>
        </div>
        <div class="info-row">
          <span class="label">支付时间：</span>
          <span class="value">{{ formatDate(orderInfo.payTime) }}</span>
        </div>
      </div>

      <div class="loading-state" v-else>
        加载订单信息...
      </div>

      <div class="action-buttons">
        <button @click="viewOrder" class="primary-button">查看订单详情</button>
        <button @click="backToHome" class="secondary-button">返回首页</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { orderService } from '../services/orderService'
import type { Order } from '../types/order'

const route = useRoute()
const router = useRouter()
const orderId = route.params.orderId
const orderInfo = ref<Order | null>(null)

const getPaymentMethodName = (payType?: number) => {
  switch (payType) {
    case 1:
      return '支付宝支付'
    case 2:
      return '微信支付'
    case 3:
      return '信用卡支付'
    default:
      return '未知支付方式'
  }
}

const formatDate = (date?: string) => {
  if (!date) return '未知时间'
  return new Date(date).toLocaleString()
}

const viewOrder = () => {
  router.push({ name: 'order-detail', params: { id: orderId } })
}

const backToHome = () => {
  router.push({ name: 'home' })
}

onMounted(async () => {
  try {
    const response = await orderService.getOrderById(Number(orderId))
    if (response.code === '0000') {
      orderInfo.value = response.data
    }
  } catch (error) {
    console.error('获取订单信息失败:', error)
  }
})
</script>

<style scoped>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 20px;
}

.success-content {
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.success-icon {
  color: #52c41a;
  margin-bottom: 24px;
}

h1 {
  margin-bottom: 24px;
  color: #333;
}

.order-details {
  text-align: left;
  margin: 24px 0;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.info-row:last-child {
  border-bottom: none;
}

.label {
  color: #666;
}

.value {
  color: #333;
  font-weight: 500;
}

.amount {
  color: var(--primary-color);
  font-weight: bold;
}

.loading-state {
  padding: 20px;
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
}

.primary-button,
.secondary-button {
  padding: 10px 24px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.primary-button {
  background: var(--primary-color);
  color: white;
}

.secondary-button {
  background: #f5f5f5;
  color: #666;
}

.primary-button:hover {
  opacity: 0.9;
}

.secondary-button:hover {
  background: #e8e8e8;
}

@media (max-width: 480px) {
  .success-content {
    padding: 20px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }
}
</style>
