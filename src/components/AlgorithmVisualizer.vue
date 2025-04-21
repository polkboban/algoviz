<script setup lang="ts">
import { ref } from 'vue'
import SortingVisualizer from './visualizers/SortingVisualizer.vue'
import PageReplacementVisualizer from './visualizers/PRVisualizer.vue'
import GraphVisualizer from './visualizers/GraphVisualizer.vue'

defineProps<{
  algorithm: string
}>()

const speed = ref(1)
const isPlaying = ref(false)
const currentStep = ref(0)

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

const reset = () => {
  isPlaying.value = false
}
</script>

<template>
  <div class="algorithm-container">
    <div class="control-panel">
      <button @click="togglePlay" class="btn btn-primary">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
      <button @click="reset" class="btn btn-secondary">Reset</button>
      <input
        type="range"
        v-model="speed"
        min="0.1"
        max="2"
        step="0.1"
        class="w-32"
      />
    </div>
    <component
      :is="algorithm.includes('sort') ? SortingVisualizer : 
           algorithm.includes('lru') ? PageReplacementVisualizer : 
           GraphVisualizer"
      :algorithm="algorithm"
      :speed="speed"
      :isPlaying="isPlaying"
      :currentStep="currentStep"
      @stepChange="(step) => currentStep = step"
    />
    />
  </div>
</template>