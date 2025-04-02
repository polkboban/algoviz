<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{
  algorithm: string
  speed: number
  isPlaying: boolean
}>()

const array = ref<number[]>([])
const currentStep = ref(0)
const steps = ref<any[]>([])
const isRunning = ref(false)
const arraySize = ref(20)
const maxHeight = 80

// Computed property to safely get current step
const currentStepData = computed(() => steps.value[currentStep.value] || { comparing: [], sorted: [] })

const generateArray = () => {
  array.value = Array.from({ length: arraySize.value }, () => 
    Math.floor(Math.random() * maxHeight) + 10
  )
  currentStep.value = 0
  steps.value = []
  isRunning.value = false
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const bubbleSort = async () => {
  const arr = [...array.value]
  const n = arr.length
  steps.value = []
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.value.push({
        array: [...arr],
        comparing: [j, j + 1],
        sorted: Array.from({ length: n }, (_, idx) => idx >= n - i)
      })
      
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.value.push({
          array: [...arr],
          comparing: [j, j + 1],
          sorted: Array.from({ length: n }, (_, idx) => idx >= n - i)
        })
      }
    }
  }
  
  steps.value.push({
    array: arr,
    comparing: [],
    sorted: Array.from({ length: n }, () => true)
  })
}

const insertionSort = async () => {
  const arr = [...array.value]
  const n = arr.length
  steps.value = []

  for (let i = 1; i < n; i++) {
    let key = arr[i]
    let j = i - 1
    
    steps.value.push({
      array: [...arr],
      comparing: [i],
      sorted: Array.from({ length: n }, (_, idx) => idx < i)
    })
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      steps.value.push({
        array: [...arr],
        comparing: [j + 1, j],
        sorted: Array.from({ length: n }, (_, idx) => idx < i)
      })
      j--
    }
    
    arr[j + 1] = key
    steps.value.push({
      array: [...arr],
      comparing: [j + 1],
      sorted: Array.from({ length: n }, (_, idx) => idx <= i)
    })
  }
  
  steps.value.push({
    array: arr,
    comparing: [],
    sorted: Array.from({ length: n }, () => true)
  })
}

const merge = (arr: number[], l: number, m: number, r: number) => {
  const n1 = m - l + 1
  const n2 = r - m
  const L = new Array(n1)
  const R = new Array(n2)

  for (let i = 0; i < n1; i++) L[i] = arr[l + i]
  for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j]

  let i = 0, j = 0, k = l

  while (i < n1 && j < n2) {
    steps.value.push({
      array: [...arr],
      comparing: [l + i, m + 1 + j],
      sorted: []
    })
    
    if (L[i] <= R[j]) {
      arr[k] = L[i]
      i++
    } else {
      arr[k] = R[j]
      j++
    }
    k++
    
    steps.value.push({
      array: [...arr],
      comparing: [k - 1],
      sorted: []
    })
  }

  while (i < n1) {
    arr[k] = L[i]
    steps.value.push({
      array: [...arr],
      comparing: [k],
      sorted: []
    })
    i++
    k++
  }

  while (j < n2) {
    arr[k] = R[j]
    steps.value.push({
      array: [...arr],
      comparing: [k],
      sorted: []
    })
    j++
    k++
  }
}

const mergeSort = async (arr: number[], l: number, r: number) => {
  if (l < r) {
    const m = Math.floor(l + (r - l) / 2)
    await mergeSort(arr, l, m)
    await mergeSort(arr, m + 1, r)
    merge(arr, l, m, r)
  }
}

const heapify = (arr: number[], n: number, i: number) => {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  steps.value.push({
    array: [...arr],
    comparing: [i, left, right].filter(x => x < n),
    sorted: Array.from({ length: arr.length }, (_, idx) => idx >= n)
  })

  if (left < n && arr[left] > arr[largest]) largest = left
  if (right < n && arr[right] > arr[largest]) largest = right

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]
    steps.value.push({
      array: [...arr],
      comparing: [i, largest],
      sorted: Array.from({ length: arr.length }, (_, idx) => idx >= n)
    })
    heapify(arr, n, largest)
  }
}

const heapSort = async () => {
  const arr = [...array.value]
  const n = arr.length
  steps.value = []

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i)

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]
    steps.value.push({
      array: [...arr],
      comparing: [0, i],
      sorted: Array.from({ length: n }, (_, idx) => idx > i)
    })
    heapify(arr, i, 0)
  }
  
  steps.value.push({
    array: arr,
    comparing: [],
    sorted: Array.from({ length: n }, () => true)
  })
}

const startVisualization = async () => {
  if (isRunning.value) return
  isRunning.value = true
  steps.value = []
  
  const arr = [...array.value]
  switch (props.algorithm) {
    case 'bubble-sort':
      await bubbleSort()
      break
    case 'insertion-sort':
      await insertionSort()
      break
    case 'merge-sort':
      await mergeSort(arr, 0, arr.length - 1)
      break
    case 'heap-sort':
      await heapSort()
      break
  }
  
  currentStep.value = 0
  while (currentStep.value < steps.value.length && isRunning.value) {
    const step = steps.value[currentStep.value]
    array.value = step.array
    await delay(1000 / (props.speed || 1))
    currentStep.value++
  }
  
  isRunning.value = false
}

const stopVisualization = () => {
  isRunning.value = false
}

const resetVisualization = () => {
  generateArray()
}

onMounted(() => {
  generateArray()
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="mb-4 flex gap-4 flex-wrap justify-center">
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
      <div class="flex items-center gap-2">
        <label class="text-slate-700 dark:text-slate-300">Array Size:</label>
        <input
          type="range"
          v-model="arraySize"
          min="5"
          max="50"
          class="speed-control"
          @change="generateArray"
          :disabled="isRunning"
        />
        <span class="text-slate-700 dark:text-slate-300">{{ arraySize }}</span>
      </div>
    </div>
    <div class="flex gap-1 h-80 items-end w-full justify-center bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
      <div
        v-for="(num, index) in array"
        :key="index"
        class="w-4 transition-all duration-200"
        :class="{
          'bg-blue-500 dark:bg-blue-400': !currentStepData.comparing.includes(index) && !currentStepData.sorted[index],
          'bg-yellow-500 dark:bg-yellow-400': currentStepData.comparing.includes(index),
          'bg-green-500 dark:bg-green-400': currentStepData.sorted[index]
        }"
        :style="{ height: `${num}%` }"
      ></div>
    </div>
  </div>
</template>