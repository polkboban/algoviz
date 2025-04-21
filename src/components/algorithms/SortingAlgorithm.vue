<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentStep: number,
  algorithm: string
}>()

defineEmits(['stepChange'])

const bubbleSortSteps = [
  {
    title: '1. Initialize',
    description: 'Start with the first element of the array'
  },
  {
    title: '2. Compare Adjacent',
    description: 'Compare current element with the next element'
  },
  {
    title: '3. Swap if Greater',
    description: 'Swap elements if current is greater than next'
  },
  {
    title: '4. Move Forward',
    description: 'Move to next pair of elements'
  },
  {
    title: '5. Complete Pass',
    description: 'Largest element is now at the end, reduce array size by 1'
  }
]

const insertionSortSteps = [
  {
    title: '1. Initialize',
    description: 'Start with the second element as key'
  },
  {
    title: '2. Store Key',
    description: 'Store current element as the key to be inserted'
  },
  {
    title: '3. Compare Previous',
    description: 'Compare key with previous elements'
  },
  {
    title: '4. Shift Elements',
    description: 'Shift greater elements one position ahead'
  },
  {
    title: '5. Insert Key',
    description: 'Place key in its correct sorted position'
  }
]

const quickSortSteps = [
  {
    title: '1. Choose Pivot',
    description: 'Select a pivot element from the array'
  },
  {
    title: '2. Partition',
    description: 'Move smaller elements before pivot and larger after'
  },
  {
    title: '3. Swap Elements',
    description: 'Swap elements to place them in correct position'
  },
  {
    title: '4. Place Pivot',
    description: 'Place pivot in its final sorted position'
  },
  {
    title: '5. Recurse',
    description: 'Recursively sort sub-arrays before and after pivot'
  }
]

const mergeSortSteps = [
  {
    title: '1. Divide',
    description: 'Split array into two equal halves'
  },
  {
    title: '2. Recurse',
    description: 'Recursively sort both halves'
  },
  {
    title: '3. Compare',
    description: 'Compare elements from both halves'
  },
  {
    title: '4. Merge',
    description: 'Merge elements in sorted order'
  },
  {
    title: '5. Complete',
    description: 'Combine all sorted subarrays'
  }
]

const heapSortSteps = [
  {
    title: '1. Build Heap',
    description: 'Convert array into a max heap'
  },
  {
    title: '2. Extract Max',
    description: 'Remove the largest element from the heap'
  },
  {
    title: '3. Rebuild Heap',
    description: 'Rebuild the heap after extraction'
  },
  {
    title: '4. Repeat',
    description: 'Repeat until all elements are sorted'
  },
  {
    title: '5. Complete',
    description: 'Array is now sorted'
  }
]

const algorithmSteps = computed(() => {
  const algorithm = props.algorithm.split('-')[0]
  switch (algorithm) {
    case 'bubble':
      return bubbleSortSteps
    case 'insertion':
      return insertionSortSteps
    case 'merge':
      return mergeSortSteps
    case 'heap':
      return heapSortSteps
    default:
      return bubbleSortSteps
  }
})
</script>

<template>
  <div class="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
    <h3 class="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
      {{ algorithm.toUpperCase() }} Sort Steps
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