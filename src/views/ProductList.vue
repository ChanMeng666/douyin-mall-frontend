<!--<template>-->
<!--  <div class="container">-->
<!--    <h1 class="page-title">商品列表</h1>-->
<!--    <div v-if="loading" class="loading-state">加载中...</div>-->
<!--    <div v-else-if="error" class="error-state">{{ error }}</div>-->
<!--    <div v-else class="products-grid">-->
<!--      <div v-for="product in products"-->
<!--           :key="product.product_id"-->
<!--           class="product-card"-->
<!--           @click="navigateToDetail(product.product_id)"-->
<!--      >-->
<!--        <div class="product-image">-->
<!--          <img-->
<!--            :src="product.image_url || '/api/placeholder/300/300'"-->
<!--            :alt="product.name"-->
<!--            @error="handleImageError"-->
<!--          />-->
<!--        </div>-->
<!--        <div class="product-info">-->
<!--          <h2 class="product-title">{{ product.name }}</h2>-->
<!--          <p class="product-description">{{ product.description }}</p>-->
<!--          <div class="product-footer">-->
<!--            <span class="product-price">¥{{ product.price }}</span>-->
<!--            <span class="product-stock">-->
<!--              库存: {{ product.stock }}-->
<!--              <span :class="[-->
<!--                'status-badge',-->
<!--                product.status === 'active' ? 'status-active' : 'status-inactive'-->
<!--              ]">-->
<!--                {{ product.status === 'active' ? '在售' : '下架' }}-->
<!--              </span>-->
<!--            </span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div class="container">
    <h1 class="page-title">商品列表</h1>
    <div v-if="loading" class="loading-state">加载中...</div>
    <div v-else-if="error" class="error-state">{{ error }}</div>
    <div v-else class="products-grid">
      <div v-for="product in products"
           :key="product.productId"
           class="product-card"
           @click="navigateToDetail(product)"
      >
        <div class="product-image">
          <img
            :src="product.imageUrl || '/api/placeholder/300/300'"
            :alt="product.name"
            @error="handleImageError"
          />
        </div>
        <div class="product-info">
          <h2 class="product-title">{{ product.name }}</h2>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-footer">
            <span class="product-price">¥{{ product.price }}</span>
            <span class="product-stock">
              库存: {{ product.stock }}
              <span :class="[
                'status-badge',
                product.status === 'active' ? 'status-active' : 'status-inactive'
              ]">
                {{ product.status === 'active' ? '在售' : '下架' }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}

.page-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.product-card {
  cursor: pointer;

  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
}

.product-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.product-description {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #fe2c55;
}

.product-stock {
  font-size: 0.875rem;
  color: #666;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
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
  .page-title {
    font-size: 2rem;
  }
}

@media (min-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
</style>

<!--<script setup lang="ts">-->
<!--import { ref, computed, onMounted } from 'vue'-->
<!--import { useProductStore } from '../stores/productStore.ts'-->
<!--import type { Product } from '../types'-->



<!--import { useRouter } from 'vue-router'-->

<!--const router = useRouter()-->

<!--const navigateToDetail = (productId: number) => {-->
<!--  router.push(`/product/${productId}`)-->
<!--}-->



<!--const productStore = useProductStore()-->
<!--const loading = ref(true)-->
<!--const error = ref<string | null>(null)-->

<!--const products = computed((): Product[] => productStore.products)-->

<!--onMounted(async () => {-->
<!--  try {-->
<!--    await productStore.fetchProducts()-->
<!--  } catch (e) {-->
<!--    error.value = e instanceof Error ? e.message : '加载商品失败'-->
<!--  } finally {-->
<!--    loading.value = false-->
<!--  }-->
<!--})-->
<!--</script>-->


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import { useRouter } from 'vue-router'
import type { Product } from '../types'

const router = useRouter()
const productStore = useProductStore()
const loading = ref(true)
const error = ref<string | null>(null)

const products = computed(() => {
  const productsList = productStore.products
  console.log('Products in component:', productsList)
  return productsList
})

const navigateToDetail = (product: Product) => {
  console.log('Product in navigateToDetail:', product)
  if (product && product.productId) {
    console.log('Navigating to product:', product.productId)
    router.push(`/product/${product.productId}`)
  } else {
    console.error('Invalid product or productId:', product)
  }
}

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = '/api/placeholder/300/300'
}

onMounted(async () => {
  try {
    await productStore.fetchProducts()
  } catch (e) {
    console.error('Error in onMounted:', e)
    error.value = e instanceof Error ? e.message : '加载商品失败'
  } finally {
    loading.value = false
  }
})
</script>
