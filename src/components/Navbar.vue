<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<template>
  <nav class="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-100 dark:border-slate-800">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2">
          
          <h1 class="text-xl font-bold text-slate-800 dark:text-white">ALGOVIZ</h1>
        </router-link>
        <div class="flex items-center gap-4">
          <button
            @click="toggleDark()"
            class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
          >
            <span class="text-xl">{{ isDark ? '🌙' : '☀️' }}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>