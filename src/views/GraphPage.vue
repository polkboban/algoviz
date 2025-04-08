<script setup lang="ts">
import { ref } from 'vue'
import GraphVisualizer from '../components/visualizers/GraphVisualizer.vue'

const algorithms = [
  { id: 'bfs', name: 'Breadth First Search' },
  { id: 'dfs', name: 'Depth First Search' }
]

const selectedAlgorithm = ref(algorithms[0].id)
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="page-title">Graph Algorithms</h1>
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
      <GraphVisualizer
        :algorithm="selectedAlgorithm"
        :speed="1"
        :isPlaying="false"
      />
    </div>
  </div>
</template>