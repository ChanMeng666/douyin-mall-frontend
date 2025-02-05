<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import type { Order } from '@/types/order'

const router = useRouter()
const orderStore = useOrderStore()

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

const handleViewDetail = (orderId: number) => {
  router.push(`/order/${orderId}`)
}

const handleCancelOrder = async (order: Order) => {
  try {
    await orderStore.cancelOrder(order.order_id)
    // 可以添加一个提示消息
  } catch (error) {
    console.error('取消订单失败:', error)
    // 可以添加一个错误提示
  }
}

onMounted(async () => {
  try {
    await orderStore.fetchOrders()
  } catch (error) {
    console.error('获取订单列表失败:', error)
  }
})
</script>

<template>
  <div class="orders-container">
    <h1 class="page-title">我的订单</h1>

    <div v-if="orderStore.loading" class="loading-state">
      加载中...
    </div>

    <div v-else-if="orderStore.error" class="error-state">
      {{ orderStore.error }}
    </div>

    <div v-else-if="orderStore.orders.length === 0" class="empty-state">
      暂无订单记录
    </div>

    <div v-else class="orders-list">
      <div v-for="order in orderStore.orders"
           :key="order.order_id"
           class="order-card"
      >
        <div class="order-header">
          <span class="order-id">订单号: {{ order.order_id }}</span>
          <span :class="['order-status', `status-${order.status}`]">
            {{ getStatusText(order.status) }}
          </span>
        </div>

        <div class="order-info">
          <div class="info-row">
            <span class="label">下单时间:</span>
            <span>{{ formatDate(order.created_at) }}</span>
          </div>
          <div class="info-row">
            <span class="label">支付方式:</span>
            <span>{{ getPayTypeText(order.pay_type) }}</span>
          </div>
          <div class="info-row">
            <span class="label">订单金额:</span>
            <span class="amount">¥{{ order.total_amount.toFixed(2) }}</span>
          </div>
        </div>

        <div class="order-actions">
          <button
            class="btn-view"
            @click="handleViewDetail(order.order_id)"
          >
            查看详情
          </button>
          <button
            v-if="order.status === 'pending'"
            class="btn-cancel"
            @click="handleCancelOrder(order)"
          >
            取消订单
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders-container {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  background: white;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.order-id {
  color: #666;
  font-size: 0.9rem;
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

.order-info {
  margin-bottom: 1rem;
}

.info-row {
  display: flex;
  margin-bottom: 0.5rem;
}

.label {
  color: #666;
  width: 80px;
}

.amount {
  color: #ff4d4f;
  font-weight: bold;
}

.order-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.btn-view {
  background-color: #1890ff;
  color: white;
}

.btn-view:hover {
  background-color: #40a9ff;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #666;
}

.btn-cancel:hover {
  background-color: #ff4d4f;
  color: white;
}
</style>
