<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  algorithm: string
  speed: number
  isPlaying: boolean
}>()

const frames = ref<number[]>([])
const pageRequests = ref<number[]>([])
const currentStep = ref(0)
const isRunning = ref(false)

const initializeLRU = () => {
  frames.value = Array(4).fill(-1)
  pageRequests.value = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
  currentStep.value = 0
}

const simulateLRU = async () => {
  while (currentStep.value < pageRequests.value.length && isRunning.value) {
    const page = pageRequests.value[currentStep.value]
    const frameIndex = frames.value.indexOf(page)
    
    if (frameIndex === -1) {
      const emptyIndex = frames.value.indexOf(-1)
      if (emptyIndex !== -1) {
        frames.value[emptyIndex] = page
      } else {
        frames.value.shift()
        frames.value.push(page)
      }
    } else {
      const temp = frames.value.splice(frameIndex, 1)[0]
      frames.value.push(temp)
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000 / props.speed))
    currentStep.value++
  }
  
  isRunning.value = false
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
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(frame, index) in frames"
        :key="index"
        class="array-element"
      >
        {{ frame === -1 ? 'Empty' : frame }}
      </div>
    </div>
    <div class="mt-8 flex gap-2">
      <div
        v-for="(page, index) in pageRequests"
        :key="index"
        class="array-element"
        :class="{ 'active': index === currentStep }"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>