<script setup lang="ts">
import { ref } from 'vue'
import SortingVisualizer from '../components/visualizers/SortingVisualizer.vue'

const algorithms = [
  { id: 'bubble-sort', name: 'Bubble Sort' },
  { id: 'insertion-sort', name: 'Insertion Sort' },
  { id: 'merge-sort', name: 'Merge Sort' },
  { id: 'heap-sort', name: 'Heap Sort' }
]

const selectedAlgorithm = ref(algorithms[0].id)
</script>

<template>
  <div class="container mx-auto px-4 py-7">
    <h1 class="page-title">Sorting Algorithms</h1>
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
      <SortingVisualizer
        :algorithm="selectedAlgorithm"
        :speed="1"
        :isPlaying="false"
      />
    </div>
  </div>
</template>