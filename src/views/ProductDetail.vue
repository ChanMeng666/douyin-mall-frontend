<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '@/types'
import { productService } from '@/services/productService'

const route = useRoute()
const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)


const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = '/api/placeholder/600/600'
}

const fetchProduct = async () => {
  const productId = parseInt(route.params.id as string)
  if (isNaN(productId)) {
    error.value = '无效的商品ID'
    loading.value = false
    return
  }

  try {
    loading.value = true
    const response = await productService.getProduct(productId)
    if (response.code === '0000' && response.data) {
      // 处理数组或单个对象的情况
      product.value = Array.isArray(response.data) ? response.data[0] : response.data
    } else {
      error.value = response.info || '获取商品信息失败'
    }
  } catch (err) {
    console.error('Error fetching product:', err)
    error.value = '获取商品信息失败'
  } finally {
    loading.value = false
  }
}

const addToCart = async () => {
  // TODO: Implement add to cart functionality
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <div class="product-detail">
    <div v-if="loading" class="loading-state">
      加载中...
    </div>

    <div v-else-if="error" class="error-state">
      {{ error }}
    </div>

    <div v-else-if="product" class="product-container">
      <div class="product-image">
        <img
          :src="product.imageUrl || '/api/placeholder/600/600'"
          :alt="product.name"
          @error="handleImageError"
        />
      </div>

      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>

        <div class="product-price">
          <span class="currency">¥</span>
          <span class="amount">{{ product.price }}</span>
        </div>

        <div class="product-stock">
          库存: {{ product.stock }}
          <span
            :class="[
              'status-badge',
              product.status === 'active' ? 'status-active' : 'status-inactive'
            ]"
          >
            {{ product.status === 'active' ? '在售' : '下架' }}
          </span>
        </div>

        <div class="product-description">
          <h2 class="section-title">商品描述</h2>
          <p>{{ product.description }}</p>
        </div>

        <div class="action-buttons">
          <button
            class="add-to-cart-btn"
            :disabled="product.status !== 'active' || product.stock <= 0"
            @click="addToCart"
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>

    <div v-else class="error-state">
      商品不存在
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  padding: 1rem;
}

.product-container {
  display: grid;
  gap: 2rem;
  margin-top: 1rem;
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.product-price {
  font-size: 2rem;
  color: #fe2c55;
  font-weight: bold;
}

.currency {
  font-size: 1.5rem;
  margin-right: 0.25rem;
}

.product-stock {
  font-size: 1rem;
  color: #666;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.status-active {
  background-color: #e6f7ed;
  color: #52c41a;
}

.status-inactive {
  background-color: #fff2f0;
  color: #ff4d4f;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.product-description {
  color: #666;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.add-to-cart-btn {
  flex: 1;
  padding: 1rem 2rem;
  background-color: #fe2c55;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.add-to-cart-btn:hover {
  opacity: 0.9;
}

.add-to-cart-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error-state {
  color: #ff4d4f;
}

@media (min-width: 768px) {
  .product-detail {
    padding: 2rem;
  }

  .product-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
