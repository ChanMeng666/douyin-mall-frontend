<!--<script setup lang="ts">-->
<!--import { RouterView } from 'vue-router'-->
<!--import TheHeader from './components/layout/TheHeader.vue'-->
<!--import TheFooter from './components/layout/TheFooter.vue'-->
<!--</script>-->

<!--<template>-->
<!--  <div class="app-container">-->
<!--    <TheHeader />-->
<!--    <main class="main-content">-->
<!--      <RouterView />-->
<!--    </main>-->
<!--    <TheFooter />-->
<!--  </div>-->
<!--</template>-->

<!--<style>-->
<!--.app-container {-->
<!--  min-height: 100vh;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->

<!--.main-content {-->
<!--  flex: 1;-->
<!--  padding: 2rem 1rem;-->
<!--  max-width: 1200px;-->
<!--  margin: 0 auto;-->
<!--  width: 100%;-->
<!--}-->

<!--@media (min-width: 768px) {-->
<!--  .main-content {-->
<!--    padding: 2rem;-->
<!--  }-->
<!--}-->
<!--</style>-->


<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
</script>

<template>
  <div class="app-wrapper">
    <TheHeader />
    <div class="content-wrapper">
      <RouterView />
    </div>
    <TheFooter />
  </div>
</template>

<style>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

.content-wrapper {
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
}

@media (min-width: 768px) {
  .content-wrapper {
    padding: 2rem;
  }
}
</style>
