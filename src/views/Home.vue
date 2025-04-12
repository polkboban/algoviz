<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const algorithms = [
  { 
    id: 'sorting',
    name: 'Sorting Algorithms',
    description: 'Visualize various sorting algorithms including Bubble Sort and Quick Sort',
    icon: ''
  },
  {
    id: 'graph',
    name: 'Graph Algorithms',
    description: 'Explore graph traversal algorithms like BFS and DFS',
    icon: ''
  },
  {
    id: 'page-replacement',
    name: 'Page Replacement',
    description: 'Understand memory management through page replacement algorithms',
    icon: ''
  }
]

const navigateToAlgorithm = (id: string) => {
  router.push(`/${id}`)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-gray-300 dark:from-slate-900 dark:to-indigo-950 py-10 px-4 flex items-start pt-64 justify-center">
    <div class="container mx-auto max-w-5xl">
      <h1 class="text-7xl font-bold text-center mb-4 text-slate-800 dark:text-white">
        Algorithm Visualizer
      </h1>
      <h2 class="text-3xl text-center mb-9 text-slate-800 dark:text-white">
        Explore and understand complex algorithms through interactive visualizations
      </h2>
      
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="algo in algorithms"
          :key="algo.id"
          class="algorithm-card group"
          @click="navigateToAlgorithm(algo.id)"
        >
          
          <h2 class="text-2xl font-semibold mb-3 text-slate-800 dark:text-white transition-colors duration-200">
            {{ algo.name }}
          </h2>
          <p class="text-slate-600 dark:text-slate-300">{{ algo.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>