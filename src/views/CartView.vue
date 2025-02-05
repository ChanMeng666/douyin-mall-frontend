<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const router = useRouter()
const { cart, loading, error } = storeToRefs(cartStore)
const { fetchCart, updateQuantity, removeItem, clearCart } = cartStore

const isSubmitting = ref(false)

onMounted(async () => {
  try {
    await fetchCart()
  } catch (err) {
    console.error('Failed to fetch cart:', err)
  }
})

const handleQuantityChange = async (cartItemId: number, quantity: number) => {
  if (quantity < 1) return
  try {
    await updateQuantity(cartItemId, quantity)
  } catch (err) {
    console.error('Failed to update quantity:', err)
  }
}

const handleRemoveItem = async (cartItemId: number) => {
  try {
    await removeItem(cartItemId)
  } catch (err) {
    console.error('Failed to remove item:', err)
  }
}

const handleClearCart = async () => {
  try {
    await clearCart()
  } catch (err) {
    console.error('Failed to clear cart:', err)
  }
}

const handleCheckout = () => {
  router.push('/checkout')
}
</script>

<template>
  <div class="cart-page">
    <h1 class="page-title">购物车</h1>

    <div v-if="loading" class="loading-state">
      加载中...
    </div>

    <div v-else-if="error" class="error-state">
      {{ error }}
    </div>

    <div v-else-if="!cart?.items?.length" class="empty-state">
      <p>购物车是空的</p>
      <button class="primary-button" @click="router.push('/')">
        去购物
      </button>
    </div>

    <template v-else>
      <div class="cart-items">
        <div v-for="item in cart?.items" :key="item.cart_item_id" class="cart-item">
          <div class="item-image">
            <img
              :src="item.product?.image_url || '/placeholder.png'"
              :alt="item.product?.name"
            />
          </div>

          <div class="item-info">
            <h3 class="item-name">{{ item.product?.name }}</h3>
            <p class="item-price">¥{{ item.product?.price }}</p>
          </div>

          <div class="item-quantity">
            <button
              class="quantity-btn"
              @click="handleQuantityChange(item.cart_item_id, item.quantity - 1)"
              :disabled="item.quantity <= 1"
            >
              -
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button
              class="quantity-btn"
              @click="handleQuantityChange(item.cart_item_id, item.quantity + 1)"
            >
              +
            </button>
          </div>

          <div class="item-total">
            ¥{{ item.total_price }}
          </div>

          <button
            class="remove-btn"
            @click="handleRemoveItem(item.cart_item_id)"
          >
            删除
          </button>
        </div>
      </div>

      <div class="cart-footer">
        <button class="clear-btn" @click="handleClearCart">
          清空购物车
        </button>

        <div class="checkout-section">
          <div class="total-amount">
            总计: ¥{{ cartStore.totalAmount }}
          </div>
          <button
            class="checkout-btn"
            :disabled="isSubmitting"
            @click="handleCheckout"
          >
            去结算
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.cart-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--text-color);
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100px;
  height: 100px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-name {
  font-size: 1.1rem;
  color: var(--text-color);
}

.item-price {
  color: var(--primary-color);
  font-weight: bold;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  min-width: 40px;
  text-align: center;
}

.item-total {
  font-weight: bold;
  color: var(--primary-color);
}

.remove-btn {
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: var(--text-light);
  cursor: pointer;
}

.remove-btn:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.clear-btn {
  padding: 0.5rem 1rem;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: var(--text-light);
  cursor: pointer;
}

.checkout-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.total-amount {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
}

.checkout-btn {
  padding: 0.75rem 2rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.checkout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary-button {
  padding: 0.75rem 2rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>
