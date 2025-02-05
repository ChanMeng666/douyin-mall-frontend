<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import type { RegisterRequest } from '@/types/user'

const router = useRouter()
const userStore = useUserStore()

const registerForm = ref<RegisterRequest>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: ''
})

const loading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    await userStore.register(registerForm.value)
    router.push('/')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '注册失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <div class="register-box">
      <h2>注册</h2>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="registerForm.username"
            type="text"
            required
            placeholder="请输入用户名"
          >
        </div>

        <div class="form-group">
          <label for="email">邮箱</label>
          <input
            id="email"
            v-model="registerForm.email"
            type="email"
            required
            placeholder="请输入邮箱"
          >
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="registerForm.password"
            type="password"
            required
            placeholder="请输入密码"
          >
        </div>

        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input
            id="confirmPassword"
            v-model="registerForm.confirmPassword"
            type="password"
            required
            placeholder="请再次输入密码"
          >
        </div>

        <div class="form-group">
          <label for="phone">手机号（选填）</label>
          <input
            id="phone"
            v-model="registerForm.phone"
            type="tel"
            placeholder="请输入手机号"
          >
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? '注册中...' : '注册' }}
        </button>

        <div class="form-footer">
          <router-link to="/login">已有账号？立即登录</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 20px;
}

.register-box {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: var(--primary-color);
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 14px;
  color: #666;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
}

button {
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #ff4d4f;
  font-size: 14px;
  text-align: center;
}

.form-footer {
  text-align: center;
  font-size: 14px;
}

.form-footer a {
  color: var(--primary-color);
  text-decoration: none;
}

.form-footer a:hover {
  text-decoration: underline;
}
</style>
