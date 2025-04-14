<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentStep: number,
  algorithm: string
}>()

defineEmits(['stepChange'])

const fifoSteps = [
  {
    title: '1. Initialize',
    description: 'Set up empty memory frames and reference string'
  },
  {
    title: '2. Page Request',
    description: 'Get the next page from reference string'
  },
  {
    title: '3. Page Fault Check',
    description: 'Check if requested page exists in memory frames'
  },
  {
    title: '4. FIFO Replacement',
    description: 'If memory is full, remove the page that was loaded first (First-In-First-Out)'
  },
  {
    title: '5. Update',
    description: 'Add new page to memory and update page fault count'
  }
]

const lruSteps = [
  {
    title: '1. Initialize',
    description: 'Set up empty memory frames and reference string'
  },
  {
    title: '2. Page Request',
    description: 'Get the next page from reference string'
  },
  {
    title: '3. Page Fault Check',
    description: 'Check if requested page exists in memory frames'
  },
  {
    title: '4. LRU Replacement',
    description: 'If memory is full, remove the page that was least recently used'
  },
  {
    title: '5. Update',
    description: 'Add new page to memory and update access timestamps'
  }
]

const algorithmSteps = computed(() => {
  return props.algorithm === 'fifo' ? fifoSteps : lruSteps
})
</script>

<template>
  <!-- Main visualization container -->
  <!-- ... your existing visualization code ... -->

  <!-- Algorithm Steps Container -->
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

<style scoped>
.algorithm-steps {
  transition: all 0.3s ease-in-out;
}
</style>