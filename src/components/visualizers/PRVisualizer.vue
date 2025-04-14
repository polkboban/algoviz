<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  algorithm: string
  speed: number
  isPlaying: boolean
  currentStep: number
}>()

const emit = defineEmits(['stepChange'])

const frames = ref<number[]>([])
const pageRequests = ref<number[]>([])
const currentStep = ref(0)
const isRunning = ref(false)
const algorithmStep = ref(0)

const initializeLRU = () => {
  frames.value = Array(4).fill(-1)
  pageRequests.value = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
  currentStep.value = 0
  algorithmStep.value = 0
  emit('stepChange', 0)
}

const simulateLRU = async () => {
  while (currentStep.value < pageRequests.value.length && isRunning.value) {
    emit('stepChange', 1) 
    const page = pageRequests.value[currentStep.value]
    
    await new Promise(resolve => setTimeout(resolve, 500 / props.speed))
    
    emit('stepChange', 2) 
    const frameIndex = frames.value.indexOf(page)
    
    await new Promise(resolve => setTimeout(resolve, 500 / props.speed))
    
    if (frameIndex === -1) {
      const emptyIndex = frames.value.indexOf(-1)
      if (emptyIndex !== -1) {
        frames.value[emptyIndex] = page
      } else {
        emit('stepChange', 3) 
        await new Promise(resolve => setTimeout(resolve, 500 / props.speed))
        
        if (props.algorithm === 'fifo') {
          frames.value.shift()
          frames.value.push(page)
        } else {
          frames.value.shift()
          frames.value.push(page)
        }
      }
    } else {
      if (props.algorithm === 'lru') {
        const temp = frames.value.splice(frameIndex, 1)[0]
        frames.value.push(temp)
      }
    }
    
    emit('stepChange', 4) 
    await new Promise(resolve => setTimeout(resolve, 500 / props.speed))
    
    currentStep.value++
  }
  
  isRunning.value = false
  emit('stepChange', 0)
}

const startVisualization = async () => {
  if (isRunning.value) return
  isRunning.value = true
  await simulateLRU()
}

const stopVisualization = () => {
  isRunning.value = false
}

const resetVisualization = () => {
  initializeLRU()
}

onMounted(() => {
  initializeLRU()
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
    
    <!-- Frames -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-2 dark:text-white">Memory Frames</h3>
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="(frame, index) in frames"
          :key="index"
          class="w-16 h-16 flex items-center justify-center border-2 border-gray-300 rounded-lg bg-white dark:bg-slate-700"
        >
          <span class="text-xl dark:text-white">{{ frame === -1 ? '-' : frame }}</span>
        </div>
      </div>
    </div>

    <!-- Page Request Sequence -->
    <div>
      <h3 class="text-lg font-semibold mb-2 dark:text-white">Page Request Sequence</h3>
      <div class="flex gap-2">
        <div
          v-for="(page, index) in pageRequests"
          :key="index"
          class="w-12 h-12 flex items-center justify-center border-2 rounded-lg transition-all duration-200"
          :class="{
            'border-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-white': index === currentStep,
            'border-gray-300 bg-white dark:bg-slate-700 dark:text-white': index !== currentStep
          }"
        >
          <span class="text-lg">{{ page }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-colors duration-200;
}
.btn-primary {
  @apply bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400;
}
.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600;
}
</style>