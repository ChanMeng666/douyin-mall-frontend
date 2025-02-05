<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

const orderId = Number(route.params.id)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const getStatusText = (status: string) => {
  const statusMap = {
    pending: '待支付',
    paid: '已支付',
    cancelled: '已取消'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

const getPayTypeText = (payType: number) => {
  const payTypeMap = {
    1: '支付宝',
    2: '微信',
    3: '信用卡'
  }
  return payTypeMap[payType as keyof typeof payTypeMap] || '未知'
}

const handleCancelOrder = async () => {
  if (!orderStore.currentOrder) return

  try {
    await orderStore.cancelOrder(orderStore.currentOrder.order_id)
    // 可以添加一个提示消息
  } catch (error) {
    console.error('取消订单失败:', error)
    // 可以添加一个错误提示
  }
}

const handleBack = () => {
  router.push('/orders')
}

onMounted(async () => {
  if (isNaN(orderId)) {
    router.push('/orders')
    return
  }

  try {
    await orderStore.fetchOrderById(orderId)
  } catch (error) {
    console.error('获取订单详情失败:', error)
  }
})
</script>

<template>
  <div class="order-detail-container">
    <div class="page-header">
      <button class="btn-back" @click="handleBack">返回订单列表</button>
      <h1 class="page-title">订单详情</h1>
    </div>

    <div v-if="orderStore.loading" class="loading-state">
      加载中...
    </div>

    <div v-else-if="orderStore.error" class="error-state">
      {{ orderStore.error }}
    </div>

    <div v-else-if="!orderStore.currentOrder" class="error-state">
      订单不存在
    </div>

    <div v-else class="order-detail">
      <div class="order-header">
        <div class="order-basic-info">
          <h2>订单号: {{ orderStore.currentOrder.order_id }}</h2>
          <span :class="['order-status', `status-${orderStore.currentOrder.status}`]">
            {{ getStatusText(orderStore.currentOrder.status) }}
          </span>
        </div>

        <div class="order-actions">
          <button
            v-if="orderStore.currentOrder.status === 'pending'"
            class="btn-cancel"
            @click="handleCancelOrder"
          >
            取消订单
          </button>
        </div>
      </div>

      <div class="info-section">
        <h3>订单信息</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">创建时间</span>
            <span>{{ formatDate(orderStore.currentOrder.created_at) }}</span>
          </div>
          <div class="info-item">
            <span class="label">支付方式</span>
            <span>{{ getPayTypeText(orderStore.currentOrder.pay_type) }}</span>
          </div>
          <div class="info-item">
            <span class="label">支付时间</span>
            <span>{{ orderStore.currentOrder.pay_time ? formatDate(orderStore.currentOrder.pay_time) : '未支付' }}</span>
          </div>
          <div class="info-item">
            <span class="label">订单金额</span>
            <span class="amount">¥{{ orderStore.currentOrder.total_amount.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-detail-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.btn-back {
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-back:hover {
  background-color: #e8e8e8;
}

.page-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.order-detail {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.order-basic-info h2 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.order-status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status-pending {
  background-color: #fff7e6;
  color: #fa8c16;
}

.status-paid {
  background-color: #f6ffed;
  color: #52c41a;
}

.status-cancelled {
  background-color: #f5f5f5;
  color: #999;
}

.info-section {
  margin-bottom: 2rem;
}

.info-section h3 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.amount {
  color: #ff4d4f;
  font-weight: bold;
}

.btn-cancel {
  padding: 0.5rem 1rem;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.btn-cancel:hover {
  background-color: #ff7875;
}
</style>
