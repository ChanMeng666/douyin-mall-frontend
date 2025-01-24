<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">商品列表</h1>
    <div v-if="loading" class="text-center">加载中...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.product_id"
           class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold text-red-500">
              ¥{{ product.price }}
            </span>
            <div class="text-sm text-gray-500">
              库存: {{ product.stock }}
              <span :class="product.status === 'active' ? 'text-green-500' : 'text-red-500'">
                ({{ product.status === 'active' ? '在售' : '下架' }})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import type { Product } from '../types'

const productStore = useProductStore()
const loading = ref(true)
const error = ref<string | null>(null)

const products = computed((): Product[] => productStore.products)

onMounted(async () => {
  try {
    await productStore.fetchProducts()
  } catch (e) {
    error.value = e instanceof Error ? e.message : '加载商品失败'
  } finally {
    loading.value = false
  }
})
</script>
