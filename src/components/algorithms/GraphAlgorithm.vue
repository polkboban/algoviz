<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentStep: number,
  algorithm: string
  
}>()

defineEmits(['stepChange'])

const bfsSteps = [
  {
    title: '1. Initialize',
    description: 'Create a queue and mark start node as visited'
  },
  {
    title: '2. Process Queue',
    description: 'Remove first node from queue and explore it'
  },
  {
    title: '3. Explore Neighbors',
    description: 'Add all unvisited neighbors to queue'
  },
  {
    title: '4. Mark Visited',
    description: 'Mark current node as visited and record traversal'
  },
  {
    title: '5. Repeat',
    description: 'Continue until queue is empty'
  }
]

const dfsSteps = [
  {
    title: '1. Initialize',
    description: 'Create a stack and mark start node as visited'
  },
  {
    title: '2. Process Stack',
    description: 'Remove top node from stack and explore it'
  },
  {
    title: '3. Explore Neighbors',
    description: 'Add unvisited neighbors to stack'
  },
  {
    title: '4. Mark Visited',
    description: 'Mark current node as visited and record traversal'
  },
  {
    title: '5. Backtrack',
    description: 'Return to previous node if no unvisited neighbors'
  }
]

const algorithmSteps = computed(() => {
  return props.algorithm === 'bfs' ? bfsSteps : dfsSteps
})
</script>

<template>
  <div class="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
    <h3 class="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
      {{ algorithm.toUpperCase() }} Algorithm Steps
    </h3>
    <div class="space-y-4">
      <div
        v-for="(step, index) in algorithmSteps"
        :key="index"
        class="p-4 rounded-lg transition-all duration-200"
        :class="{
          'bg-blue-50 dark:bg-slate-700': currentStep === index,
          'bg-gray-50 dark:bg-slate-900': currentStep !== index
        }"
      >
        <h4 class="font-semibold text-lg text-slate-800 dark:text-white">
          {{ step.title }}
        </h4>
        <p class="text-slate-600 dark:text-slate-300">
          {{ step.description }}
        </p>
      </div>
    </div>
  </div>
</template>