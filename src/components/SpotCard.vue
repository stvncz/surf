<script setup>
import { ref, onMounted } from 'vue'
import { getSurfConditions } from '../services/stormglass.js'

defineProps({
  spot: Object,
  flipped: Boolean
})

const emit = defineEmits(['toggle'])

const baseUrl = import.meta.env.BASE_URL
const API_KEY = import.meta.env.VITE_STORMGLASS_API_KEY

const surfData = ref(null)
const loading = ref(false)
const error = ref(null)

async function fetchData() {
  loading.value = true
  error.value = null
  try {
    console.log('Fetching surf conditions...')
    surfData.value = await getSurfConditions(58.7984, 17.8081)
  } catch (err) {
    error.value = 'Erreur chargement météo' + err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})

</script>

<template>
  <div
    class="relative w-full h-64 perspective"
    tabindex="0"
  >
    <div
      class="relative w-full h-full transition-transform duration-500 transform-style preserve-3d"
      :class="{ 'rotate-y-180': flipped }"
    >
      <!-- Face avant -->
      <div
        class="absolute w-full h-full backface-hidden cursor-pointer rounded-xl overflow-hidden shadow-lg"
        @click="emit('toggle', spot)"
        @keydown.enter.prevent="emit('toggle', spot)"
        tabindex="0"
      >
        <img :src="`${baseUrl}${spot.image}`" alt="Spot" class="w-full h-full object-cover" />
        <div class="absolute bottom-0 w-full bg-black/60 text-white p-3 text-center font-bold text-lg">
          {{ spot.nom }}
        </div>
      </div>

      <!-- Face arrière -->
      <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-100 opacity-70 text-black rounded-xl p-4 flex flex-col justify-center shadow-lg">
        <h3 class="text-xl font-bold mb-2">{{ spot.nom }}</h3>
        <div v-if="loading" class="text-center">Chargement météo...</div>
        <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
        <div v-else-if="surfData">
          <ul class="text-sm space-y-1">
            <li>🌊 Houle : {{ surfData.hours[0].waveHeight?.noaa ?? 'N/A' }} m</li>
            <li>💨 Vent : {{ surfData.hours[0].windSpeed?.noaa ?? 'N/A' }} km/h</li>
            <li>🌙 Marée : {{ surfData.hours[0].windDirection?.noaa ?? 'N/A' }}</li>
          </ul>
        </div>
        <div v-else>Aucune donnée</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>

