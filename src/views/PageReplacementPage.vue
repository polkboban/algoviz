<script setup lang="ts">
import { ref } from 'vue'
import PageReplacementVisualizer from '../components/visualizers/PRVisualizer.vue'

const algorithms = [
  { id: 'lru', name: 'LRU' },
  { id: 'fifo', name: 'FIFO' }
]

const selectedAlgorithm = ref(algorithms[0].id)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-gray-300 dark:from-slate-900 dark:to-indigo-950 py-10 px-4 flex flex-col items-center justify-start space-y-9">
    <h1 class="page-title">Page Replacement Algorithms</h1>
    <div class="algorithm-selector">
      <button
        v-for="algo in algorithms"
        :key="algo.id"
        class="algorithm-button"
        :class="selectedAlgorithm === algo.id ? 'active' : 'inactive'"
        @click="selectedAlgorithm = algo.id"
      >
        {{ algo.name }}
      </button>
    </div>
    <div class="visualization-container">
      <PageReplacementVisualizer
        :algorithm="selectedAlgorithm"
        :speed="1"
        :isPlaying="false"
      />
    </div>
  </div>
</template>