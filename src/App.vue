<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <Navbar />
    <main class="py-0">
      <router-view></router-view>
    </main>\
    <footer class="bg-white dark:bg-slate-900 shadow-sm  dark:border-slate-800">
      <div class="container mx-auto px-4 py-1 flex flex-col items-center justify-center">
        <p class="text-center text-slate-600 dark:text-slate-300">
          &copy;2025 AlgoViz. Fuckin nothins reserved.
        </p>
      </div>
    </footer>
  </div>
</template>