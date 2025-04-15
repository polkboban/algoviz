<script setup lang="ts">
import { ref } from 'vue'
import GraphVisualizer from '../components/visualizers/GraphVisualizer.vue'
import GraphAlgorithm from '../components/algorithms/GraphAlgorithm.vue'

const algorithms = [
  { id: 'bfs', name: 'Breadth First Search' },
  { id: 'dfs', name: 'Depth First Search' }
]

const selectedAlgorithm = ref(algorithms[0].id)
const currentStep = ref(0)

const handleStepChange = (step: number) => {
  currentStep.value = step
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-gray-300 dark:from-slate-900 dark:to-indigo-950 py-12 px-4">
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
        :currentStep="currentStep"
        @stepChange="handleStepChange"
      />
    </div>
    <div class="algorithm-steps-container">
      <GraphAlgorithm 
        :algorithm="selectedAlgorithm" 
        :currentStep="currentStep"
        @stepChange="handleStepChange"
        />
    </div>
  </div>
</template>