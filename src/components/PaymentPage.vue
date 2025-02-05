<template>
  <div class="payment-container">
    <div class="payment-header">
      <h1>订单支付</h1>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
      <button @click="router.push({ name: 'orders' })" class="error-button">
        返回订单列表
      </button>
    </div>

    <div class="payment-content" v-else-if="orderInfo">
      <div class="order-info">
        <h2>订单信息</h2>
        <div class="info-item">
          <span>订单号：</span>
          <span>{{ orderInfo.orderId }}</span>
        </div>
        <div class="info-item">
          <span>支付金额：</span>
          <span class="amount">¥{{ orderInfo.totalAmount.toFixed(2) }}</span>
        </div>
        <div class="info-item">
          <span>创建时间：</span>
          <span>{{ new Date(orderInfo.createdAt).toLocaleString() }}</span>
        </div>
      </div>

      <div class="payment-methods">
        <h2>选择支付方式</h2>
        <div class="methods-list">
          <div
            v-for="method in paymentMethods"
            :key="method.id"
            :class="['method-item', { active: selectedMethod === method.id }]"
            @click="selectMethod(method.id)"
          >
            <img :src="method.icon" :alt="method.name" />
            <span>{{ method.name }}</span>
          </div>
        </div>
      </div>

      <div class="payment-action">
        <button
          class="pay-button"
          :disabled="!selectedMethod || loading"
          @click="handlePayment"
        >
          {{ loading ? '支付处理中...' : '立即支付' }}
        </button>
        <button
          class="cancel-button"
          :disabled="loading"
          @click="handleCancelPayment"
        >
          取消支付
        </button>
      </div>
    </div>

    <div v-else class="loading-state">
      加载订单信息...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { paymentService } from '../services/paymentService'
import { orderService } from '../services/orderService'
import type { PaymentMethod } from '../types/payment'
import type { Order } from '../types/order'

const route = useRoute()
const router = useRouter()
const orderInfo = ref<Order | null>(null)
const selectedMethod = ref<number | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// 添加支付超时时间常量（15分钟）
const PAYMENT_TIMEOUT = 15 * 60 * 1000
let paymentTimer: number | null = null

// 状态检查定时器
let statusCheckInterval: number | null = null

const paymentMethods: PaymentMethod[] = [
  { id: 1, name: '支付宝支付', icon: '/icons/alipay.png' },
  { id: 2, name: '微信支付', icon: '/icons/wechat.png' },
  { id: 3, name: '信用卡支付', icon: '/icons/credit-card.png' }
]

const selectMethod = (methodId: number) => {
  selectedMethod.value = methodId
}

const handlePayment = async () => {
  if (!selectedMethod.value || !orderInfo.value) return

  loading.value = true
  try {
    const response = await paymentService.makePayment(
      orderInfo.value.orderId,
      selectedMethod.value
    )
    if (response.code === '0000') {
      startStatusCheck()
      startPaymentTimer()
    } else {
      error.value = response.info || '支付失败，请重试'
    }
  } catch (err) {
    error.value = '支付过程中出现错误，请重试'
  } finally {
    loading.value = false
  }
}

const startPaymentTimer = () => {
  if (paymentTimer) return

  paymentTimer = window.setTimeout(async () => {
    if (!orderInfo.value) return

    try {
      await handlePaymentTimeout()
    } catch (err) {
      console.error('处理支付超时失败:', err)
    }
  }, PAYMENT_TIMEOUT)
}

const handlePaymentTimeout = async () => {
  if (!orderInfo.value) return

  try {
    await paymentService.cancelPayment(orderInfo.value.orderId)
    error.value = '支付超时，请重新发起支付'
    clearStatusCheck()
  } catch (err) {
    console.error('取消支付失败:', err)
  }
}

const handleCancelPayment = async () => {
  if (!orderInfo.value || loading.value) return

  const confirmed = await showConfirmDialog('确认要取消支付吗？')
  if (!confirmed) return

  loading.value = true
  try {
    const response = await paymentService.cancelPayment(orderInfo.value.orderId)
    if (response.code === '0000') {
      router.push({ name: 'orders' })
    } else {
      error.value = response.info || '取消支付失败'
    }
  } catch (err) {
    error.value = '取消支付失败，请重试'
  } finally {
    loading.value = false
  }
}

const showConfirmDialog = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    resolve(window.confirm(message))
  })
}

const clearStatusCheck = () => {
  if (statusCheckInterval) {
    clearInterval(statusCheckInterval)
    statusCheckInterval = null
  }
}

const clearPaymentTimer = () => {
  if (paymentTimer) {
    clearTimeout(paymentTimer)
    paymentTimer = null
  }
}

const fetchOrderInfo = async (orderId: number) => {
  try {
    const response = await orderService.getOrderById(orderId)
    if (response.code === '0000') {
      orderInfo.value = response.data
      // 如果订单已支付，直接跳转到成功页面
      if (response.data.status === 'paid') {
        router.replace({
          name: 'payment-success',
          params: { orderId: orderId.toString() }
        })
      }
    } else {
      error.value = response.info || '获取订单信息失败'
    }
  } catch (err) {
    error.value = '获取订单信息失败'
  }
}

const startStatusCheck = () => {
  if (statusCheckInterval) return

  statusCheckInterval = window.setInterval(async () => {
    if (!orderInfo.value) return

    try {
      const response = await orderService.checkOrderStatus(orderInfo.value.orderId)
      if (response.code === '0000' && response.data.status === 'paid') {
        clearInterval(statusCheckInterval!)
        statusCheckInterval = null
        router.push({
          name: 'payment-success',
          params: { orderId: orderInfo.value.orderId.toString() }
        })
      }
    } catch (err) {
      console.error('检查订单状态失败:', err)
    }
  }, 3000) // 每3秒检查一次
}

onMounted(async () => {
  const orderId = Number(route.params.orderId)
  if (isNaN(orderId)) {
    error.value = '无效的订单ID'
    return
  }
  await fetchOrderInfo(orderId)
})

onUnmounted(() => {
  clearStatusCheck()
  clearPaymentTimer()
})
</script>

<style scoped>
.payment-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.payment-header {
  text-align: center;
  margin-bottom: 30px;
}

.payment-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-info {
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.amount {
  color: var(--primary-color);
  font-size: 1.2em;
  font-weight: bold;
}

.payment-methods {
  margin-bottom: 30px;
}

.methods-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.method-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.method-item.active {
  border-color: var(--primary-color);
  background: rgba(254, 44, 85, 0.05);
}

.method-item img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.payment-action {
  text-align: center;
  display: flex;
  gap: 16px;
  justify-content: center;
}

.pay-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pay-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cancel-button {
  background: #f5f5f5;
  color: #666;
  border: none;
  padding: 12px 40px;
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover:not(:disabled) {
  background: #e8e8e8;
}

.cancel-button:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.loading-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error-message {
  text-align: center;
  padding: 20px;
  margin: 20px;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 8px;
  color: #ff4d4f;
}

.error-button {
  margin-top: 16px;
  padding: 8px 16px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-button:hover {
  background: #ff7875;
}
</style>
