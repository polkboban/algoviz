<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  algorithm: string
  speed: number
  isPlaying: boolean
  currentStep: number
}>()

const nodes = ref<{ id: number; x: number; y: number }[]>([])
const edges = ref<{ from: number; to: number }[]>([])
const visited = ref<Set<number>>(new Set())
const isRunning = ref(false)
const currentNode = ref<number | null>(null)
const svgSize = { width: 800, height: 600 }

const initializeGraph = () => {
  nodes.value = [
    { id: 0, x: 400, y: 100 },
    { id: 1, x: 200, y: 200 },
    { id: 2, x: 600, y: 200 },
    { id: 3, x: 100, y: 350 },
    { id: 4, x: 300, y: 350 },
    { id: 5, x: 500, y: 350 },
    { id: 6, x: 700, y: 350 },
    { id: 7, x: 200, y: 500 },
    { id: 8, x: 400, y: 500 },
    { id: 9, x: 600, y: 500 }
  ]
  
  edges.value = [
    { from: 0, to: 1 }, { from: 0, to: 2 },
    { from: 1, to: 3 }, { from: 1, to: 4 },
    { from: 2, to: 5 }, { from: 2, to: 6 },
    { from: 3, to: 7 }, { from: 4, to: 7 },
    { from: 4, to: 8 }, { from: 5, to: 8 },
    { from: 5, to: 9 }, { from: 6, to: 9 },
    { from: 7, to: 8 }, { from: 8, to: 9 }
  ]
  
  visited.value = new Set()
  currentNode.value = null
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const emit = defineEmits(['stepChange'])

const bfs = async () => {
  const queue = [0]
  visited.value = new Set()

  emit('stepChange', 0)
  await delay(1000 / props.speed)
  
  while (queue.length > 0 && isRunning.value) {
    emit('stepChange', 1)
    await delay(500 / props.speed)

    const node = queue.shift()!
    currentNode.value = node
    
    emit('stepChange', 2)
    await delay(500 / props.speed)
    
    const neighbors = edges.value
      .filter(edge => edge.from === node)
      .map(edge => edge.to)
    
    for (const neighbor of neighbors) {
      if (!visited.value.has(neighbor)) {
        queue.push(neighbor)
      }
    }
    emit('stepChange', 3)
    visited.value.add(node)
    await delay(500 / props.speed)
  }
  emit('stepChange', 4)
  currentNode.value = null
}

const dfs = async (node = 0) => {
  if (!isRunning.value) return
  
  if(node === 0) {
    emit('stepChange', 0)
    await delay(1000 / props.speed)
  }
  emit('stepChange', 1)

  currentNode.value = node
  await delay(500 / props.speed)
  
  emit('stepChange', 2)
  const neighbors = edges.value
    .filter(edge => edge.from === node)
    .map(edge => edge.to)
  await delay(500 / props.speed)
  
  emit('stepChange', 3)
  visited.value.add(node)
  await delay(500 / props.speed)

  for (const neighbor of neighbors) {
    if (!visited.value.has(neighbor)) {
      await dfs(neighbor)
    }
  }
  emit('stepChange', 4)
  await delay(500 / props.speed)
}

const startVisualization = async () => {
  if (isRunning.value) return
  isRunning.value = true
  visited.value = new Set()
  
  if (props.algorithm === 'bfs') {
    await bfs()
  } else if (props.algorithm === 'dfs') {
    await dfs()
  }
  
  isRunning.value = false
  currentNode.value = null
}

const stopVisualization = () => {
  isRunning.value = false
}

const resetVisualization = () => {
  initializeGraph()
  emit('stepChange', 0)
}

onMounted(() => {
  initializeGraph()
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="mb-4 flex gap-2">
      <button 
        class="btn btn-primary"
        @click="startVisualization"
        :disabled="isRunning"
      >
        Start
      </button>
      <button 
        class="btn btn-secondary"
        @click="stopVisualization"
        :disabled="!isRunning"
      >
        Stop
      </button>
      <button 
        class="btn btn-secondary"
        @click="resetVisualization"
        :disabled="isRunning"
      >
        Reset
      </button>
    </div>
    <div class="relative border rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
      <svg :width="svgSize.width" :height="svgSize.height">

        <!-- Grid background -->
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-width="0.5" class="text-slate-200 dark:text-slate-700" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        <!-- Edges -->
        <line
          v-for="edge in edges"
          :key="`${edge.from}-${edge.to}`"
          :x1="nodes[edge.from].x"
          :y1="nodes[edge.from].y"
          :x2="nodes[edge.to].x"
          :y2="nodes[edge.to].y"
          class="graph-edge"
          :class="{
            'stroke-indigo-500 dark:stroke-indigo-400': visited.has(edge.from) && visited.has(edge.to)
          }"
        />
        
        <!-- Nodes -->
        <g v-for="node in nodes" :key="node.id">
          <circle
            :cx="node.x"
            :cy="node.y"
            r="25"
            class="graph-node"
            :class="{
              'fill-slate-400 dark:fill-slate-600': !visited.has(node.id),
              'fill-green-500 dark:fill-green-400': visited.has(node.id),
              'stroke-yellow-500 stroke-4': currentNode === node.id
            }"
          />
          <text
            :x="node.x"
            :y="node.y"
            text-anchor="middle"
            dominant-baseline="middle"
            class="text-white font-medium"
          >
            {{ node.id }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>