<script setup lang="ts">
import { ref } from 'vue'
import SortingVisualizer from '../components/visualizers/SortingVisualizer.vue'
import SortingAlgorithm from '../components/algorithms/SortingAlgorithm.vue'

const algorithms = [
  { id: 'bubble-sort', name: 'Bubble Sort' },
  { id: 'insertion-sort', name: 'Insertion Sort' },
  { id: 'merge-sort', name: 'Merge Sort' },
  { id: 'heap-sort', name: 'Heap Sort' }
]

const selectedAlgorithm = ref(algorithms[0].id)
const currentStep = ref(0)

const handleStepChange = (step: number) => {
  currentStep.value = step
}
</script>

<template>
  <div class="bg-gradient-to-br from-slate-100 to-gray-300 dark:from-slate-900 dark:to-indigo-950 flex flex-col items-center justify-start py-10 px-4 min-h-screen space-y-10">
    <h1 class="page-title text-2xl md:text-5xl font-bold">Sorting Algorithms</h1>
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
        :currentStep="currentStep"
        @stepChange="handleStepChange"
      />
    </div>
    <div class="algorithm-steps-container">
      <SortingAlgorithm 
        :currentStep="currentStep"
        :algorithm="selectedAlgorithm"
        @stepChange="handleStepChange"
      />
    </div>
  </div>
</template>