<template>
  <div id="app" class="min-h-screen flex flex-col">
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue'
</script>
